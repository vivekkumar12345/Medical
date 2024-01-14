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
		<div id="user_data" style=" height: 92vh;">
			<div style="height: 15vh;"></div>
			<div style="margin-left: auto; margin-right: auto; height: 60vh;  width:60%; background-color: lightGrey; box-shadow: 0vh 0 10vh rgba(0,0,0,0.2);">
				<div style="padding: 2% 5vh; font-size: 15vh; float: left;"><i class=" fa fa-user fa-lg"></i></div>
				<div style="padding-top: 15vh; font-size: 4.5vh; font-family: monospace;">Appt's Name : Mr. <?php echo $_SESSION['apt']; ?><button type="button" name="chg" id="chg" style="color:blue; background:rgba(0,0,0,0); border-style:none; font-size:3vh"><i class="fa fa-edit fa-sm"></i></button></div></br>
				<center>
				<table width="50%">
					<tr style="height: 6vh; font-size: 3vh; font-family: monospace;">
					<td> Username : </td> <td><?php echo $_SESSION['username']; ?></td>

					</tr>
					<tr style="height: 6vh; font-size: 3vh; font-family: monospace;">
						<td> Department : </td> <td><?php echo $_SESSION['department']; ?></td>
					</tr>

				</table></br></br>
				<button class="btn btn-primary btn-md" id="edit">Change Profile Password</button>
				</center>

			</div>


		</div>	
			
<div id="user_dialog" style="display: none;">
			

<form method="post" id="user_form" action="chgpwd.php" >
<center>
	<div class="form-group" style="width: 50%;">
			<div class="form-group">
			<p>Old Password*</p>
			<input type="password" name="op" id="op" class="form-control" required>
			</div>		
			<div class="form-group">
			<p>New Password*</p>
			<input type="password" name="np1" id="np1" class="form-control" required>
			</div>	
			<div class="form-group">
			<p>Confirm Password*</p>
			<input type="text" name="np2" id="np2" class="form-control" onkeyup="check();"  required><span id="message" style="position: fixed; color: red; float: right; padding-left: 10%; margin-top: -4vh;"><i class="fa fa-check"> </i></span>
			</div>		
				</div>	


		<div class="form-group">
						<input type="hidden" name="action" id="action" value="insert" />
						<input type="hidden" name="hidden_id" id="hidden_id" />
						<input type="submit" name="form_action" id="form_action" class="btn btn-info mt-2"  value="insert"/>
					</div>
</center>
</form>
</div>
<div id="user_dialog1" style="display: none;">
			

<form method="post" id="user_form1" action="chgname.php" >
<center>
	<div class="form-group" style="width: 50%;">
			<div class="form-group">
			<p>New Appt Name*</p>
			<input type="text" name="appt" id="appt" class="form-control" required>
			</div>		
			<button type="submit" class="btn btn-primary btn-md">Change</button>
				</div>	
</center>
</form>
</div>



</div>
</div>
<script type="text/javascript">

	$(document).ready(function(){  

$("#user_dialog").dialog({
		autoOpen:false,
		width:'500',
		height:'350'
	});

	$(document).on('click', '#edit', function(){

		alert('After Changing your password your page will be redirected to login page');
		$('#user_dialog').attr('title', 'Update Password');
		$('#action').val('update');
		$('#form_action').val('uodate');
		$('#user_form')[0].reset();
		$('#form_action').attr('disabled', false);
		$("#user_dialog").dialog('open');
	});


$("#user_dialog1").dialog({
		autoOpen:false,
		width:'500',
		height:'350'
	});

	$(document).on('click', '#chg', function(){
		$("#user_dialog1").dialog('open');
	});




	});


</script>

<script type="text/javascript">
  function check() {
        var password = $("#np1").val();
        var confirmPassword = $("#np2").val();
        if (password == confirmPassword)
        {
            var x=document.getElementById('message').style.color='green';
        }
        else
        {
            var x=document.getElementById('message').style.color='red';
        }
    }

</script>
</body>