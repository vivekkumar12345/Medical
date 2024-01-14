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

	<div class="tophead">
		<?php
		 include 'log.php'; ?>

		
	</div>
	<div style="height: 8vh;"></div>

	<div class="body-main">
		<div class="body-left">
			<?php include 'menu.php'; 

			?>
		</div>
		<div class="body-right">
			<div id="user_data" style=" overflow-y: scroll; height: 92vh;"></div>	
			
<div id="user_dialog" style="display: none;">
			

<form method="post" id="user_form" >	
			<div class="form-group" style="float: left; width: 35%;">
				<div class="form-group">
			<p>Relation*</p>
			<select id="rel" name="rel" class="form-control" required>
				<option value="Mother">Mother</option>
				<option value="Father">Father</option>
				<option value="Wife">Wife</option>
				<option value="Son">Son</option>
				<option value="Daughter">Daughter</option>
				<option value="Brother">Brother</option>
				<option value="Sister">Sister</option>
				<option value="Self">Self</option>
			</select>
			</div>
			<div class="form-group">
			<p>Patient's Name*</p>
			<input type="text" id="name_of_patient" name="name_of_patient" class="form-control" required>

			</div>
			<div class="form-group">
			<p>Age*</p>

			<input type="text" id="age" name="age" class="form-control" style="width: 45%; float: left;" placeholder="Yrs" required>
			<input type="text" id="month" name="month" class="form-control" style="width: 45%; float: right;" placeholder="Months" required>

			</div>
			<div class="form-group">
			<p>Army No*</p>
			<input type="text" id="army_no" name="army_no" class="form-control" required>

			</div>
				</div>	



<div class="form-group" style="float: right; width: 35%;">
			<div class="form-group">
			<p>Services*</p>
			<select id="service" name="service" class="form-control" required>
				<option>Army</option>
				<option>Airforce</option>
				<option>Navy</option>
			</select>
			</div>
			<div class="form-group">
			<p>Rank*</p>
			<input type="text" id="rank" name="rank" class="form-control" required>
			</div>
			<div class="form-group">
			<p>Name*</p>
			<input type="text" id="name" name="name" class="form-control" required>

			</div>
			<div class="form-group">
			<p>Unit*</p>
			<input type="text" id="unit" name="unit" class="form-control" required>

			</div>

				</div>	
		<div class="form-group">
						<input type="hidden" name="action" id="action" value="insert" />
						<input type="hidden" name="hidden_id" id="hidden_id" />
						<input type="submit" name="form_action" id="form_action" class="btn btn-info mt-2"  value="insert"/>
					</div>
	</form>			
			</div>



<div id="user_dialog1" style="display: none;">

<form method="post" id="user_form1" action="admit-form.php">	
			<div class="form-group" style="float: left; width: 40%;">
				<div class="form-group">
			<p>Relation*</p>
			<select id="rel1" name="rel1" class="form-control" required>
				<option value="Mother">Mother</option>
				<option value="Father">Father</option>
				<option value="Wife">Wife</option>
				<option value="Son">Son</option>
				<option value="Daughter">Daughter</option>
				<option value="Brother">Brother</option>
				<option value="Sister">Sister</option>
			</select>
			</div>
			<div class="form-group">
			<p>Patient's Name*</p>
			<input type="text" id="name_of_patient1" name="name_of_patient1" class="form-control" required>
			
			</div>
			<input type="hidden" id="id1" name="id1" class="form-control" required>
			<div class="form-group">
			<p>Age *</p>
			<input type="text" id="age1" name="age1" class="form-control" style="width: 45%; float: left;" placeholder="Yrs" required>
			<input type="text" id="month1" name="month1" class="form-control" style="width: 45%; float: right;" placeholder="Months" required>

			</div>
			<div class="form-group">
			<p>Army No*</p>
			<input type="text" id="army_no1" name="army_no1" class="form-control" required>

			</div>
						<div class="form-group">
			<p>Services*</p>
			<select id="service1" name="service1" class="form-control" required>
				<option>Army</option>
				<option>Airforce</option>
				<option>Navy</option>
			</select>
			</div>
<div class="form-group">
			<p>Rank*</p>
			<input type="text" id="rank1" name="rank1" class="form-control" required>

			</div>
		<div class="form-group">
			<p> &nbsp;</p>
						<input type="submit" class="btn btn-info mt-2s"  value="insert"/>
					</div>
				</div>	



<div class="form-group" style="float: right; width: 40%;">

				
			<div class="form-group">
			<p>Name*</p>
			<input type="text" id="name1" name="name1" class="form-control" required>

			</div>

			<div class="form-group">

			<p>Unit*</p>
			<input type="text" id="unit1" name="unit1" class="form-control" required>
		</div>
			<div class="form-group">
			<p>Depratment*</p>
			<select id="department" name="department" class="form-control" required>
				<option class="form-control" value="General">General</option>
				<option class="form-control" value="Dental">Dental</option>
			</select>
			</div>
			<div class="form-group">
			<p>Body Temp in Farenheit*</p>
			<input type="text" id="temp" name="temp" class="form-control" required>
			</div>
			<div class="form-group">
			<p>Blood Pressure*</p>
			<input type="text" id="h_bp" name="h_bp" class="form-control" style="width: 45%; float: left;" placeholder="High" required>
			<input type="text" id="l_bp" name="l_bp" class="form-control" style="width: 45%; float: right;" placeholder="Low" required>
			
			</div>
			<div class="form-group">
			<p>Pulse Rate (per minute)*</p>
			<input type="text" id="pulse" name="pulse" class="form-control" required>
			</div>
			<div class="form-group">
			<p>SPO2*</p>
			<input type="text" id="spo" name="spo" class="form-control" required>
			</div>


				</div>	

	</form>			
			</div>


		</div>
	</div>

<div id="#delete_confirmation"></div>
</body>