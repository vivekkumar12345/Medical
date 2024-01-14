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
<script src="script/consult.js"></script>
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

	<div class="tophead"><?php include 'log.php'; ?></div>
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
			<div class="form-group" style=" width: 55%;">
				<div class="form-group">
			<p>History*</p>
			<textarea type="text" id="history" name="history" rows="2" class="form-control" required>
			</textarea>
		</div>
		<div class="form-group">
			<p>Diagnosis*</p>
			<textarea type="text" id="diag" name="diag" rows="2" class="form-control" required>
			</textarea>
		</div>
		<div class="form-group">
			<p>Treatment*</p>
			<textarea type="text" id="treatment" name="treatment" rows="2" class="form-control" required>
			</textarea>
		</div>
		<div class="form-group">
			<p>Investigation*</p>
			<textarea type="text" id="investigation" name="investigation" rows="2" class="form-control" required>
			</textarea>
		</div>
				<div class="form-group">
			<p>Status*</p>
			<select id="status" name="status" class="form-control" required>
				<option value="Diagnosed">Diagnosed</option>
				<option value="Absent">Absent</option>
			</select>
			</div>
			<div class="form-group">
			<p>Fwd to Pathology*</p>
			<select id="test" name="test" class="form-control" required>
				<option value="No">No</option>
				<option value="Yes">Yes</option>
			</select>
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

			</div>
			<div id="user_dialog2" style="display: none;">
					
			</div>
<div id="user_dialog3" style="display: none;">
					
			</div>



		</div>
	</div>
</body>