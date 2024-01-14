<?php 
if($_SESSION['department']=='Registration'){

  ?>
<nav class="navigation">
  <ul class="mainmenu">
    <li><a href="home.php">Register Patients</a></li>
    <li><a href="patient.php">Today's Patient's List</a></li>
    <li><a href="list.php">Diagnosed Patient's list</a></li>
  </ul>
</nav>
<?php }
?>

<?php 

if($_SESSION['department']=='Dental' || $_SESSION['department']=='General'){

  ?>
<nav class="navigation">
  <ul class="mainmenu">
    <li><a href="consult.php">Daily OPD Patients</a></li>
     <li><a href="today_consulted.php">Today's Consulted Patients</a></li>
    <li><a href="consulted.php">Consulted Patients</a></li>
  </ul>
</nav>
<?php }
?>
<?php 

if($_SESSION['department']=='Medicine'){

  ?>
<nav class="navigation">
  <ul class="mainmenu">
    <li><a href="med.php">Allot Medicine</a></li>
     <li><a href="med_alloted.php">today's Medicine Allotment</a></li>
    <li><a href="med_alloted_all.php">Medicine Allotment Overall</a></li>
    <li><a href="stock.php">Stock in/out Medicine</a></li>
    <li><a href="qty.php">State of Medicine</a></li>
  </ul>
</nav>
<?php }
?>
<?php 

if($_SESSION['department']=='Pathology'){

  ?>
<nav class="navigation">
  <ul class="mainmenu">
    <li><a href="test.php">Allot Test</a></li>
     <li><a href="Result.php">Feed Test Results</a></li>
    <li><a href="Result_view.php">Tested Patients</a></li>
  </ul>
</nav>
<?php }
?>


