<?php
include ('../inc/connect.php');
session_start();
if(isset($_POST['username'])){
	$username = $_POST['username'];
	$password = $_POST['password'];
	$pass = md5(md5($password));
	$sql = mysqli_query($conn, "SELECT * FROM login WHERE username='$username' and password='$pass'");
	$num = mysqli_num_rows($sql);
	$dt = mysqli_fetch_array($sql);
	if($num==1){
		$_SESSION['admin'] = true;
		$_SESSION['username'] = $username;
		// $result = pg_query("update login set last_login = now() where username='$username'");
		?><script language="JavaScript">document.location='../'</script><?php
		//console.log('suksess');
	}else{
		//console.log('gagal');
		echo "<script>
		alert (' Maaf Login Gagal, Silahkan Isi Username dan Password Anda Dengan Benar');
		eval(\"parent.location='../login.php '\");	
		</script>";
	}
}
?>