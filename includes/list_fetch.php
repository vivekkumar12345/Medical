<?php

//fetch.php
session_start();
include("../connection.php");

		?>
		<center>
			<div style="width: 40%;"><div class="form-group" style=" float: left; width: 40%; margin-top: 2vh;">
			<p>Search by Army No</p>
			<input style="float: left;" type="text" id="search" name="search" class="form-control" onkeyup="myFunction()">
		</div>
		<div class="form-group" style=" float: right; width: 40%; margin-top: 2vh;">
			<p>Search by Name</p>
			<input type="text" id="search1" name="search1"  style="float: right;" class="form-control" onkeyup="myFunction1()">
		</div>
	</div>
		</center>
		<div class="custom-scrollbar table-wrapper" style="margin-top: 2vh;">
			<table class="table table-striped table-bordered table-hover" id="myTable"  style="font-size:2vh;" align="center">
				<thead style="text-align: center;">
				
				<tr>
					<th class="table-head">Ser No</th>
					<th class="table-head">Date</th>
					<th class="table-head">Rel</th>
					<th class="table-head">Name of Patient</th>
					<th class="table-head">Age</th>
					<th class="table-head">Army No</th>
					<th class="table-head">Rank</th>
					<th class="table-head">Name</th>
					<th class="table-head">Status</th>
					
				</tr>
				</thead>
		<?php

$query=" SELECT *, date_format(date,'%d/%m/%Y') as dt FROM admission where status='Diagnosed' order by admn_id ASC";
		$result=mysqli_query($conn, $query);
		$ser_no=1;
		while($row=mysqli_fetch_assoc($result)) {
		$querys=" SELECT * FROM patient_details where patient_id='".$row['patient_id']."'";
		$results=mysqli_query($conn, $querys);
		$rows=mysqli_fetch_assoc($results)



			?><tr>
					<td style="text-align: center;"><?php echo $row['admn_id']; ?></td>
					<td><?php echo $row['dt']; ?></td>
					<td><?php echo $rows['rel']; ?></td>
					<td><?php echo $rows['name_of_patient']; ?></td>
					<td style="text-align: center;"><?php echo $row['age'];?>yrs <?php echo $row['month']; ?>months</td>
					<td><?php echo $rows['army_no']; ?></td>
					<td style="text-align: center;"><?php echo $rows['rank']; ?></td>
					<td><?php echo $rows['name']; ?></td>
					<td style="text-align: center;"><?php echo $row['status']; ?></td>
				</tr>

	<?php	}

	?>
</table></div>
<script>
function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[5];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
</script>

<script>
function myFunction1() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search1");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[7];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
</script>