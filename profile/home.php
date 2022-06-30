<?php
include 'config.php';
session_start();
$user_id = $_SESSION['user_id'];

if(!isset($user_id)){
   header('location:../view/login.php');
};

// if(isset($_GET['logout'])){
  
//    header('location:../controller/logout.php');
// }

?>

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Profile</title>

    <!-- custom css file link  -->
    <link rel="stylesheet" href="css/style.css">

</head>
<body>
   
<div class="container">

   <div class="profile">
      <?php
         $select = mysqli_query($conn, "SELECT * FROM user WHERE user_id = '$user_id'") or die('query failed');
         if(mysqli_num_rows($select) > 0){
            $fetch = mysqli_fetch_assoc($select);
         }
         if($fetch['profile'] == ''){
            echo '<img src="images/default-avatar.png">';
         }else{
            echo '<img src="uploaded_img/'.$fetch['profile'].'">';
         }
      ?>
      <h3><?php echo $fetch['fName']." ".$fetch['lName']; ?></h3>
      <a href="addChild.php" class="btn" style="background-color: #32CD32;">Add Childrens</a>
      <a href="../view/timeline.php" class="btn">Home</a>
      <a href="update_profile.php" class="btn">update profile</a>
      <a href="../controller/logout.php" class="delete-btn">logout</a>

      
   </div>

</div>
</body>
</html>