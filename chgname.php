<?php 
include 'connection.php';
session_start();
$sql="UPDATE user SET apt='".$_POST['appt']."' where username='".$_SESSION['username']."'";
$query=mysqli_query($conn, $sql);
if($query){
echo '<script> alert("Successfully Updated Apointment Name Redirecting to Login Page");
				window.location="logout.php";
				</script>';

			}
			else{

					echo '<script> alert("Unable to Update Appt Name please try again later ");
				window.location="profile.php";
				</script>';

			}
?>