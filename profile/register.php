<?php

include 'config.php';

if(isset($_POST['submit'])){

   $fName = mysqli_real_escape_string($conn, $_POST['fName']);
   $lName = mysqli_real_escape_string($conn, $_POST['lName']);
   
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $phone = mysqli_real_escape_string($conn, $_POST['phoneNo']);

   $dob = mysqli_real_escape_string($conn, $_POST['dob']);
   $gender = mysqli_real_escape_string($conn, $_POST['gender']);

   $address = mysqli_real_escape_string($conn, $_POST['address']);
   $houseNum = mysqli_real_escape_string($conn, $_POST['houseNum']);

   $pass = mysqli_real_escape_string($conn, md5($_POST['password']));
   $cpass = mysqli_real_escape_string($conn, md5($_POST['cpassword']));

   $image = $_FILES['image']['name'];
   $image_size = $_FILES['image']['size'];
   $image_tmp_name = $_FILES['image']['tmp_name'];
   $image_folder = 'uploaded_img/'.$image;

   $select = mysqli_query($conn, "SELECT * FROM user WHERE phoneNo = '$phone'") or die('query failed');
   $existingEmail = mysqli_query($conn, "SELECT * FROM user WHERE email = '$email'") or die('query failed');

   if(mysqli_num_rows($select) > 0){
      $message[] = 'phone already exist'; 
   }else{
      if($pass != $cpass){
         $message[] = 'confirm password not matched!';
      }

      else if(mysqli_num_rows($existingEmail) > 0){
         $message[] = 'email already exists!';
      }
      else{
         $insert = mysqli_query($conn, "INSERT INTO user (fName, lName, dob, gender, address, phoneNo, houseNum, email, password, profile) VALUES('$fName','$lName','$dob', '$gender', '$address', '$phone', '$houseNum', '$email', '$pass', '$image')") or die('query failed');

         if($insert){
            move_uploaded_file($image_tmp_name, $image_folder);
            $message[] = 'registered successfully!';
            header('location:../view/login.php');
         }else{
            $message[] = 'registeration failed!';
         }
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
   <title>Register</title>

   <!-- custom css file link  -->
   <link rel="stylesheet" href="../resources/css/edir.css">
   <link rel="stylesheet" href="css/style.css">

</head>
<body>
   
<div class="form-container">

   <form action="" method="post" enctype="multipart/form-data">
      <h3>register now</h3>
      <?php
      if(isset($message)){
         foreach($message as $message){
            echo '<div class="message">'.$message.'</div>';
         }
      }
      ?>

         <div class="row">
            <div class="col-sm-6">
               <label>First Name</label>
               <input type="text" name="fName" class="form-control" required>
            </div><!-- End .col-sm-6 -->

            <div class="col-sm-6">
               <label>Last Name</label>
               <input type="text" name="lName" class="form-control" required>
            </div><!-- End .col-sm-6 -->
         </div><!-- End .row -->

         <div class="mt-2">
            <label>Email address</label>
            <input type="email" name="email" class="form-control" required>
         </div>

         <div class="row mt-2">
            <div class="col-sm-7">
               <label for="gender">Gender</label>
               <div class="select-custom">
                  <select name="gender" id="gender" class="form-control">
                     <option value="" selected="selected">select gender</option>
                     <option value="Male">male</option>
                     <option value="Female">female</option>
                  </select>
               </div>
            </div>
            <div class="col-sm-5">
               <label>DOB</label>
               <input type="date" name="dob" class="form-control" required>
            </div>
         </div>

      <div class="row mt-2">
         <div class="col-sm-8">
            <label>Address</label>
            <input type="text" name="address" class="form-control" required>
         </div>

         <div class="col-sm-4">
            <label>House No.</label>
            <input type="number" name="houseNum" class="form-control" required>
         </div>
      </div>
      <div class="mt-2">
         <label>phone No.</label>
         <input type="number" name="phoneNo" class="form-control">
      </div>  

      <div class="mt-2">
         <label>Profile Picture</label>
         <input type="file" name="image" class="form-control" accept="image/jpg, image/jpeg, image/png">
      </div>

      <div class="mt-2">
         <label>New password</label>
         <input type="password" name="password" class="form-control">
      </div>   

      <div class="mt-2">
         <label>Confirm new password</label>
         <input type="password" name="cpassword" class="form-control mb-2">
      </div>

         <button type="submit" name="submit" class="btn btn-outline-primary-2">
            <span>SAVE CHANGES</span>
            <i class="icon-long-arrow-right"></i>
         </button>
   </form>

</div>

</body>
</html>