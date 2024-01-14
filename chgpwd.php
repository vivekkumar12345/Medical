<?php
session_start();
include 'connection.php';
$sql="SELECT * from user where username='".$_SESSION['username']."'";
$query=mysqli_query($conn, $sql);
$row=mysqli_fetch_assoc($query);
if($_POST['op']==$row['password'])
{

if($_POST['np1']==$_POST['np2']){

	$sqls="UPDATE user set password='".$_POST['np2']."' where user_id='".$row['user_id']."'";
	$querys=mysqli_query($conn, $sqls);
	if($querys){

		echo '<script> alert("Successfully Updated Profile Password");
				window.location="logout.php";
				</script>';
	}
	else{
			echo '<script> alert("Unable to Update Profile Password");
				window.location="profile.php";
				</script>';

	}

}
else{

	echo '<script> alert("Password Does not change");
				window.location="profile.php";
				</script>';
}

}
else{

echo '<script> alert("Incorrect Old Password");
				window.location="profile.php";
				</script>';

}


?>