<?php

	include('connect.php');
    $latit = $_GET['lat'];
    $longi = $_GET['long'];
	$rad=$_GET['rad'];

	// $querysearch="SELECT id, name, address, open, close, ticket, st_x(st_centroid(geom)) as lng, st_y(st_centroid(geom)) as lat, st_distance_sphere(ST_GeomFromText('POINT(".$longi." ".$latit.")',-1), geom) as jarak FROM tourism where st_distance_sphere(ST_GeomFromText('POINT(".$longi." ".$latit.")',-1), geom) <= ".$rad.""; 

    $querysearch="SELECT id, name, address, open, close, ticket, geom, ST_Y(ST_CENTROID(geom)) as lat, ST_X(ST_CENTROID(geom)) as lng,
    st_distance_sphere(ST_GeomFromText('POINT($latit $longi)', 4326), 
    ST_GeomFromText(concat('POINT(',ST_Y(ST_CENTROID(geom)),' ',ST_X(ST_Centroid(geom)),')'), 4326)) as jarak
    FROM tourism HAVING jarak <= $rad";

	$hasil=mysqli_query($conn, $querysearch);

        while($baris = mysqli_fetch_array($hasil))
            {
                $id=$baris['id'];
                $name=$baris['name'];
                $address=$baris['address'];
                $open=$baris['open'];
                $close=$baris['close'];
                $ticket=$baris['ticket'];
               
                $latitude=$baris['lat'];
                $longitude=$baris['lng'];
                $dataarray[]=array('id'=>$id,'name'=>$name,'address'=>$address,'open'=>$open,'close'=>$close,'ticket'=>$ticket, "latitude"=>$latitude,"longitude"=>$longitude);
            }
            echo json_encode ($dataarray);
?>