<?php

include('../connection.php');
session_start();

$sqls="SELECT med_id from med_list where med_name='".$_POST['med_name']."' and weight='".$_POST['weight']."'";
$results=mysqli_query($conn, $sqls);
$rows=mysqli_fetch_assoc($results);

$sql = "INSERT INTO med_stock (med_id, qty, stock, amt, date) VALUES ('".$rows["med_id"]."', '".$_POST["qty"]."', '".$_POST["stock"]."', '".$_POST["amt"]."', '".$_POST["date"]."')";

		$result=mysqli_query($conn, $sql);
				if($result)
				{
					echo '<p>data successfully inserted</p>';
				}
				else
				{
					echo '<p>check your error</p>';
				}

?>
