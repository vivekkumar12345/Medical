<style type="text/css">
	
.tbl td{


	border: 1px solid black;
}


</style>


<?php

include '../connection.php';

$sql="SELECT patient_id from admission where admn_id='".$_POST['id']."'";
$query=mysqli_query($conn, $sql);
$row=mysqli_fetch_assoc($query);
$sql2="SELECT * from patient_details where patient_id='".$row['patient_id']."'";
$query2=mysqli_query($conn, $sql2);
$row2=mysqli_fetch_assoc($query2);
?>


<table style="margin-bottom: 5vh;">
<tr>
	<td width="10%" style="font-weight: bold;">Admn Id : </td><td width="10%"> <?php echo $_POST['id']; ?></td>
	<td width="10%" style="font-weight: bold;">Rel : </td><td width="10%"> <?php echo $row2['rel']; ?></td>
	<td width="20%" style="font-weight: bold;">Patient's Name : </td><td width="20%"> <?php echo $row2['name_of_patient']; ?></td>
	<td width="10%" style="font-weight: bold;">Age : </td><td width="10%"> <?php echo $row2['age']; ?></td>

</tr>	

</table>
<table id="medicines" style="width: 100%; text-align: center;" class="tbl">	
						<thead style="height: 7vh; text-align: center; font-weight: bold;">
						<tr >
							<td width="5%">S No</td>
							<td width="20%">Medicine Name</td>
							<td width="15%">Weight</td>
							<td width="15%">Dose per day</td>
							<td width="15%">No days of</td>

						</tr>
					
				</thead>
<?php
$count=1;
$sql3="SELECT * from allot_medicine where admn_id='".$_POST['id']."'";
$query3=mysqli_query($conn, $sql3);
while($row3=mysqli_fetch_assoc($query3)){

$sql4="SELECT * from med_list where med_id='".$row3['med_id']."'";
$query4=mysqli_query($conn, $sql4);
$row4=mysqli_fetch_assoc($query4);



 ?>
				<tr>
					<td width="5%"><?php echo $count; ?></td>
					<td width="20%"><?php echo $row4['med_name']; ?></td>
					<td width="15%"><?php echo $row4['weight']; ?> mg</td>
					<td width="15%"><?php echo $row3['med_per_day']; ?></td>
					<td width="15%"><?php echo $row3['no_of_days']; ?></td>


				</tr>
				<?php 
		$count++;
			} ?>
			</table>
