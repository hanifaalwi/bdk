<?php
	require 'connect.php';
	$tipe=$_GET['tipe'];
	$query="SELECT a.id, a.name, st_x(st_centroid(a.geom)) as lon, st_y(st_centroid(a.geom)) as lat, b.gallery_culinary FROM culinary as a left join culinary_gallery as b on a.id=b.id";
	/*if($tipe){
		$query.=" left join hotel_type on a.id_type=hotel_type.id where hotel_type.id= '$tipe'";
	}*/
	  $hasil=mysqli_query($conn, $querysearch);
      while($row = mysqli_fetch_array($hasil)) {
		  $id=$row['id'];
		 /* $name=$row['name'];*/
		  $lat=$row['lat'];
		  $lng=$row['lon'];
		  $img=$row['gallery_culinary'];
		  $dataarray[]=array('id'=>$id,'name'=>$name, 'lng'=>$lng, 'lat'=>$lat, 'img'=>$img);
	}
	echo json_encode ($dataarray);
?>