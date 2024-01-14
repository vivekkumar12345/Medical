<center>
<form action="result_insert.php" method="post">

	<table style="width: 90%; text-align: center;">
	<thead><tr><td style="height: 5vh; border: 1px solid black; width: 20%">Ser No</td>
		<td style="height: 5vh; border: 1px solid black;">Name of Test</td>
		<td style="height: 5vh; border: 1px solid black;">Result</td>
	</tr></thead>
<?php
include '../connection.php';
session_start();
$ser=1;
$sql="SELECT * from test where admn_id='".$_POST['id']."'";
$query=mysqli_query($conn, $sql);
while($row=mysqli_fetch_assoc($query)){

$sqls="SELECT * from test_list where test_name_id='".$row['test_name_id']."'";
$querys=mysqli_query($conn, $sqls);
$rows=mysqli_fetch_assoc($querys)
?>
<tr>
	<td style="height: 5vh; border: 1px solid black;"><?php echo $ser; ?>
	</td>
	<td style="height: 5vh; border: 1px solid black;"><?php echo $rows['test_name']; ?>
	</td>
	<td style="height: 5vh; border: 1px solid black;">
		<?php echo $row['result']; ?>
	</td>
</tr>

<?php
$ser++;
}


?>


</table>

</form>
</center>