<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="viewport" content="width=device-width; initial-scale=1.0" >
<title>Medical</title>
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="css/font-awesome.css" rel="stylesheet" type="text/css">
<link href="css/all.css" rel="stylesheet" type="text/css">
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/jquery.js"></script>
<link rel="stylesheet" type="text/css" href="style.css">
<script type="text/javascript" src="js/all.js"></script>
<script type="text/javascript" src="js/auto.js"></script>
<script type="text/javascript" src="js/jquery.min.js"></script>
<link rel="stylesheet" href="css/jquery-ui.css">
<script src="js/jquery-ui.js"></script>
<style>
.user-logout {
width: 15%; 
height: 12vh; 
position: fixed; 
top:8vh; 
background-color: rgba(0,0,0,0.9); 
left:87%; 
}
.user-logout a{
  color: white;
  display: block;
  text-decoration: none;
  font-size: 2.5vh;
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-left: 20%;
  cursor: pointer;
}
.user-logout a:hover{

  background-color: blue;
}
</style>

</head>

<body>
<?php

include 'connection.php';
session_start();
$count=count($_POST['med_name']);


$sqld="UPDATE admission set history='".$_POST['history']."', diag='".$_POST['diag']."', treatment='".$_POST['treatment']."', investigation='".$_POST['investigation']."' where admn_id='".$_POST['ids']."'";
$queryd=mysqli_query($conn, $sqld);

for ($i=0; $i < $count ; $i++) { 
	if (isset($_POST['weight'][$i])) {

$sqlm="SELECT med_id from med_list where med_name='".$_POST['med_name'][$i]."' and weight='".$_POST['weight'][$i]."'";
$querym=mysqli_query($conn, $sqlm);
$rowm=mysqli_fetch_assoc($querym);



$total_med=$_POST['dose'][$i]*$_POST['days'][$i];

$sql="INSERT into allot_medicine (admn_id, med_id, med_per_day, no_of_days, total_med, supply_status) VALUES ('".$_POST['ids']."', '".$rowm['med_id']."','".$_POST['dose'][$i]."', '".$_POST['days'][$i]."', '$total_med', 'alloted')";
$result=mysqli_query($conn, $sql);

if($result)
			{
				echo '<script> alert("Successfully Alloted Medicine");
				window.location="med.php";
				</script>';
			}
			else
			{
				echo '<script> alert("Failed to Allot Medicine");
				window.location="med.php";
				</script>';
			}

}
else{}
}

 ?>
 </div>
</body>