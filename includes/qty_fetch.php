<?php

//fetch.php
session_start();
include("../connection.php");

		?>
<button id="add" class="btn btn-info mt-3" style="margin-left: 1%; margin-top: 2vh; float: left">Add Medicine</button>
<center>
			<div style="width: 40%; margin-bottom: 2vh;">
				<div class="form-group" style="width: 40%; margin-top: 2vh;">
			<p>Search by Medicine Name</p>
			<input style="float: left;" type="text" id="search" name="search" class="form-control" onkeyup="myFunction()">
		</div>
	</div>
		</center>	
		<div class="custom-scrollbar table-wrapper" style="margin-top: 2vh;"><table class="table table-striped table-bordered table-hover"  style="font-size:2vh;" id="myTable" align="center">
				<thead style="text-align: center;">
				
				<tr>
					<th class="table-head">Med Id</th>
					<th class="table-head">Medicine Name</th>
					<th class="table-head">Weight</th>
					<th class="table-head">Total Qty Purchased</th>
					<th class="table-head">Qty Held</th>
					
				</tr>
				</thead>
		<?php

		$query=" SELECT * FROM med_list order by med_id ASC";
		$result=mysqli_query($conn, $query);

		$ser_no=1;
		while($row=mysqli_fetch_assoc($result)) {

	$query1=" SELECT sum(qty) as amt FROM med_stock where med_id='".$row['med_id']."' and stock='in'";
		$result1=mysqli_query($conn, $query1);
		$row1=mysqli_fetch_assoc($result1);
		$tot_pur=$row1['amt']+0;

		$query2=" SELECT sum(qty) as amt FROM med_stock where med_id='".$row['med_id']."' and stock='out'";
		$result2=mysqli_query($conn, $query2);
		$row2=mysqli_fetch_assoc($result2);

		$query3=" SELECT sum(total_med) as amt FROM allot_medicine where med_id='".$row['med_id']."'";
		$result3=mysqli_query($conn, $query3);
		$row3=mysqli_fetch_assoc($result3);

		$total=$row1['amt']-($row2['amt']+$row3['amt']);
			?><tr>
					
					<td style="text-align: center;"><?php echo $row['med_id']; ?></td>
					<td><?php echo $row['med_name']; ?></td>
					<td><?php echo $row['weight']; ?></td>
					<td style="text-align: center;"><?php echo $tot_pur; ?></td>
					<td style="text-align: center;<?php if($total<100){echo 'color:red';}else { echo 'color:black'; } ?>"><?php echo $total; ?></td>	
				</tr>

	<?php	
$ser_no++;
}
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
    td = tr[i].getElementsByTagName("td")[1];
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
