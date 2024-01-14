<?php

include('connection.php');
session_start();


$query = "UPDATE med_stock SET amt='".$_POST['amt1']."', qty='".$_POST['qty1']."', date='".$_POST['date1']."' WHERE stock_id = '".$_POST["id"]."' ";
		$result=mysqli_query($conn,$query);
			if($result)
			{
				echo '<script> alert("Successfully Updated");
				window.location="stock.php";
				</script>';
			}
			else
			{
				echo '<script> alert("Failed to Update");
				window.location="stock.php";
				</script>';
			}


?>