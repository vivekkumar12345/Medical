<?php
include 'connection.php';

$sq="UPDATE admission set test_stage='Initiated' where admn_id='".$_POST['ids']."'";
$qu=mysqli_query($conn, $sq);

$ct=$_POST['ct'];
foreach ($_POST['checkbox'] as $md)
{
$sql="SELECT test_name_id from test_list where test_name='$md'";
$query=mysqli_query($conn, $sql);
$row=mysqli_fetch_assoc($query);
$sqls="INSERT into test (admn_id, test_name_id, result, remarks) values ('".$_POST['ids']."', '".$row['test_name_id']."', '', '')";
$querys=mysqli_query($conn, $sqls);

if($querys){

	echo '<script> alert("Successfully Alloted Tests");
				window.location="test.php";
				</script>';
			}
else{

	echo '<script> alert("Failed to Allot Tests");
				window.location="test.php";
				</script>';
}
}


?>