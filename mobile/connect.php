<?php
	$host = "localhost";
	$user = "postgres";
	$pass = "nesvi";
	$port = "5432";
	$dbname = "kulinerlagi";
	$conn = pg_connect("host=".$host." port=".$port." dbname=".$dbname." user=".$user." password=".$pass) or die("Gagal");
?>