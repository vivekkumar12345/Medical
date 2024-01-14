<?php 

include('../connection.php');
session_start();
		$query = "DELETE from med_stock where stock_id='".$_POST['id']."'";
		$result=mysqli_query($conn, $query);
?>