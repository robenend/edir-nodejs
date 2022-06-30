<?php

include 'config.php';
session_start();
$user_id = $_SESSION['user_id'];

$select = mysqli_query($conn, "SELECT * FROM user WHERE user_id = '$user_id'") or die('query failed');

if(mysqli_num_rows($select) > 0){
   $fetch = mysqli_fetch_assoc($select);
}

if(isset($_POST['update_profile'])){

   $fName = mysqli_real_escape_string($conn, $_POST['fName']);
   $lName = mysqli_real_escape_string($conn, $_POST['lName']);
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $phoneNo = mysqli_real_escape_string($conn, $_POST['phoneNo']);
   $address = mysqli_real_escape_string($conn, $_POST['address']);
   $houseNo = mysqli_real_escape_string($conn, $_POST['houseNo']);

   mysqli_query($conn, "UPDATE user SET fName = '$fName', lName = '$lName', email = '$email', phoneNo = '$phoneNo', address = '$address', houseNum = '$houseNo' WHERE user_id = '$user_id'") or die('query failed');

   $old_pass = $fetch['password'];
   $update_pass = mysqli_real_escape_string($conn, md5($_POST['update_pass']));
   $new_pass = mysqli_real_escape_string($conn, md5($_POST['new_pass']));
   $confirm_pass = mysqli_real_escape_string($conn, md5($_POST['confirm_pass']));

   if(!empty($_POST['update_pass']) || !empty($_POST['new_pass']) || !empty($_POST['confirm_pass'])){
      if($update_pass != $old_pass){
         $message[] = 'old password not matched!';
      }elseif($new_pass != $confirm_pass){
         $message[] = 'confirm password not matched!';
      }else{
         mysqli_query($conn, "UPDATE user SET password = '$confirm_pass' WHERE id = '$user_id'") or die('query failed');
         $message[] = 'password updated successfully!';
      }
   }

   $update_image = $_FILES['update_image']['name'];
   $update_image_size = $_FILES['update_image']['size'];
   $update_image_tmp_name = $_FILES['update_image']['tmp_name'];
   $update_image_folder = 'uploaded_img/'.$update_image;

   if(!empty($update_image)){
      if($update_image_size > 2000000){
         $message[] = 'image is too large';
      }else{
         $image_update_query = mysqli_query($conn, "UPDATE user SET profile = '$update_image' WHERE user_id = '$user_id'") or die('query failed');
         if($image_update_query){
            move_uploaded_file($update_image_tmp_name, $update_image_folder);
         }
         $message[] = 'image updated successfully!';
      }
   }

}

?>

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Update Profile</title>

   <!-- custom css file link  -->
   <link rel="stylesheet" href="css/style.css">

</head>
<body>
   
<div class="update-profile">

   <form action="" method="post" enctype="multipart/form-data">
      <?php
         if($fetch['profile'] == ''){
            echo '<img src="images/default-avatar.png">';
         }else{
            echo '<img src="uploaded_img/'.$fetch['profile'].'">';
         }
         if(isset($message)){
            foreach($message as $message){
               echo '<div class="message">'.$message.'</div>';
            }
         }
      ?>
      <div class="flex">
         <div class="inputBox">
            <span>First Name :</span>
            <input type="text" name="fName" value="<?php echo $fetch['fName']; ?>" class="box">

            <span>Last Name :</span>
            <input type="text" name="lName" value="<?php echo $fetch['lName']; ?>" class="box">

            <span>your email :</span>
            <input type="email" name="email" value="<?php echo $fetch['email']; ?>" class="box">

            <span>Phone No :</span>
            <input type="number" name="phoneNo" value="<?php echo $fetch['phoneNo']; ?>" class="box">

            <span>update your pic :</span>
            <input type="file" name="update_image" accept="image/jpg, image/jpeg, image/png" class="box">
         </div>
         <div class="inputBox">
            <span>Address :</span>
            <input type="text" name="address" class="box" value="<?php echo $fetch['address']; ?>">

            <span>House No :</span>
            <input type="text" name="houseNo" class="box" value="<?php echo $fetch['houseNum']; ?>">

            <span>old password :</span>
            <input type="password" name="update_pass" placeholder="enter previous password" class="box">

            <span>new password :</span>
            <input type="password" name="new_pass" placeholder="enter new password" class="box">

            <span>confirm password :</span>
            <input type="password" name="confirm_pass" placeholder="confirm new password" class="box">
         </div>
      </div>
      <input type="submit" value="update profile" name="update_profile" class="btn">
      <a href="home.php" class="delete-btn">go back</a>
   </form>

</div>

</body>
</html>