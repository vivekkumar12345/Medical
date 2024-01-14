<?php
$no = $_POST['ser']-1;
include 'connection.php';
session_start();
for ($i=0; $i < $no ; $i++) { 

$sql="UPDATE test set result='".$_POST['result'][$i]."' where test_id='".$_POST['test'][$i]."'"	;
$query = mysqli_query($conn, $sql);
if($query)	{

	echo '<script> alert("Successfully Feeded Results");
				window.location="Result.php";
				</script>';
}else{

echo '<script> alert("Failed to Feed Results");
				window.location="Result.php";
				</script>';

}

}


?> 