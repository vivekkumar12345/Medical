
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
<script src="script/test.js"></script>

<link rel="stylesheet" href="css/jquery-ui.css">
<link rel="stylesheet" href="css/bootstrap.min.css">
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
			
			
			<form method="post" action="allot_test.php" id="user_form">
					<input type="hidden" name="ids" id="ids">
				</br>
				<center>
						<h3>TESTS</h3>
					<table id="medicines" cellpadding="5px" width="60%" style="border-spacing: 15px; text-align: center;">	
						<thead style="height: 7vh; text-align: center;">
						<tr >
							<td width="5%" style="color: black; height: 4vh; border: 1px solid black;">Select</td>
							<td width="5%" style="color: black; height: 4vh; border: 1px solid black;">S No</td>
							<td width="15%" style="color: black; height: 4vh; border: 1px solid black;">Test*</td>
						</tr>
					
				</thead>
				<?php 
				include 'connection.php';
				$ser=1;
				$sqls="SELECT test_name from test_list";
				$querys=mysqli_query($conn, $sqls);
				while($rows=mysqli_fetch_assoc($querys)){

				 ?>
					<tr>
					<td style="height: 4vh; border: 1px solid black;">
						<input class="itemRow" name="checkbox[]" type="checkbox" value="<?php echo $rows['test_name']; ?>">
					</td>
						<td style="color: black; height: 4vh; border: 1px solid black;">
						<?php echo $ser; ?>
					</td>	
					<td style="color: black; height: 4vh; border: 1px solid black;"><?php echo $rows['test_name']; ?></td>
				</tr>
			<?php $ser++; } ?>
			<input type="hidden" name="ct" id="ct" value="<?php echo $ser; ?>">
					</table>
					</center>
							
	
			
		
				<div align="center" class="form-group" style="margin-top: 5vh">
					<input type="hidden" name="action" id="action" value="insert" />
					<input type="hidden" name="hidden_id" id="hidden_id" />
					<input type="submit" name="form_action" id="form_action" style="width: 40%;" class="btn btn-info" value="insert"/>
				</div>
			
			</center>	
				
			</form>
		</div>
		


		</div>


	
</body>