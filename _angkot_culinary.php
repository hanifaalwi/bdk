<?php
    include("connect.php");
    $id = $_GET['id'];

    $querysearch= "SELECT detail_culinary_place.id_culinary_place,angkot.id,angkot.route_color, angkot.destination,detail_culinary_place.id_angkot,culinary_place.name, culinary_place.id, detail_culinary_place.lat, detail_culinary_place.lng, detail_culinary_place.description, 
    ST_X(ST_Centroid(culinary_place.geom)) AS longitude, ST_Y(ST_CENTROID(culinary_place.geom)) As latitude FROM 
    detail_culinary_place left join angkot on detail_culinary_place.id_angkot=angkot.id left join culinary_place on 
    detail_culinary_place.id_culinary_place=culinary_place.id where detail_culinary_place.id_culinary_place='$id'";

    // echo $querysearch;

        $result=mysqli_query($conn, $querysearch);
        while($baris = mysqli_fetch_array($result))
            {
                $id_angkot=$baris['id_angkot'];
                $route_color=$baris['route_color'];
                $id=$baris['id'];
                $id= $baris['id'];
                $name=$baris['name']; 
                $lat=$baris['lat'];
                $lng=$baris['lng'];
                $destination=$baris['destination'];
                $description=$baris['description'];
                $latitude=$baris['latitude'];
                $longitude=$baris['longitude'];
                $dataarray[]=array('id_angkot'=>$id_angkot,'id'=>$id,'id'=>$id,'name'=>$name,'lat'=>$lat,'lng'=>$lng,'description'=>$description,'route_color'=>$route_color,'destination'=>$destination,"latitude"=>$latitude,"longitude"=>$longitude);
            }
            echo json_encode ($dataarray);
?>