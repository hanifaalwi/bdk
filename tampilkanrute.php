<?php
require 'connect.php';
$id=$_GET['id'];
// $querysearch="	SELECT row_to_json(fc) 
// 				FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features 
// 				FROM (SELECT 'Feature' As type , ST_AsGeoJSON(a.geom)::json As geometry , row_to_json((SELECT l 
// 				FROM (SELECT a.id, a.destination,   a.track,a.route_color,  ST_X(ST_Centroid(a.geom)) AS longitude, ST_Y(ST_CENTROID(a.geom)) As latitude) As l )) As properties 
// 				FROM angkot As a
// 				where a.id='$id'
// 				) As f ) As fc 
// 			  ";

$querysearch="	SELECT id, destination, track, route_color, ST_asgeojson(geom) AS geom, 
ST_X(ST_centroid(geom)) as lng, ST_Y(ST_Centroid(geom)) as lat from angkot where id='$id' ";

$result=mysqli_query($conn, $querysearch);
$hasil = array(
	'type'	=> 'FeatureCollection',
	'features' => array()
	);
while ($isinya = mysqli_fetch_assoc($result)) {
	$features = array(
		'type' => 'Feature',
		'geometry' => json_decode($isinya['geom']),
	//	'geometry_point'=>json_decode($isinya['center']),
		'properties' => array(
			'id' => $isinya['id'],
			'lat' => $isinya['lat'],
			'lng' => $isinya['lng'],
			'track' => $isinya['track'],
			'destination' => $isinya['destination'],
			'route_color' => $isinya['route_color'])
		);
	array_push($hasil['features'], $features);
}
	echo json_encode($hasil);
?>

