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
<script src="script/user_registration.js"></script>
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
<button style="position: fixed; font-size: 4vh; border-style: none; background-color: transparent; color: green; left: 10%; top:5vh;" onclick="location.href='home.php'"><i class="fa fa-home fa-lg"></i></button>
<?php
include 'connection.php';
session_start();
$date=date('Y-m-d');
$date1=date('d-m-Y');
$sqls="SELECT max(day_id) as max from admission where date='$date' and department='".$_POST["department"]."'";
$querys=mysqli_query($conn, $sqls);
if($rows=mysqli_fetch_assoc($querys)){
$ct=$rows['max']+1;
}
else{
$ct=1;	
}
$sql="INSERT INTO admission (patient_id, department, temp, l_bp, h_bp, pulse, spo, date, history, Diag, treatment, investigation, day_id) VALUES ('".$_POST["id1"]."', '".$_POST["department"]."', '".$_POST["temp"]."', '".$_POST["l_bp"]."', '".$_POST["h_bp"]."', '".$_POST["pulse"]."', '".$_POST["spo"]."', '$date', ' ', ' ', ' ', ' ', '$ct')";
$query=mysqli_query($conn, $sql);

if($query){



$sqli="SELECT * from patient_details where patient_id='".$_POST["id1"]."'";
$queryi=mysqli_query($conn, $sqli);
if($rowi=mysqli_fetch_assoc($queryi))
?>



<div class="admn" id="print">
	<center><h2 style="padding-top: 3.5vh; font-weight: bold; text-decoration: underline; font-size: 3.5vh;"><img src="images/logo.jpg" style="float: left; margin-top: -2vh;">BISON HEALTH CLINIC<img src="images/logo.jpg" style="float: right; margin-top: -2vh;"></h2></center>

	<table width="90%" style="margin-right: auto; margin-left: auto">
		<tr style="height: 3vh;">
			<td style="text-decoration: underline; font-weight: bold;">OPD Ser No</td>
			<td style=" width: 35%;" colspan="2"><?php echo $ct; ?></td>
			<td style="text-decoration: underline; font-weight: bold;">Rel</td>
			<td ><?php echo $rowi['rel']; ?></td>

		</tr>
		<tr style="height: 3vh;">
			<td style="text-decoration: underline; font-weight: bold;">Name of Patient</td>
			<td style=" width: 35%;" colspan="2"><?php echo $rowi['name_of_patient']; ?></td>
			<td style="text-decoration: underline; font-weight: bold;">Age</td>
			<td colspan="2"><?php echo $rowi['age'];?>yrs <?php echo $rowi['month']; ?>months</td>

		</tr>
		<tr style="height: 3vh;">
			<td style="text-decoration: underline; font-weight: bold;">No</td>
			<td style=" width: 35%;" colspan="2"><?php echo $rowi['army_no']; ?></td>
			<td style="text-decoration: underline; font-weight: bold;">Rank</td>
			<td ><?php echo $rowi['rank']; ?></td>

		</tr>
		<tr style="height: 3vh;">
			<td style="text-decoration: underline; font-weight: bold;">Name</td>
			<td style=" width: 35%;"colspan="2"><?php echo $rowi['name']; ?></td>
			<td style="text-decoration: underline; font-weight: bold;">Date</td>
			<td ><?php echo $date1; ?></td>

		</tr>
		
		<tr style="height: 3vh;">
			<td style="text-decoration: underline; font-weight: bold;">Unit</td>
			<td colspan="4"><?php echo $rowi['unit']; ?></td>

		</tr>

<tr style="height: 3vh; border: 1px solid black; text-align: center;">
			<td style="text-align: center; border: 1px solid black; width: 25%;">Body Temp</td>
			<td style="text-align: center; border: 1px solid black; width: 25%;" colspan="2">Blood Pressure</td>
			<td style="text-align: center; border: 1px solid black; width: 25%;" colspan="2">Pulse Rate</td>
			<td style="text-align: center; border: 1px solid black; width: 25%;" colspan="2">SPO2</td>

		</tr>
		<tr style="height: 3vh; border: 1px solid black; text-align: center;">
			<td style="text-align: center; border: 1px solid black;"><?php echo $_POST['temp']; ?></td>
			<td style="text-align: center; border: 1px solid black;" colspan="2"><?php echo $_POST['h_bp'].'/'.$_POST['l_bp']; ?></td>
			<td style="text-align: center; border: 1px solid black;" colspan="2"><?php echo $_POST['pulse']; ?></td>
			<td style="text-align: center; border: 1px solid black;" colspan="2"><?php echo $_POST['spo']; ?></td>
		</tr>
<tr><td style="height: 3vh;"></td></tr>



		<tr style="height: 3vh;">
			<td colspan="8" style="text-decoration: underline; font-weight: bold;">History : </td>

		</tr>
		<tr>
			<td colspan="5" style="height: 10vh;"></td>
		</tr>

		<tr style="height: 2vh;">
			<td colspan="8" style="text-decoration: underline; font-weight: bold;">Diag : </td>

		</tr>
		<tr>
			<td colspan="5" style="height: 10vh;"></td>
		</tr>

		<tr style="height: 2vh;">
			<td colspan="8" style="text-decoration: underline; font-weight: bold;">Treatment : </td>

		</tr>
		<tr>
			<td colspan="5" style="height: 10vh;"></td>
		</tr>

		<tr style="height: 2vh;">
			<td colspan="8" style="text-decoration: underline; font-weight: bold;">Investigation : </td>

		</tr>
		<tr>
			<td colspan="5" style="height: 10vh;"></td>
		</tr>

		<tr>
			<td>Date</td>
			<td style="text-decoration: underline; font-weight: bold;" colspan="4"></td>
			<td style="text-decoration: overline; float: right; font-weight: bold; padding-right:10%" colspan="3"> Sig of MO I/C</td>
		</tr>
	</table>

	

</div>


<?php


}

else{

echo 'failed';

}

 ?>

 <button class="btn btn-success mt-3" style="margin-left: auto; margin-right: auto; margin-left: 48%; margin-top: 2vh;" onclick="test()">Print</button>
</body>

<script>
	


      function test() {
       
        var pr = document.getElementById('print').innerHTML;
        var body=document.body.innerHTML;
        document.body.innerHTML=pr;

        window.print();    
        document.body.innerHTML=body;

           }
    </script>


















