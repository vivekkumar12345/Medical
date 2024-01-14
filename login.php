<?php 
session_start();
include 'connection.php';
$sql="SELECT * from user where username='".$_POST['username']."' and password='".$_POST['password']."'";
$query=mysqli_query($conn, $sql);
if($row=mysqli_fetch_assoc($query)){
$_SESSION['user_id']=$row['user_id'];
$_SESSION['user_seq']=$row['user_seq'];
$_SESSION['department']=$row['department'];
$_SESSION['department_seq']=$row['department_seq'];
$_SESSION['username']=$row['username'];
$_SESSION['apt']=$row['apt'];

if($row['department']=='Registration'){
header('location:home.php');
}
elseif ($row['department']=='Dental' || $row['department']=='General') {
	header('location:consult.php');
}
elseif($row['department']=='Medicine') {
	header('location:med.php');
}
elseif($row['department']=='Pathology') {
	header('location:test.php');
}
}

else{

echo "<script>
	
	alert ('Username or Password May be wrong! please try again');
	window.location.replace('index.php');
</script>";

}

?>