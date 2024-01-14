<?php

//action.php

include('../connection.php');
session_start();
if(isset($_POST["action"]))
{
				
	if($_POST["action"] == "fetch_single")
	{
		$query = "SELECT * FROM admission WHERE admn_id = '".$_POST["id"]."'";
		$result=mysqli_query($conn, $query);
		while ($row=mysqli_fetch_assoc($result))
		{
			$output['history'] = $row['history'];
			$output['diag'] = $row['Diag'];
			$output['treatment'] = $row['treatment'];
			$output['investigation'] = $row['investigation'];
			$output['status'] = $row['status'];


			
			
		}
		echo json_encode($output);
	}
	if($_POST["action"] == "update")
	{

		$date=date('Y-m-d');
		$query = "UPDATE admission SET status='".$_POST['status']."', fwd_pathology='".$_POST['test']."', history='".$_POST['history']."',  Diag='".$_POST['diag']."',  treatment='".$_POST['treatment']."',  investigation='".$_POST['investigation']."' WHERE admn_id = '".$_POST["hidden_id"]."'";
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
	
}

?>