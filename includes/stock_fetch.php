<?php

//fetch.php
session_start();
include("../connection.php");

		?>
<button id="add" class="btn btn-info mt-3" style="margin-left: 1%; margin-top: 2vh; float: left">Add Stock</button>
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
					<th class="table-head">Ser No</th>
					<th class="table-head">Medicine Name</th>
					<th class="table-head">Weight</th>
					<th class="table-head">Qty</th>
					<th class="table-head">In / Out</th>
					<th class="table-head">Amount</th>
					<th class="table-head">Date</th>
					<th class="table-head">Edit</th>
					<th class="table-head">delete</th>
					
				</tr>
				</thead>
		<?php

		$query=" SELECT *, date_format(date,'%d/%m/%Y') as dt FROM med_stock order by stock_id DESC";
		$result=mysqli_query($conn, $query);

		$ser_no=0;
		while($row=mysqli_fetch_assoc($result)) {

	$query1=" SELECT * FROM med_list where med_id='".$row['med_id']."'";
		$result1=mysqli_query($conn, $query1);
		$row1=mysqli_fetch_assoc($result1);
		$ser_no++;
			?><tr>
					<td style="text-align: center;"><?php echo $ser_no; ?></td>
					<td style="text-align: center;"><?php echo $row1['med_name']; ?></td>
					<td><?php echo $row1['weight']; ?></td>
					<td><?php echo $row['qty']; ?></td>
					<td style="text-align: center;"><?php echo $row['stock']; ?></td>
					<td><?php echo $row['amt']; ?></td>
					<td style="text-align: center;"><?php echo $row['dt']; ?></td>	
					<td style="text-align: center;">
					<button type="button" name="edit" class="edit" id="<?php echo $row['stock_id']; ?>" style="color:blue; background:rgba(0,0,0,0); border-style:none; font-size:3vh"><i class="fa fa-edit fa-sm"></i></button>
					<input type="hidden" name="edit1" id="edit1" value="<?php echo $row['med_id']; ?>" >
				</td>

				<td style="text-align: center;">
					<button type="button" name="delete" class="del" id="<?php echo $row['stock_id']; ?>" style="color:red; background:rgba(0,0,0,0); border-style:none; font-size:3vh"><i class="fa fa-trash-alt fa-sm"></i></button>
				</td>
				</tr>

	<?php	

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
