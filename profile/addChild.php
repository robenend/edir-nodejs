<?php
include 'config.php';
session_start();

if(isset($_GET['file'])){
    $file = $_GET['file'];
    $filename = '../resources/'.$file;
    if(file_exists($filename)) {

        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header("Cache-Control: no-cache, must-revalidate");
        header("Expires: 0");
        header('Content-Disposition: attachment; filename="'.basename($filename).'"');
        header('Content-Length: ' . filesize($filename));
        header('Pragma: public');
        
        flush();
        readfile($filename);
        die();
        }
        else{
            echo "File does not exist.";
        }
}

if(isset($_POST['upload'])){
    
    $filename = $_FILES["uploadfile"]["name"];
    $tempname = $_FILES["uploadfile"]["tmp_name"]; 
    $parent_id = $_SESSION['user_id'];
    if (($open = fopen($tempname, "r")) !== FALSE) 
      {
      
         while (($data = fgetcsv($open, 1000, ",")) !== FALSE) 
         {        
            $child[] = $data[0]; 
            $dob[] = $data[1];
         }
         
         for($i=1; $i<count($child); $i++){
            $fdob[$i] = date('Y-m-d',strtotime($dob[$i]));
            $childSql = "INSERT INTO children(parent_id, childName, dob) VALUES('$parent_id','$child[$i]', '$fdob[$i]')";
            $result = mysqli_query($conn, $childSql);
         }
      
         fclose($open);
      }
}

if(isset($_POST['submit'])){

   $phone = mysqli_real_escape_string($conn, $_POST['phone']);
   $pass = mysqli_real_escape_string($conn, md5($_POST['password']));

   $select = mysqli_query($conn, "SELECT * FROM user WHERE phoneNo = '$phone' AND password = '$pass'") or die('query failed');

   if(mysqli_num_rows($select) > 0){
      $row = mysqli_fetch_assoc($select);
      $_SESSION['user_id'] = $row['user_id'];
      header('location:home.php');
   }else{
      $message[] = 'incorrect email or password!';
   }

}

?>

<?= require_once 'profile-header.php'?>
   
<div class="form-container">
   <form action="" method="POST" enctype="multipart/form-data">
      <h3>Upload the csv file</h3>
      <p style="color: #e74c3c;">Please download and fill the required data as stated</p>
      <input type="file" name="uploadfile" placeholder="csv file" class="box" accept=".csv" required>
      <button name="upload" class="btn">Upload File</button>
      <a href="?file=ChildForm.csv" name="download" class="btn">Download CSV sample</a>
      <a href="home.php" class="delete-btn">Back to Home</a>
   </form>
</div>

</body>
</html>