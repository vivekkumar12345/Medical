<?php 

include('../connection.php');
session_start();

		$query = "SELECT * FROM med_list WHERE med_id = '".$_POST["id2"]."'";
		$result=mysqli_query($conn, $query);
		$row=mysqli_fetch_assoc($result);

		$query1 = "SELECT * FROM med_stock WHERE stock_id = '".$_POST["id"]."'";
		$result1=mysqli_query($conn, $query1);
		$row1=mysqli_fetch_assoc($result1);
			
			$output['med_name'] = $row['med_name'];
			$output['weight'] = $row['weight'];
			$output['qty'] = $row1['qty'];
			$output['amt'] = $row1['amt'];
			$output['stock'] = $row1['stock'];
			$output['date'] = $row1['date'];
			$output['ids'] = $row1['stock_id'];

		echo json_encode($output);
?>