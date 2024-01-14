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
						<tr style="height: 4vh;">
							<td width="5%" style="height: 4vh;">S No</td>
							<td width="10%" style="height: 4vh;">Date</td>
							<td width="25%" style="height: 4vh;">Diag</td>
							<td width="15%" style="height: 4vh;">View Medicines</td>
							<td width="15%" style="height: 4vh;">View Test Results</td>

						</tr>
					
				</thead>
<?php
$count=1;
$sql3="SELECT patient_id from admission where admn_id='".$_POST['id']."'";
$query3=mysqli_query($conn, $sql3);
$row3=mysqli_fetch_assoc($query3);

$sql4="SELECT *, date_format(date,'%d/%m/%Y') as dt from admission where patient_id='".$row3['patient_id']."'";
$query4=mysqli_query($conn, $sql4);
while($row4=mysqli_fetch_assoc($query4)){



 ?>
				<tr>
					<td width="5%" style="height: 4vh;"><?php echo $count; ?></td>
					<td width="20%" style="height: 4vh;"><?php echo $row4['dt']; ?></td>
					<td width="15%" style="height: 4vh;"><?php echo $row4['Diag']; ?></td>
					<td style="text-align: center; height: 4vh;">
					<button type="button" name="med" class="med" id="<?php echo $row4['admn_id']; ?>" style="color:red; background:rgba(0,0,0,0); border-style:none; font-size:2.5vh"><i class="fa fa-medkit fa-sm"></i></button>
				</td>
				<td style="text-align: center; height: 4vh;">
					<button type="button" name="test" class="test" id="<?php echo $row4['admn_id']; ?>" style="color:green; background:rgba(0,0,0,0); border-style:none; font-size:2.5vh"><i class="fa fa-edit fa-sm"></i></button>
				</td>


				</tr>
				<?php 
		$count++;
			} ?>
			</table>
