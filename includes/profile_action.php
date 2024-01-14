<?php

//action.php

include('../connection.php');
session_start();
if(isset($_POST["action"]))
{
	if($_POST["action"] == "insert")
	{	
		
		$date=date('Y-m-d');
$sql = "
		INSERT INTO patient_details (rel, name_of_patient, age, army_no, service, rank, name, date_of_reg, unit) VALUES ('".$_POST["rel"]."', '".$_POST["name_of_patient"]."', '".$_POST["age"]."', '".$_POST["army_no"]."', '".$_POST["service"]."', '".$_POST["rank"]."', '".$_POST["name"]."', '$date', '".$_POST["unit"]."')";

		$result=mysqli_query($conn,$sql);
				if($result)
				{
					echo '<p>data successfully inserted</p>';
				}
				else
				{
					echo '<p>check your error</p>';
				}
			
	}

				
	if($_POST["action"] == "fetch_single")
	{
		$query = "SELECT * FROM patient_details WHERE patient_id = '".$_POST["id"]."'";
		$result=mysqli_query($conn, $query);
		while ($row=mysqli_fetch_assoc($result))
		{
			
			$output['rel'] = $row['rel'];
			$output['name_of_patient'] = $row['name_of_patient'];
			$output['age'] = $row['age'];
			$output['army_no'] = $row['army_no'];
			$output['service'] = $row['service'];
			$output['rank'] = $row['rank'];
			$output['name'] = $row['name'];
			$output['unit'] = $row['unit'];
			$output['id1'] = $row['patient_id'];

			
			
		}
		echo json_encode($output);
	}
	if($_POST["action"] == "update")
	{

		$date=date('Y-m-d');
		$query = "UPDATE patient_details SET rel='".$_POST['rel']."', name_of_patient='".$_POST['name_of_patient']."', age='".$_POST['age']."', army_no='".$_POST['army_no']."', service='".$_POST['service']."', rank='".$_POST['rank']."', name='".$_POST['name']."', unit='".$_POST['unit']."' WHERE patient_id = '".$_POST["hidden_id"]."' ";
		$result=mysqli_query($conn,$query);
			if($result)
			{
				echo "<p>your data has been successfully update</p>";
			}
			else
			{
				echo "<p>check your query</p>";
			}
	}
	if($_POST["action"] == "delete")
	{
		$query = "DELETE FROM lve_details WHERE army_no = '".$_POST["id"]."'";
		$result=mysqli_query($conn,$query);
		if($result)
		{
			echo "<p>delete successfully</p>";

		}
		else
		{
			echo "<p>check query</p>";
		}
	}
	
}

?>