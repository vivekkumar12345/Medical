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
}

?>