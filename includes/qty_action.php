<?php

include('../connection.php');
session_start();


$sql = "INSERT INTO med_list (med_name, weight) VALUES ('".$_POST["med_name"]."', '".$_POST["weight"]."')";

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