<?php
include ('../inc/connect.php');
$id_kuliner = $_POST['id_kuliner'];
$id_informasi = $_POST['id_informasi'];
$tanggal = $_POST['tanggal'];
$informasi = $_POST['informasi'];



$sql = mysqli_query($conn, "insert into information_admin (id_kuliner, id_informasi, tanggal, informasi) values ('$id_kuliner', '$id_informasi', '$tanggal', '$informasi')");


if ($sql){
	header("location:../?page=detailculinary&id=$id");

}else{
	echo 'error';
}

?>