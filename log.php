<?php  session_start(); ?>
<div style="width: 5%; height: 100%; float: left; padding-left: 1.5vh;"><img src="images/logo.png"></div><div style="width: 40%; height: 100%; float: left; padding-top: 1.5vh; padding-left: 1%;"><a style="font-family: monospace; color: white; font-size: 4vh; font-weight: bold; padding-left: 2%; text-decoration: none; ">BISON HEALTH CLINIC</a>
	</div>
<div style="width: 15%; height: 100%; float: right; padding-top: 1vh;"><a style="font-family: monospace; color: white; font-size: 3vh; padding-top: 3vh;  font-weight: bold; text-decoration: none;"><?php echo $_SESSION['department']; ?></a><button style=" background-color: transparent; border-style: none; font-size: 4vh; padding-right: 15%; float:right; " onclick="show()"><i class=" fa fa-user fa-lg" style="color: white;"></i> </button></div>

<div id="show" style="width: 10%; height: 15vh; background-color: rgba(0,0,0,0.8); position: fixed; top: 8vh; left:87%; display: none;">
 </div>
 <div id="user-logout" class="user-logout" style="display: none;">
	<a href="profile.php">Profile Info</a>
	<a href="logout.php">Logout</a>

</div>



<script type="text/javascript">
			function show(){
				var x = document.getElementById('user-logout');

				if(x.style.display=='none')
				{

					x.style.display='block';
				}
				else
				{

					x.style.display='none';
				}


			}

		</script>