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
			
			$output['diag'] = $row['Diag'];
			$output['treatment'] = $row['treatment'];
			$output['history'] = $row['history'];
			$output['investigation'] = $row['investigation'];
			$output['ids'] = $row['admn_id'];


			
			
		}
		echo json_encode($output);
	
	
}


if($_POST["action"] == "fetch_alone")
	{
	include 'connection.php';
	$sqle1="SELECT distinct(med_name) from med_list";
	$querye1=mysqli_query($conn, $sqle1);
	$users_arr = array();
	while($rowe1=mysqli_fetch_assoc($querye1)){
		$med_name= $rowe1['med_name'];
	 $users_arr[] = array("cluster" => $cluster);			
			
		}
echo json_encode($users_arr);
	
	
}
}

?>