<?php
require 'connect.php';

$lay=$_GET['lay'];
$lay = explode(",", $lay);
$c = "";
for($i=0;$i<count($lay);$i++){
	if($i == count($lay)-1){
		$c .= "'".$lay[$i]."'";
	}else{
		$c .= "'".$lay[$i]."',";
	}
}
$querysearch="SELECT culinary_place.id, culinary_place.name, ST_X(ST_Centroid(culinary_place.geom)) AS lng, 
ST_Y(ST_CENTROID(culinary_place.geom)) As lat from culinary_place 
join detail_culinary_place on culinary_place.id=detail_culinary_place.id_culinary_place
join angkot on detail_culinary_place.id_angkot=angkot.id
join detail_small_industry on angkot.id=detail_small_industry.id_angkot
join small_industry on detail_small_industry.id_small_industry=small_industry.id
join industry_type on small_industry.id_industry_type=industry_type.id
where industry_type.id in ($c) group by id";

$hasil=mysqli_query($conn, $querysearch);
while($row = mysqli_fetch_array($hasil))
	{
		$id=$row['id'];
		$id_facility=$row['id'];
		$name=$row['name'];
		$longitude=$row['lng'];
		$latitude=$row['lat'];

		$dataarray[]=array(
			'id'=>$id,
			'id_facility'=>$id,
			'name'=>$name,
			'longitude'=>$longitude,
			'latitude'=>$latitude
		);
	}
echo json_encode ($dataarray);
?>	