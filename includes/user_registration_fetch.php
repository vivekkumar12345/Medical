<?php

//fetch.php
session_start();
include("../connection.php");

		?>
<button id="add" class="btn btn-info mt-3" style="margin-left: 1%; margin-top: 2vh; float: left">Add</button>
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
		<div class="custom-scrollbar table-wrapper" style="margin-top: 2vh;"><table class="table table-striped table-bordered table-hover"  style="font-size:2vh;" id="myTable" align="center">
				<thead style="text-align: center;">
				
				<tr>
					<th class="table-head">ID</th>
					<th class="table-head">Insp Form</th>
					<th class="table-head">Rel</th>
					<th class="table-head">Name of Patient</th>
					<th class="table-head">Age</th>
					<th class="table-head">Army No</th>
					<th class="table-head">Rank</th>
					<th class="table-head">Name</th>
					<th class="table-head">Date of Reg</th>
					<th class="table-head">Unit</th>
					<th class="table-head">Edit</th>
					<th class="table-head">Delete</th>
					
				</tr>
				</thead>
		<?php

		$query=" SELECT * , date_format(date_of_reg,'%d/%m/%Y') as dt FROM patient_details order by patient_id ASC";
		$result=mysqli_query($conn, $query);

		$ser_no=1;
		while($row=mysqli_fetch_assoc($result)) {

			?><tr>
					<td style="text-align: center;"><?php echo $row['patient_id']; ?></td>
					<td style="text-align: center;">
					<button type="button" name="gen" class="gen" id="<?php echo $row['patient_id']; ?>" style="color:green; background:rgba(0,0,0,0); border-style:none; font-size:3vh"><i class="fas fa-address-card"></i></button>
				</td>
					<td><?php echo $row['rel']; ?></td>
					<td><?php echo $row['name_of_patient']; ?></td>
					<td style="text-align: center;"><?php echo $row['age'];?>yrs <?php echo $row['month']; ?>months</td>
					<td><?php echo $row['army_no']; ?></td>
					<td style="text-align: center;"><?php echo $row['rank']; ?></td>
					<td><?php echo $row['name']; ?></td>
					<td style="text-align: center;"><?php echo $row['dt']; ?></td>
					<td><?php echo $row['unit']; ?></td>
					<td style="text-align: center;">
					<button type="button" name="edit" class="edit" id="<?php echo $row['patient_id']; ?>" style="color:blue; background:rgba(0,0,0,0); border-style:none; font-size:3vh"><i class="fa fa-edit fa-sm"></i></button>
				</td>
				<td style="text-align: center;">
					<button type="button" name="delete" class="del" id="<?php echo $row['patient_id']; ?>" style="color:red; background:rgba(0,0,0,0); border-style:none; font-size:3vh"><i class="fa fa-trash-alt fa-sm"></i></button>
				</td>
					
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



<script type="text/javascript">
	$(document).ready(function(){  
	$(document).on('click', '.del', function(){
		var id = $(this).attr('id');
				var action = 'delete';
				$.ajax({
					url:"includes/user_registration_action.php",
					method:"POST",
					data:{id:id, action:action},
					success:function(data)
					{
						alert('Successfully Deleted');
						location.reload();
					}
				});  
				});
	});
</script>