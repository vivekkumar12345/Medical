<?php
session_start();
include "../connection.php";
$name = $_POST['name'];
$sql = "SELECT weight FROM med_list WHERE med_name='$name'";

$result = mysqli_query($conn,$sql);

$users_arr = array();

while( $row = mysqli_fetch_assoc($result) ){
    $weight= $row['weight'];

    $users_arr[] = array("weight" => $weight);
}

// encoding array to json format
echo json_encode($users_arr);

?>