
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
<script src="script/consulted.js"></script>
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
			
			<div class="form-group" style="float: left; width: 90%;">
			<div class="form-group">
			<p>Diagnosis*</p>
			<textarea type="text" id="diag" name="diag" rows="6" class="form-control" required>
			</textarea>
		</div>
	</div>

			

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