window.onload=init;
var server = "http://localhost/tourism_bkt2/kuliner_bkt/";
var map;
var markersDua = [];
var koordinat = 'null'
var infoposisi = [];
var markerposisi = [];
var centerLokasi;
var markerposisi = [];
var centerBaru;
var cekRadiusStatus = "off"; 
var circles = [];
var rad;
var fotosrc = 'image/';
var angkot = [];
var directionsDisplay;
var infoDua=[];
var rute = [];
var color = "";

//Membuat Fungsi Saat Onload
function init()
{
  basemap();
  viewdigitcul();
  viewdigitkec();
}


//Membuat Fungsi Lokasi Manual
function lokasimanual()
{
  $("#filterik").hide();
  alert('Click On The Map');
  //hapusMarkerTerdekat();
  hapusRadius();
  cekRadius();    
  map.addListener('click', function(event) {

    icon: "assets/img/now.png",
    addMarker(event.latLng);

    });
  }


function viewdigitcul()
{
  cull = new google.maps.Data();
  cull.loadGeoJson(server+'culinary.php');
  cull.setStyle(function(feature)
  {
    return({
            fillColor: '#f75d5d',
            strokeColor: '#f75d5d ',
            strokeWeight: 2,
            fillOpacity: 0.5
          });          
  }
  );
  cull.setMap(map);
}


//Membuat Fungsi Menampilkan Digitasi Kecamatan (Batas Kecamatan Padang)
function viewdigitkec()
{
  ab = new google.maps.Data();
  ab.loadGeoJson(server+'subdistrict_boundary.php');
  ab.setStyle(function(feature)
  {   
     var gid = feature.getProperty('id');
      if (gid == 'K01'){ color = '#ed0202' 
        return({
          fillColor:color,
          strokeWeight:2.0,
          strokeColor:'black',
          fillOpacity:0.3,
          clickable: false
        }); 
      }else if(gid == 'K02'){ color = '#9398ec' 
          return({
          fillColor:color,
            strokeWeight:2.0,
            strokeColor:'black',
            fillOpacity:0.3,
            clickable: false
          });
      }else if(gid == 'K03'){ color = '#d51e5a' 
          return({
          fillColor:color,
            strokeWeight:2.0,
            strokeColor:'black',
            fillOpacity:0.3,
            clickable: false
          });
      }else if(gid == 'K04'){ color = '#42cb6f' 
          return({
          fillColor:color,
            strokeWeight:2.0,
            strokeColor:'black',
            fillOpacity:0.3,
            clickable: false
          });
      }else if(gid == 'K05'){ color = '#5c9ded' 
          return({
          fillColor:color,
            strokeWeight:2.0,
            strokeColor:'black',
            fillOpacity:0.3,
            clickable: false
          });
      }else if(gid == 'K06'){ color = '#373435' 
          return({
          fillColor:color,
            strokeWeight:2.0,
            strokeColor:'black',
            fillOpacity:0.3,
            clickable: false
          });
      }else if(gid == 'K07'){ color = '#ec87ec' 
          return({
          fillColor:color,
            strokeWeight:2.0,
            strokeColor:'black',
            fillOpacity:0.3,
            clickable: false
          });
      }else if(gid == 'K08'){ color = '#758c01' 
          return({
          fillColor:color,
            strokeWeight:2.0,
            strokeColor:'black',
            fillOpacity:0.3,
            clickable: false
          });
      }else if(gid == 'K09'){ color = '#4b0170' 
          return({
          fillColor:color,
            strokeWeight:2.0,
            strokeColor:'black',
            fillOpacity:0.3,
            clickable: false
          });
      }else if(gid == 'K10'){ color = '#fce8b7' 
          return({
          fillColor:color,
            strokeWeight:2.0,
            strokeColor:'black',
            fillOpacity:0.3,
            clickable: false
          });
      }else if(gid == 'K11'){ color = '#ff3300' 
        return({
          fillColor:color,
          strokeWeight:2.0,
          strokeColor:'black',
          fillOpacity:0.3,
          clickable: false
        }); 
      }
              
  });
  ab.setMap(map);
}

function legenda()
{
  $('#tombol').empty();
  $('#tombol').append('<a type="button" id="hidelegenda" onclick="hideLegenda()" class="btn btn-default " data-toggle="tooltip" title="Sembunyikan Legenda" style="margin-right: 7px;"><i class="fa fa-eye-slash"></i></a> ');
  
  var layer = new google.maps.FusionTablesLayer(
    {
          query: {
            select: 'Location',
            from: 'AIzaSyBNnzxae2AewMUN0Tt_fC3gN38goeLVdVE'
          },
          map: map
        });
    var legend = document.createElement('div');
        legend.id = 'legend';
        var content = [];
        content.push('<h4>Legenda</h4>');
        content.push('<p><div class="color l"></div>Culinary</p>');
        content.push('<p><div class="color f"></div>Small Industry</p>');
        content.push('<p><div class="color g"></div>Souvenir</p>');
        content.push('<p><div class="color h"></div>Hotel</p>');
        content.push('<p><div class="color i"></div>Restaurant</p>');
        content.push('<p><div class="color j"></div>WorshipPlace</p>');
        content.push('<p><div class="color k"></div>Tourism</p>');
        content.push('<p><div class="color e"></div>Angkot</p>');
        content.push('<p><div class="color d"></div>District of Lubuk Kilangan</p>');
        content.push('<p><div class="color c"></div>District of Pauh</p>');
        content.push('<p><div class="color b"></div>District of Padang Selatan</p>');
        
        legend.innerHTML = content.join('');
        legend.index = 1;
        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

        
}

function hideLegenda() {
  $('#legend').remove();
  $('#tombol').empty();
  console.log("hy jackkky");
  $('#tombol').append('<a type="button" id="showlegenda" onclick="legenda()" class="btn btn-primary btn-sm " data-toggle="tooltip" title="Legenda" style="margin-right: 7px;"><i class="fa fa-eye" style="color:white;"> </i></a>');
}



//Membuat Fungsi Memberikan Marker IK
function addMarker(location)
{
  for (var i = 0; i < markerposisi.length; i++) 
  {
    markerposisi[i].setMap(null);
    hapusMarkerTerdekat();
    hapusRadius();
    cekRadius();
  } 
  marker = new google.maps.Marker
  ({
    icon: "assets/img/now.png",
    position : location,
    map: map,
    animation: google.maps.Animation.DROP,
  });
  koordinat = 
  {
    lat: location.lat(),
    lng: location.lng(),
  }
  centerLokasi = new google.maps.LatLng(koordinat.lat, koordinat.lng);
  markerposisi.push(marker);
  infowindow = new google.maps.InfoWindow();
  infowindow.setContent("<center><a style='color:black;'>You're Here <br> lat : "+koordinat.lat+" <br> long : "+koordinat.lng+"</a></center>");
  infowindow.open(map, marker);
  usegeolocation=true;
  markerposisi.push(marker)
  infoposisi.push(infowindow);  
}


//Membuat Fungsi Menampilkan Posisi Saat Ini
function posisisekarang()
{
  $("#filterik").hide();
  hapusMarkerTerdekat();  
  google.maps.event.clearListeners(map, 'click');
  navigator.geolocation.getCurrentPosition(function(position)
  {
    koordinat = 
    {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    console.log(koordinat)

    marker = new google.maps.Marker
    ({
      icon:"assets/img/now.png",
      position: koordinat,
      map: map,
      animation: google.maps.Animation.DROP,
    });

    infowindow = new google.maps.InfoWindow
    ({
      position: koordinat,
      content: "<center><a style='color:black;'>You're Here <br> lat : "+koordinat.lat+" <br> long : "+koordinat.lng+"</a></center>"
    });
    infowindow.open(map, marker);
    markersDua.push(marker);
    infoposisi.push(infowindow);
     map.setCenter(koordinat);
     map.setZoom(20); 
  });
}


//Membuat Fungsi Menampilkan Peta Google Map
function basemap()
{
   map = new google.maps.Map(document.getElementById('map'), 
        {
          zoom: 10.5,
          center: new google.maps.LatLng(-0.924140, 100.403460),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        });
}



//Membuat Fungsi Hapus Market Terdekat
function hapusMarkerTerdekat() 
{
  for (var i = 0; i < markersDua.length; i++) 
  {
    markersDua[i].setMap(null);
  }
}

function detailinforestaurant(id19)
{  
  $('#info').empty();
  hapusInfo();
  clearangkot();
  clearroute();
  hapusMarkerTerdekat();
       $.ajax({ 
      url: server+'detailinforestaurant.php?info='+id19, data: "", dataType: 'json', success: function(rows)
        { 
         for (var i in rows) 
          { 
            console.log('dd');
            var row = rows[i];
            var id = row.id;
            
            var namaa = row.name;
            var address=row.address;
            
           
            var owner=row.owner;
            var cp = row.cp;
            var latitude  = row.latitude; ;
            var longitude = row.longitude ;
            centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
            marker = new google.maps.Marker
            ({
              position: centerBaru,
              icon:'assets/img/culf.png',
              map: map,
              animation: google.maps.Animation.DROP,
            });
              console.log(latitude);
              console.log(longitude);
              markersDua.push(marker);
            map.setCenter(centerBaru);
            map.setZoom(16); 
            if (address==null)
                    {
                      address="tidak ada";
                    } 
             $('#info').append("");
            infowindow = new google.maps.InfoWindow({
            position: centerBaru,

            content: "<center><span style=color:black><b>Information</b><table><tr><td><i class='fa fa-home'></i>Nama</td><td>:</td><td> "+namaa+"</td></tr><br><tr><td><i class='fa fa-map-marker'></i>Alamat</td><td>:</td><td> "+address+"</td></tr><br><tr><td><i class='fa fa-phone'></i>Telepon</td><td>:</td><td> "+cp+"</td></tr></table></span>",   
            pixelOffset: new google.maps.Size(0, -33)
            });
          infoposisi.push(infowindow); 
          hapusInfo();
          infowindow.open(map);
            
          }  
        }
      }); 
}

//Menampilkan Detail Info IK
function detailinfoik(id1)
{  
  $('#info').empty();
  hapusInfo();
  clearangkot();
  clearroute();
  hapusMarkerTerdekat();
       $.ajax({ 
      url: server+'detailinfoik.php?info='+id1, data: "", dataType: 'json', success: function(rows)
        { 
         for (var i in rows) 
          { 
            console.log('dd');
            var row = rows[i];
            var id = row.id;
            
            var namaa = row.name;
            var address=row.address;
            
           
            var owner=row.owner;
            var cp = row.cp;
            var latitude  = row.latitude; ;
            var longitude = row.longitude ;
            centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
            marker = new google.maps.Marker
            ({
              position: centerBaru,
              icon:'assets/img/ik.png',
              map: map,
              animation: google.maps.Animation.DROP,
            });
              console.log(latitude);
              console.log(longitude);
              markersDua.push(marker);
            map.setCenter(centerBaru);
            map.setZoom(16); 
            if (address==null)
                    {
                      address="tidak ada";
                    } 
             $('#info').append("");
            infowindow = new google.maps.InfoWindow({
            position: centerBaru,

            content: "<center><span style=color:black><b>Information</b><table><tr><td><i class='fa fa-home'></i>Nama</td><td>:</td><td> "+namaa+"</td></tr><br><tr><td><i class='fa fa-map-marker'></i>Alamat</td><td>:</td><td> "+address+"</td></tr><br><tr><td><i class='fa fa-phone'></i>Telepon</td><td>:</td><td> "+cp+"</td></tr></table></span>",   
            pixelOffset: new google.maps.Size(0, -33)
            });
          infoposisi.push(infowindow); 
          hapusInfo();
          infowindow.open(map);
            
          }  
        }
      }); 
}

function nearby()
{  
  $("#hasilik").hide();
  $("#nearbyik").show();
}


//Menghapus Info
function hapusInfo() 
{
  for (var i = 0; i < infoposisi.length; i++) 
    {
      infoposisi[i].setMap(null);
    }
}


function detailinfomosque(id9)
{  
  $('#info').empty();
   hapusInfo();
      // clearroute2();
      hapusMarkerTerdekat();
      clearangkot();
      clearroute();
       $.ajax({ 
      url: server+'detailinfomosque.php?info='+id9, data: "", dataType: 'json', success: function(rows)
        { 
         for (var i in rows) 
          { 
            console.log('dd');
            var row = rows[i];
            var id = row.id;
            //var foto = row.foto;
            var name = row.name;
            var address=row.address;
            var capacity = row.capacity;
            var latitude  = row.latitude; ;
            var longitude = row.longitude ;
            centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
            marker = new google.maps.Marker
            ({
              position: centerBaru,
              icon:'assets/img/msj.png',
              map: map,
              animation: google.maps.Animation.DROP,
            });
              console.log(latitude);
              console.log(longitude);
              markersDua.push(marker);
            map.setCenter(centerBaru);
            map.setZoom(18); 
          
            infowindow = new google.maps.InfoWindow({
            position: centerBaru,
            content: "<center><span style=color:black><b>Information</b><table><tr><td><i class='fa fa-home'></i>Nama Masjid</td><td>:</td><td> "+name+"</td></tr><br><tr><td><i class='fa fa-map-marker'></i>Alamat</td><td>:</td><td> "+address+"</td></tr><br><tr><td><i class='fa fa-building'></i>Kapasitas</td><td>:</td><td> "+capacity+"</td></tr></table></span>",   
            pixelOffset: new google.maps.Size(0, -33)
            });
          infoposisi.push(infowindow); 
          hapusInfo();
          infowindow.open(map);
            
          }   
        }
      }); 
}

function viewpopuler($id)
{
  hapusawal();
  var arrayLay=$id;
  console.log('zz');
  if (arrayLay==''){
    alert('Pilih Kuliner');
  }else{
    $('#hasilcari').append("<thead><th>Name</th><th colspan='3'>Action</th></thead>");
    $.ajax({ url: server+'selectkul.php?lay='+arrayLay, data: "", dataType: 'json', success: function(rows){
      console.log("hai");
      if(rows==null)
            {
              alert('Data not found');
            }
        for (var i in rows) 
            {   
              var row     = rows[i];
              var id   = row.id;
              var nama_kuliner   = row.name;
              var nama_tempat_kuliner   = row.name;
              var latitude  = row.latitude ;
              var longitude = row.longitude ;
              centerBaru = new google.maps.LatLng(latitude, longitude);
              console.log(name);
              console.log(latitude);
              console.log(longitude);
              map.setCenter(centerBaru);
              map.setZoom(16);
              clickMarker(centerBaru, id);
              $('#hasilcari').append("<tr><td>"+nama_tempat_kuliner+"</td><td><a role='button' class='btn btn-success' onclick='detculi(\""+id+"\");detailinfokul(\""+id+"\");'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-taxi' onclick='kulAngkot(\""+id+"\")'></a></td></tr>");
            }
            $('#hasilpencarian').append("<h5 class='box-title' id='hasilpencarian'>Result :</h5>"+rows.length);
    }});
  }
}


//Menampilkan Detail Info Obj Wisata
function detailinfoobj(id3)
{   
  $('#info').empty();
   hapusInfo();
     clearangkot();
      clearroute();
      hapusMarkerTerdekat();
       $.ajax({ 
      url: server+'detailinfoobj.php?info='+id3, data: "", dataType: 'json', success: function(rows)
        { 
         for (var i in rows) 
          { 
            console.log('dddd');
            var row = rows[i];
            var id = row.id;
            var name = row.name;
            var address=row.address;
            var open = row.open;
            var close = row.close;
            var ticket = row.ticket;
            var latitude  = row.latitude; ;
            var longitude = row.longitude ;
            centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
            marker = new google.maps.Marker
            ({
              position: centerBaru,
              icon:'assets/img/tours.png',
              map: map,
              animation: google.maps.Animation.DROP,
            });
              console.log(latitude);
              console.log(longitude);
              markersDua.push(marker);
            map.setCenter(centerBaru);
            map.setZoom(16); 
         
            infowindow = new google.maps.InfoWindow({
            position: centerBaru,
            content: "<center><span style=color:black><b>Information</b><table><tr><td><i class='fa fa-home'></i>Nama Objek</td><td>:</td><td> "+name+"</td></tr><br><tr><td><i class='fa fa-map-marker'></i>Alamat</td><td>:</td><td> "+address+"</td></tr><br><tr><td><i class='fa fa-building'></i>Jam Buka</td><td>:</td><td> "+open+"</td></tr><br><tr><td><i class='fa fa-map-marker'></i>Jam Tutup</td><td>:</td><td> "+close+"</td></tr><br><tr><td><i class='fa fa-map-marker'></i>Biaya</td><td>:</td><td> "+ticket+"</td></tr></table></span>",   
            pixelOffset: new google.maps.Size(0, -33)
            });
            infoposisi.push(infowindow); 
            hapusInfo();
            infowindow.open(map);
            
          }      
        }
      }); 
}


//Menampilkan Detail Info Souvenir
function detailinfosou(id14)
{  
  $('#info').empty();
   hapusInfo();
      clearangkot();
      clearroute();
      hapusMarkerTerdekat();
       $.ajax({ 
      url: server+'detailinfosou.php?info='+id14, data: "", dataType: 'json', success: function(rows)
        { 
         for (var i in rows) 
          { 
            console.log('ddd');
            var row = rows[i];
            var id = row.id;
            var namaa = row.name;
            var address=row.address;
            var cp = row.cp;
            var owner = row.owner;
            var latitude  = row.latitude; ;
            var longitude = row.longitude ;
            centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
            marker = new google.maps.Marker
            ({
              position: centerBaru,
              icon:'assets/img/souv.png',
              map: map,
              animation: google.maps.Animation.DROP,
            });
              console.log(latitude);
              console.log(longitude);
              markersDua.push(marker);
            map.setCenter(centerBaru);
            map.setZoom(18); 
            if (address==null)
                    {
                      address="tidak ada";
                    } 
            infowindow = new google.maps.InfoWindow({
            position: centerBaru,
            content: "<center><span style=color:black><b>Information</b><table><tr><td><i class='fa fa-home'></i>Nama</td><td>:</td><td> "+namaa+"</td></tr><br><tr><td><i class='fa fa-map-marker'></i>Alamat</td><td>:</td><td> "+address+"</td></tr><br><tr><td><i class='fa fa-phone'></i>Telepon</td><td>:</td><td> "+cp+"</td></tr></table></span>",   
            pixelOffset: new google.maps.Size(0, -33)
            });
          infoposisi.push(infowindow); 
          hapusInfo();
          infowindow.open(map);   
          }  
        }
      }); 
}


function detailangkot(id_angkot,lat,lng,lat1,lng1)
{
          clearangkot();
          hapusRadius();
          clearangkot();
          clearroute();
          $('#hasilrute').hide();
          $('#hasildet').hide();
          
            $.ajax({ 
            url: server+'tampilkanrute.php?id='+id_angkot, data: "", dataType: 'json', success: function(rows) 
            { 
              for (var i in rows.features) 
                { 
                  var id=rows.features[i].properties.id;
                  var latitude  = rows.features[i].properties.latitude; 
                  var longitude = rows.features[i].properties.longitude ;
                  var destination=rows.features[i].properties.destination;
                  var track=rows.features[i].properties.track;
                  var route_color=rows.features[i].properties.route_color;
                  console.log(id);

                  tampilrute(id,  latitude, longitude,route_color);
                  var centerBaru = new google.maps.LatLng(latitude,longitude);
                  map.setCenter(centerBaru);
                  var infowindow = new google.maps.InfoWindow({
                    position: centerBaru,
                    content: "<bold>INFORMASI</bold><br>Kode Trayek: "+id+"<br>Jurusan: "+destination+"<br>Jalur Angkot: "+track+"",
                  });
                  infowindow.open(map);                    
                  route_sekitar(lat,lng,lat1,lng1);

                }  
                                     
            } 
         });           
}

function listgeom(id_angkot){
        hapusInfo();
        $.ajax({ 
            url: server+'tampilkanrute.php?id='+id_angkot, data: "", dataType: 'json', success: function(rows) 
            { 

              arraylatlngangkot=[];
              var count=0;
              for (var i in rows.features[0].geometry.coordinates) 
                { 
                  for (var n in rows.features[0].geometry.coordinates[i])
                  {
                    var latlng=rows.features[0].geometry.coordinates[i][n];
                    // var latlng=rows.features[0].geometry.coordinates[i][n][0];
                    count++;
                    arraylatlngangkot.push(latlng);
                  }
                  console.log("a");
                } 
              console.log(count);
              if(count%2==1){
                count++;
              }
              //console.log(mid);
              var mid=count/2;
              // arraylatlngangkot[mid];
              var lat=arraylatlngangkot[mid][1];
              var lon=arraylatlngangkot[mid][0];
              var id_angkot=rows.features[0].properties.id;
              var jalur_angkot=rows.features[0].properties.track;
              var jurusan=rows.features[0].properties.destination;
              
           }
         });
        }

function hapusrouteangkot() 
{
  for (var i = 0; i < angkot.length; i++) 
  {
    angkot[i].setMap(null);
  }
}

function selectcategory()
{

  $("#selectfacility").hide();
  $("#hasilik").hide();
  $("#selectkulll").hide();
  $('#hasildet').hide();
  $('#selectcategory').show();
  init();
}



function tampilrute(id_angkot,  latitude, longitude, route_color){

  console.log("********");
  console.log(id_angkot);
  console.log(latitude);
  console.log(longitude);
  console.log(route_color);
  console.log("*******");
        //clearangkot();
        ja = new google.maps.Data();
        console.log(server+'tampilkanrute.php?id='+id_angkot);
        ja.loadGeoJson(server+'tampilkanrute.php?id='+id_angkot);
        ja.setStyle(function(feature){
          return({
              fillColor: 'yellow',
              strokeColor: route_color,
              strokeWeight: 2,
              fillOpacity: 0.5
              });          
        });

        console.log(ja);
        ja.setMap(map);  
        angkot.push(ja);
        map.setZoom(18);
        }


function hapusawal()
{
  init();
  hapusMarkerTerdekat();
  hapusRadius();
  clearroute2();
  clearangkot();
  clearroute();
  hapusInfo();
  $("#nearbyik").hide();
  $("#hasilrute").hide();
  $("#tampilangkotsekitarik").hide();
  $("#selectkulll").hide();
  $("#selectfacility").hide();
  $('#hasildet').hide();
  $('#hasilcari').empty();
  $('#hasilpencarian').empty();
  $("#filterik").hide();
  $('#hasilik').show();
  $('#hasilcari1').show();
  $('#hasilcari').empty();
  $("#hasilculi").hide();
  $("#hasilsouv").hide();
  $("#hasilindustry").hide();
  $("#hasilobj").hide();
  $("#hasilhotel").hide();
  $("#hasilmosque").hide();
  $("#hasilrestaurant").hide();
  $("#popular").hide();
  $('#selectcategory').hide();
}

function hapusawal1()
{
  hapusMarkerTerdekat();
  clearroute2();
  clearangkot();
  clearroute();
  hapusInfo();
  $("#nearbyik").hide();
  $("#hasilrute").hide();
  $("#tampilangkotsekitarik").hide();
  $("#selectkulll").hide();
  $("#selectfacility").hide();
  $('#hasildet').hide();
  $('#hasilcari').empty();
  $('#hasilpencarian').empty();
  $("#filterik").hide();
  $('#hasilik').show();
  $('#hasilcari1').show();
  $('#hasilcari').empty();
  $("#hasilculi").hide();
  $("#hasilsouv").hide();
  $("#hasilindustry").hide();
  $("#hasilobj").hide();
  $("#hasilhotel").hide();
  $("#hasilmosque").hide();
  $("#hasilrestaurant").hide();
  $("#popular").hide();
  $('#selectcategory').hide();
}

//Membuat Fungsi Menampilkan Seluruh Kuliner 

function category()
{
  hapusawal();
  var fas=selectcategory.value;
  var arrayLay=[];
  for(i=0;i<$("input[name=category]:checked").length;i++){
    arrayLay.push($("input[name=category]:checked")[i].value);
  }
  console.log('zz');
  if (arrayLay==''){
    alert('Pilih Kuliner');
  }else{
    $('#hasilcari').append("<thead><th>Name</th><th colspan='3'>Action</th></thead>");
    console.log(server+'category.php?lay='+arrayLay);
    $.ajax({ url: server+'category.php?lay='+arrayLay, data: "", dataType: 'json', success: function(rows){
      console.log("hai");
      if(rows==null)
            {
              alert('Data not found');
            }
        for (var i in rows) 
            {   
              var row     = rows[i];
              var id   = row.id;
              var nama_kuliner   = row.name;
              var nama_tempat_kuliner   = row.name;
              var latitude  = row.latitude ;
              var longitude = row.longitude ;
              centerBaru = new google.maps.LatLng(latitude, longitude);
              console.log(name);
              console.log(latitude);
              console.log(longitude);
              map.setCenter(centerBaru);
              map.setZoom(16);
              clickMarker(centerBaru, id);
              $('#hasilcari').append("<tr><td>"+nama_tempat_kuliner+"</td><td><a role='button' class='btn btn-success' onclick='detculi(\""+id+"\");detailinfokul(\""+id+"\");'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-taxi' onclick='kulAngkot(\""+id+"\")'></a></td></tr>");
            }
            $('#hasilpencarian').append("<h5 class='box-title' id='hasilpencarian'>Result :</h5>"+rows.length);
    }});
  }
}



function sss(){
 alert('mrzk');
}


function viewkul()
{ 
  
  hapusawal();
 
  $.ajax
  ({ 
    url: server+'viewkul.php', data: "", dataType: 'json', success: function(rows) 
    { 
      if(rows==null)
      {
        alert('Data Did Not Exist!');
      }
      else
      {
        $('#hasilcari').append("<thead><th>Name</th><th colspan='3'>Action</th></thead>");
        console.log(rows);
        for (var i in rows) 
        { 
          var row = rows[i];
          var id = row.id;
          
          var name = row.name;
          var address=row.address;
          var cp=row.cp;
          
          var close=row.close;
          var open=row.open;
          var capacity=row.capacity;
          var lon = row.lng;
          var lat=row.lat;
          console.log(name);
          centerBaru = new google.maps.LatLng(lat, lon);
          map.setCenter(centerBaru);
          map.setZoom(12);  
          clickMarker(centerBaru, id);

          map.setCenter(centerBaru);
           $('#hasilcari').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-success' onclick='detculi(\""+id+"\");detailinfokul(\""+id+"\");'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-taxi' onclick='kulAngkot(\""+id+"\")'></a></td></tr>");
          
        }

      } 
      $('#hasilpencarian').append("<h5 class='box-title' id='hasilpencarian'>Result :</h5>"+rows.length);

    }
  });           
}


//Menampilkan Detail Info Kuliner
function detailinfokul(id144){  
  
   $('#info').empty();
   $('#tampilangkotsekitarik').hide();
   $("#hasilrute").hide();
   $('#hasilcaridetculi').empty();
   $('#hasilcaridetculi1').show();
   $('#hasildet').show();
   $('#hasilcaridet').empty();
   $('#hasilcaridet1').show();
   hapusInfo();
   hapusrouteangkot();
   clearroute2();
   clearroute();
   hapusMarkerTerdekat();
       $.ajax({ 
      url: server+'detailinfokul.php?info='+id144, data: "", dataType: 'json', success: function(rows)
        { 
         for (var i in rows) 
          { 
            console.log('ddd');
            var row = rows[i];
            var id = row.id;
            var namaa = row.name;
            var capacity = row.capacity;
            var address=row.address;
            var cp=row.cp;
            var open = row.open;
            var close = row.close;
            var fasilitas = row.fasilitas; 
            var latitude  = row.latitude; ;
            var longitude = row.longitude ;
            centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
            clickMarker(centerBaru, id);
            infowindow = new google.maps.InfoWindow({
            position: centerBaru,
            content: "<center><span style=color:black><b>Information</b><table><tr><td><i class='fa fa-home'></i>Nama</td><td>:</td><td> "+name+"</td></tr><br><tr><td><i class='fa fa-map-marker'></i>Alamat</td><td>:</td><td> "+address+"</td></tr><br><tr><td><i class='fa fa-phone'></i>Telepon</td><td>:</td><td> "+cp+"</td></tr><br><tr><td><i class='fa fa-clock-o'></i>Open</td><td>:</td><td> "+open+"</td></tr><br><tr><td><i class='fa fa-clock-o'></i>Close</td><td>:</td><td> "+close+"</td></tr><br><tr><td><i class='fa fa-building'></i>Capacity</td><td>:</td><td> "+capacity+"</td></tr></table></span><br><input type='button' class='btn btn-success' value='Object Arround' onclick='tampil_sekitar(\""+latitude+"\",\""+longitude+"\",\""+namaa+"\")'<br>&nbsp&nbsp<input type='button' class='btn btn-success' value='Gallery' onclick='gallery(\""+id+"\")'<br>&nbsp&nbsp <input type='button' class='btn btn-success' value='Route' onclick='callRoute(centerLokasi,centerBaru);rutetampil()' />",   
            pixelOffset: new google.maps.Size(0, -33)
            });
          infoposisi.push(infowindow); 
          hapusInfo();
          infowindow.open(map);
      
            console.log(latitude);
            console.log(longitude);
            map.setCenter(centerBaru);
            map.setZoom(18); 
                $('#hasilcaridet').append("<tr><td><b> Facility </b></td><td>:</td><td> "+fasilitas+"</td></tr>");
            if (address==null)
                    {
                      address="tidak ada";
                    } 
          }  
        }
      }); 
}

function clickMarker(centerBaru, id)
{
  
  var marker = new google.maps.Marker
    ({
      icon: "assets/img/cul.png",
      position: centerBaru,
      map: map
    });
    markersDua.push(marker);
    
    google.maps.event.addListener(marker, "click", function(){
      
            
        detculiculi(id14433z);
        detailinfokulkul(id144z);

       
      });

}

function detailinfokulkul(id144z){  
  
   $('#info').empty();
   $('#tampilangkotsekitarik').hide();
   $("#hasilrute").hide();
   $('#hasilcaridetculi').empty();
   $('#hasilcaridetculi1').show();
   $('#hasildet').show();
   $('#hasilcaridet').empty();
   $('#hasilcaridet1').show();
   hapusInfo();
   hapusrouteangkot();
   clearroute2();
   clearroute();
       $.ajax({ 
      url: server+'detailinfokul.php?info='+id144z, data: "", dataType: 'json', success: function(rows)
        { 
         for (var i in rows) 
          { 
            console.log('ddd');
            var row = rows[i];
            var id = row.id;
            var namaa = row.name;
            var capacity = row.capacity;
            var address=row.address;
            var cp=row.cp;
            var open = row.open;
            var close = row.close;
            var fasilitas = row.fasilitas; 
            var latitude  = row.latitude; ;
            var longitude = row.longitude ;
            centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
            console.log(latitude);
            console.log(longitude);
            map.setCenter(centerBaru);
            map.setZoom(18); 
                $('#hasilcaridet').append("<tr><td><b> Facility </b></td><td>:</td><td> "+fasilitas+"</td></tr>");
            if (address==null)
                    {
                      address="tidak ada";
                    } 
          }  
        }
      }); 
}


//Menampilkan Detail Info Kuliner
function detculi(id14433){  
  
  $('#info').empty();
  $('#tampilangkotsekitarik').hide();
  $("#hasilrute").hide();
  $('#hasilcaridetculi').empty();
  $('#hasilcaridetculi1').show();
  $('#hasildet').show();
  $('#hasilcaridet').empty();
  $('#hasilcaridet1').show();
   hapusInfo();
   clearroute2();
   clearroute();
   hapusrouteangkot();
   hapusMarkerTerdekat();
       $.ajax({ 
      url: server+'detculi.php?info='+id14433, data: "", dataType: 'json', success: function(rows)
        { 

          $('#hasilcaridet').append("<tr><td colspan='2'><strong>Culinary</strong></td><td><strong>Price</strong></td></tr>");

         for (var i in rows) 
          { 
            console.log('ddd');
            var row = rows[i];
            var id = row.id;
            var namaa = row.name;
            var capacity = row.capacity;
            var address=row.address;
            var cp=row.cp;
            var open=row.open;
            var close=row.close;
            var price = row.price;
            var culinary = row.culinary; 
            var latitude  = row.latitude; ;
            var longitude = row.longitude ;
            centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
            marker = new google.maps.Marker
            ({
              position: centerBaru,
              icon:'assets/img/cul.png',
              map: map,
              animation: google.maps.Animation.DROP,
            });
              console.log(latitude);
              console.log(longitude);
              console.log(id);
              markersDua.push(marker);
            map.setCenter(centerBaru);
            map.setZoom(18); 

                $('#hasilcaridet').append("<tr><td colspan='2'> "+culinary+"</td><td> "+price+"</td></tr>");
            infowindow = new google.maps.InfoWindow({
            position: centerBaru,
            content: "<center><span style=color:black><b>Information</b><table><tr><td><i class='fa fa-home'></i>Nama</td><td>:</td><td> "+namaa+"</td></tr><br><tr><td><i class='fa fa-map-marker'></i>Alamat</td><td>:</td><td> "+address+"</td></tr><br><tr><td><i class='fa fa-phone'></i>Telepon</td><td>:</td><td> "+cp+"</td></tr><br><tr><td><i class='fa fa-clock-o'></i>Open</td><td>:</td><td> "+open+"</td></tr><br><tr><td><i class='fa fa-clock-o'></i>Close</td><td>:</td><td> "+close+"</td></tr><br><tr><td><i class='fa fa-building'></i>Capacity</td><td>:</td><td> "+capacity+"</td></tr></table></span><br><input type='button' class='btn btn-success' value='Object Arround' onclick='tampil_sekitar(\""+latitude+"\",\""+longitude+"\",\""+namaa+"\")'<br>&nbsp&nbsp<input type='button' class='btn btn-success' value='Gallery' onclick='gallery(\""+id+"\")'<br>&nbsp&nbsp <input type='button' class='btn btn-success' value='Route' onclick='callRoute(centerLokasi,centerBaru);rutetampil()' />",   
            pixelOffset: new google.maps.Size(0, -33)
            });
          infoposisi.push(infowindow); 
          hapusInfo();
          infowindow.open(map);
            
          }  
        }
      }); 
}

function detculiculi(id14433z){  
  
   $('#info').empty();
   $('#tampilangkotsekitarik').hide();
   $("#hasilrute").hide();
   $('#hasilcaridetculi').empty();
   $('#hasilcaridetculi1').show();
   $('#hasildet').show();
   $('#hasilcaridet').empty();
   $('#hasilcaridet1').show();
   hapusInfo();
   hapusrouteangkot();
   clearroute2();
   clearroute();
      
       $.ajax({ 
      url: server+'detculi.php?info='+id14433z, data: "", dataType: 'json', success: function(rows)
        { 
            console.log(id14433z);
          //$('#hasilcaridet').append("<tr><td colspan='2'><strong>Culinary</strong></td><td><strong>Price</strong></td></tr>");
          
         for (var i in rows) 
          { 
            console.log('ddd');
            var row = rows[i];
            var id = row.id;
            var name = row.name;
            var capacity = row.capacity;
            var address=row.address;
            var cp=row.cp;
            var open=row.open;
            var close=row.close;
            var price = row.price;
            var culinary = row.culinary; 
            var latitude  = row.latitude; ;
            var longitude = row.longitude ;
            centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
            marker = new google.maps.Marker
            ({
              position: centerBaru,
              icon:'assets/img/cul.png',
              map: map,
              animation: google.maps.Animation.DROP,
            });
              console.log(latitude);
              console.log(longitude);
             
              markersDua.push(marker);
              clickMarker(id)
            map.setCenter(centerBaru);
            map.setZoom(18); 

                $('#hasilcaridet').append("<tr><td colspan='2'> "+culinary+"</td><td> "+price+"</td></tr>");
            infowindow = new google.maps.InfoWindow({
            position: centerBaru,
            content: "<center><span style=color:black><b>Information</b><table><tr><td><i class='fa fa-home'></i>Nama</td><td>:</td><td> "+name+"</td></tr><br><tr><td><i class='fa fa-map-marker'></i>Alamat</td><td>:</td><td> "+address+"</td></tr><br><tr><td><i class='fa fa-phone'></i>Telepon</td><td>:</td><td> "+cp+"</td></tr><br><tr><td><i class='fa fa-clock-o'></i>Open</td><td>:</td><td> "+open+"</td></tr><br><tr><td><i class='fa fa-clock-o'></i>Close</td><td>:</td><td> "+close+"</td></tr><br><tr><td><i class='fa fa-building'></i>Capacity</td><td>:</td><td> "+capacity+"</td></tr></table></span><br><input type='button' class='btn btn-success' value='Object Arround' onclick='tampil_sekitar(\""+latitude+"\",\""+longitude+"\",\""+namaa+"\")'<br>&nbsp&nbsp<input type='button' class='btn btn-success' value='Gallery' onclick='gallery(\""+id+"\")'<br>&nbsp&nbsp <input type='button' class='btn btn-success' value='Route' onclick='callRoute(centerLokasi,centerBaru);rutetampil()' />",   
            pixelOffset: new google.maps.Size(0, -33)
            });
          infoposisi.push(infowindow); 
          hapusInfo();
          infowindow.open(map);
            
          }  
        }
      }); 
}


function gallery(azz){    
      console.log(azz);
    window.open(server+'gallery.php?idgallery='+azz);    
   }





//Membuat Fungsi Mencari Kuliner
function find_kul() //kuliner
{
  hapusawal();
  if(kul_nama.value=='')
  {
    alert("Isi kolom pencarian terlebih dahulu !");
  }
  else
  {
    $('#hasilcari').append("<thead><th>Name</th><th colspan='3'>Action</th></thead>");
    var kulnama = document.getElementById('kul_nama').value;

    $.ajax
    ({ 
      url: server+'find_kul.php?cari_nama='+kulnama, data: "", dataType: 'json', success: function(rows)
      { 
        if(rows==null)
        {
          alert('Data Did Not Exist !');
        }
        for (var i in rows)
        {   
          var row     = rows[i];
          var id  = row.id;
          var name   = row.name;
          var lat  = row.latitude ;
          var lon = row.longitude ;
          centerBaru = new google.maps.LatLng(lat, lon);
          marker = new google.maps.Marker
          ({
            position: centerBaru,
            map: map,
            icon: "assets/img/cul.png",
          });
          markersDua.push(marker);
          map.setCenter(centerBaru);
          map.setZoom(15);
          clickMarker(centerBaru, id);
          console.log(name);
          $('#hasilcari').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-success' onclick='detculi(\""+id+"\");detailinfokul(\""+id+"\");'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-taxi' onclick='kulAngkot(\""+id+"\")'></a></td></tr>");
        }   
        $('#hasilpencarian').append("<h5 class='box-title' id='hasilpencarian'>Result :</h5>"+rows.length);
      }

    }); 
  }
}
  
//Membuat Fungsi Cari Kuliner Berdasarkan Kecamatan
function viewkecamatankul()
{
  hapusawal();
  if (document.getElementById('carikecamatankul').value=="")
    {
      alert("Pilih Option Dahulu !");
    }
    else
    {
    $('#hasilcari').append("<thead><th>Name</th><th colspan='3'>Action</th></thead>");
    var kulkec = document.getElementById('carikecamatankul').value;
    console.log(kulkec);
    // console.log(server+'district.php?district_id='+kulkec);
  
    $.ajax
    ({ 
      url: server+'district.php?district_id='+kulkec, data: "", dataType: 'json', success: function(rows)
      { 
        if(rows==null)
        {
          alert('Data Did Not Exist !');
        } 
        for (var i in rows)
        {   
          var row     = rows[i];
          var id_tempat_kuliner  = row.id;
          var nama_tempat_kuliner   = row.name;
          var id_kecamatan   = row.id;
          var lat  = row.latitude;
          var long = row.longitude;

          console.log("id_tempat_kuliner:"+id_tempat_kuliner);
          centerBaru = new google.maps.LatLng(lat, long);
          marker = new google.maps.Marker
          ({
            position: centerBaru,
            map: map,
            icon: "assets/img/cul.png",
          });
          markersDua.push(marker);
          map.setCenter(centerBaru);
          map.setZoom(14);
          clickMarker(centerBaru, id_tempat_kuliner);
          console.log(id_kecamatan);
          $('#hasilcari').append("<tr><td>"+nama_tempat_kuliner+"</td><td><a role='button' class='btn btn-success' onclick='detculi(\""+id_tempat_kuliner+"\");detailinfokul(\""+id_tempat_kuliner+"\");'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-taxi' onclick='kulAngkot(\""+id_tempat_kuliner+"\")'></a></td></tr>");
          i++;
        }   
        $('#hasilpencarian').append("<h5 class='box-title' id='hasilpencarian'>Result :</h5>"+rows.length);
      }
    }); 
  }
}


function detailinfohotel(id90){  
  
  $('#info').empty();
  hapusInfo();
  hapusMarkerTerdekat();
       $.ajax({ 
      url: server+'detailinfohotel.php?info='+id90, data: "", dataType: 'json', success: function(rows)
        { 
         for (var i in rows) 
          { 
            console.log('dd');
            var row = rows[i];
            var id = row.id
            //var foto = row.foto;
            var name = row.name;
            var address=row.address;
            var cp = row.cp;
            
            var latitude  = row.latitude; ;
            var longitude = row.longitude ;
            centerBaru = new google.maps.LatLng(row.latitude, row.longitude);
            marker = new google.maps.Marker
            ({
              position: centerBaru,
              icon:'assets/img/hotels.png',
              map: map,
              animation: google.maps.Animation.DROP,
            });
              console.log(latitude);
              console.log(longitude);
              markersDua.push(marker);
            map.setCenter(centerBaru);
            map.setZoom(18); 
          
            infowindow = new google.maps.InfoWindow({
            position: centerBaru,
            content: "<center><span style=color:black><b>Information</b><br><table><tr><td><i class='fa fa-home'></i>Nama Hotel</td><td>:</td><td> "+name+"</td></tr><br><tr><td><i class='fa fa-map-marker'></i>Alamat</td><td>:</td><td> "+address+"</td></tr><br><tr><td><i class='fa fa-phone'></i>Fasilitas</td><td>:</td><td> "+cp+"</td></tr></table></span>",   
            pixelOffset: new google.maps.Size(0, -33)
            });
          infoposisi.push(infowindow); 
          hapusInfo();
          infowindow.open(map);
            
          }  
        }
      }); 
}


//Menampilkan Angkot Sekitar Kuliner
function kulAngkot(id_angkot1122){
  console.log( server+'_angkot_culinary.php?id='+id_angkot1122);
 
          hapusMarkerTerdekat();
          hapusInfo();
          clearroute();
          clearroute2();
          $('#tampilangkotsekitarik').show();
          $('#tampillistangkotik1').show();
          $('#tampillistangkotik').empty();
          $('#hasildet').hide();
          $('#hasilrute').hide();
          $('#tampillistangkotik').append("<thead><th>No Angkot</th><th colspan='2'>Action</th></thead>");
          $.ajax({ 
          url: server+'_angkot_culinary.php?id='+id_angkot1122, data: "", dataType: 'json', success: function(rows) 
          { 
           
            if(rows==null)
            {
              alert('Data Did Not Exist!');
            }
            else
            {
            for (var i in rows) 
              { 
                
                var row = rows[i];
                var id_angkot = row.id;
                var route_color = row.route_color;
                var name = row.name; 
                var lat=row.latitude;
                var lon = row.longitude;
                console.log(id_angkot);
                listgeom(id_angkot);

                console.log("---------------")
                console.log(lat)
                console.log(lon)
                console.log(id_angkot)
                console.log(route_color)




                console.log("---------------")
                
                tampilrute(id_angkot,  lat, lon, route_color);
                centerBaru = new google.maps.LatLng(lat, lon);
                map.setCenter(centerBaru);
                map.setZoom(18);  
                var marker = new google.maps.Marker({
                  position: centerBaru,              
                  icon:'assets/img/cul.png',
                  animation: google.maps.Animation.DROP,
                  map: map
                  });
                //markersDua.push(marker);
                map.setCenter(centerBaru);
                infowindow = new google.maps.InfoWindow({
                  position: centerBaru,
                  content: "<bold>"+name+"",
                  pixelOffset: new google.maps.Size(0, -1)
                    });
                infoposisi.push(infowindow); 
                infowindow.open(map,marker);
                console.log(id_angkot);
                $('#tampillistangkotik').append("<tr><td>"+id_angkot+"</td><td><a role='button' class='btn btn-success' onclick='detailangkot(\""+id_angkot+"\")'>Lihat</a></td></tr>");
              }
            }
           }
         });  
        }

function ikangkot(id_angkot1122442,lat1,lng1){
          hapusMarkerTerdekat();
          hapusInfo();
          clearroute();
          clearroute2();
          $('#tampilangkotsekitarik').show();
          $('#tampillistangkotik1').show();
          $('#tampillistangkotik').empty();
          $('#tampillistangkotik').append("<thead><th>No Angkot</th><th colspan='2'>Action</th></thead>");
          console.log("hh");
          $.ajax({ 
          url: server+'/_angkot_industri.php?id='+id_angkot1122442, data: "", dataType: 'json', success: function(rows) 
          { 
            if(rows==null)
            {
              alert('Data Did Not Exist!');
            }
            else
            {
            for (var i in rows) 
              { 
                var row = rows[i];
                var id = row.id;
                var id_angkot = row.id_angkot;
                var route_color = row.route_color;
               var lat = row.lat;
               var lng = row.lng;
               var description = row.description;
                var name = row.name;
                
                var latitude=row.latitude;
                var longitude= row.longitude;
                console.log(id_angkot);
                listgeom(id_angkot);
                tampilrute(id_angkot,  latitude, longitude, route_color);
                centerBaru = new google.maps.LatLng(latitude, longitude);
                map.setCenter(centerBaru);
                map.setZoom(18);  
                var marker = new google.maps.Marker({
                  position: centerBaru,              
                  icon:'assets/img/ik.png',
                  animation: google.maps.Animation.DROP,
                  map: map
                  });
                //markersDua.push(marker);
                map.setCenter(centerBaru);
                infowindow = new google.maps.InfoWindow({
                  position: centerBaru,
                  content: "<bold>"+name+"",
                  pixelOffset: new google.maps.Size(0, -1)
                    });
                infoposisi.push(infowindow); 
                infowindow.open(map,marker);
                console.log(id_angkot);
                $('#tampillistangkotik').append("<tr><td>"+id_angkot+"</td><td><a role='button' class='btn btn-success' onclick='detailangkot(\""+id_angkot+"\",\""+lat+"\",\""+lng+"\",\""+lat1+"\",\""+lng1+"\")'>Lihat</a></td></tr>");
              }
            }
           }
         });  
        }

function restaurantangkot(id_angkot1122492,lat1,lng1){
          hapusMarkerTerdekat();
          hapusInfo();
          clearroute();
          clearroute2();
          $('#tampilangkotsekitarik').show();
          $('#tampillistangkotik1').show();
          $('#tampillistangkotik').empty();
          $('#tampillistangkotik').append("<thead><th>No Angkot</th><th colspan='2'>Action</th></thead>");
          console.log("hh");
          $.ajax({ 
          url: server+'_angkot_restaurant.php?id='+id_angkot1122492, data: "", dataType: 'json', success: function(rows) 
          { 
            if(rows==null)
            {
              alert('Data Did Not Exist!');
            }
            else
            {
            for (var i in rows) 
              { 
                var row = rows[i];
                var id = row.id;
                var id_angkot = row.id_angkot;
                var route_color = row.route_color;
                var lat = row.lat;
                var lng = row.lng;
                var description = row.description;
                var name = row.name;
                
                var latitude=row.latitude;
                var longitude= row.longitude;
                console.log(id_angkot);
                listgeom(id_angkot);
                tampilrute(id_angkot,  latitude, longitude, route_color);
                centerBaru = new google.maps.LatLng(latitude, longitude);
                map.setCenter(centerBaru);
                map.setZoom(18);  
                var marker = new google.maps.Marker({
                  position: centerBaru,              
                  icon:'assets/img/ik.png',
                  animation: google.maps.Animation.DROP,
                  map: map
                  });
                //markersDua.push(marker);
                map.setCenter(centerBaru);
                infowindow = new google.maps.InfoWindow({
                  position: centerBaru,
                  content: "<bold>"+name+"",
                  pixelOffset: new google.maps.Size(0, -1)
                    });
                infoposisi.push(infowindow); 
                infowindow.open(map,marker);
                console.log(id_angkot);
                $('#tampillistangkotik').append("<tr><td>"+id_angkot+"</td><td><a role='button' class='btn btn-success' onclick='detailangkot(\""+id_angkot+"\",\""+lat+"\",\""+lng+"\",\""+lat1+"\",\""+lng1+"\")'>Lihat</a></td></tr>");
              }
            }
           }
         });  
        }

function souangkot(id_angkot112244,lat1,lng1){
          hapusMarkerTerdekat();
          hapusInfo();
          clearroute();
          clearroute2();
          $('#tampilangkotsekitarik').show();
          $('#tampillistangkotik1').show();
          $('#tampillistangkotik').empty();
          $('#tampillistangkotik').append("<thead><th>No Angkot</th><th colspan='2'>Action</th></thead>");
          console.log("hh");
          $.ajax({ 
          url: server+'/_angkot_souvenirs.php?id='+id_angkot112244, data: "", dataType: 'json', success: function(rows) 
          { 
            if(rows==null)
            {
              alert('Data Did Not Exist!');
            }
            else
            {
            for (var i in rows) 
              { 
                var row = rows[i];
                var id = row.id;
                var id_angkot = row.id_angkot;
                var route_color = row.route_color;
               var lat = row.lat;
               var lng = row.lng;
               var description = row.description;
                var name = row.name;
                
                var latitude=row.latitude;
                var longitude= row.longitude;
                console.log(id_angkot);
                listgeom(id_angkot);
                tampilrute(id_angkot,  latitude, longitude, route_color);
                centerBaru = new google.maps.LatLng(latitude, longitude);
                map.setCenter(centerBaru);
                map.setZoom(18);  
                var marker = new google.maps.Marker({
                  position: centerBaru,              
                  icon:'assets/img/souv.png',
                  animation: google.maps.Animation.DROP,
                  map: map
                  });
                //markersDua.push(marker);
                map.setCenter(centerBaru);
                infowindow = new google.maps.InfoWindow({
                  position: centerBaru,
                  content: "<bold>"+name+"",
                  pixelOffset: new google.maps.Size(0, -1)
                    });
                infoposisi.push(infowindow); 
                infowindow.open(map,marker);
                console.log(id_angkot);
                $('#tampillistangkotik').append("<tr><td>"+id_angkot+"</td><td><a role='button' class='btn btn-success' onclick='detailangkot(\""+id_angkot+"\",\""+lat+"\",\""+lng+"\",\""+lat1+"\",\""+lng1+"\")'>Lihat</a></td></tr>");
              }
            }
           }
         });  
        }

function hotelangkot(id_angkot11224436,lat1,lng1){
          hapusMarkerTerdekat();
          hapusInfo();
          clearroute();
          clearroute2();
          $('#tampilangkotsekitarik').show();
          $('#tampillistangkotik1').show();
          $('#tampillistangkotik').empty();
          $('#tampillistangkotik').append("<thead><th>No Angkot</th><th colspan='2'>Action</th></thead>");
          console.log("hh");
          $.ajax({ 
          url: server+'/_angkot_hotel.php?id='+id_angkot11224436, data: "", dataType: 'json', success: function(rows) 
          { 
            if(rows==null)
            {
              alert('Data Did Not Exist!');
            }
            else
            {
            for (var i in rows) 
              { 
                var row = rows[i];
                var id = row.id;
                var id_angkot = row.id_angkot;
                var route_color = row.route_color;
               var lat = row.lat;
               var lng = row.lng;
               var description = row.description;
                var name = row.name;
                
                var latitude=row.latitude;
                var longitude= row.longitude;
                console.log(id_angkot);
                listgeom(id_angkot);
                tampilrute(id_angkot,  latitude, longitude, route_color);
                centerBaru = new google.maps.LatLng(latitude, longitude);
                map.setCenter(centerBaru);
                map.setZoom(18);  
                var marker = new google.maps.Marker({
                  position: centerBaru,              
                  icon:'assets/img/hotels.png',
                  animation: google.maps.Animation.DROP,
                  map: map
                  });
                //markersDua.push(marker);
                map.setCenter(centerBaru);
                infowindow = new google.maps.InfoWindow({
                  position: centerBaru,
                  content: "<bold>"+name+"",
                  pixelOffset: new google.maps.Size(0, -1)
                    });
                infoposisi.push(infowindow); 
                infowindow.open(map,marker);
                console.log(id_angkot);
                $('#tampillistangkotik').append("<tr><td>"+id_angkot+"</td><td><a role='button' class='btn btn-success' onclick='detailangkot(\""+id_angkot+"\",\""+lat+"\",\""+lng+"\",\""+lat1+"\",\""+lng1+"\")'>Lihat</a></td></tr>");
              }
            }
           }
         });  
        }

function owangkot(id_angkot11224439,lat1,lng1){
          hapusMarkerTerdekat();
          hapusInfo();
          clearroute();
          clearroute2();
          $('#tampilangkotsekitarik').show();
          $('#tampillistangkotik1').show();
          $('#tampillistangkotik').empty();
          $('#tampillistangkotik').append("<thead><th>No Angkot</th><th colspan='2'>Action</th></thead>");
          console.log("hh");
          $.ajax({ 
          url: server+'/_angkot_ow.php?id='+id_angkot11224439, data: "", dataType: 'json', success: function(rows) 
          { 
            if(rows==null)
            {
              alert('Data Did Not Exist!');
            }
            else
            {
            for (var i in rows) 
              { 
                var row = rows[i];
                var id = row.id;
                var id_angkot = row.id_angkot;
                var route_color = row.route_color;
               var lat = row.lat;
               var lng = row.lng;
               var description = row.description;
                var name = row.name;
                
                var latitude=row.latitude;
                var longitude= row.longitude;
                console.log(id_angkot);
                listgeom(id_angkot);
                tampilrute(id_angkot,  latitude, longitude, route_color);
                centerBaru = new google.maps.LatLng(latitude, longitude);
                map.setCenter(centerBaru);
                map.setZoom(18);  
                var marker = new google.maps.Marker({
                  position: centerBaru,              
                  icon:'icon/marker_tw.png',
                  animation: google.maps.Animation.DROP,
                  map: map
                  });
                //markersDua.push(marker);
                map.setCenter(centerBaru);
                infowindow = new google.maps.InfoWindow({
                  position: centerBaru,
                  content: "<bold>"+name+"",
                  pixelOffset: new google.maps.Size(0, -1)
                    });
                infoposisi.push(infowindow); 
                infowindow.open(map,marker);
                console.log(id_angkot);
                $('#tampillistangkotik').append("<tr><td>"+id_angkot+"</td><td><a role='button' class='btn btn-success' onclick='detailangkot(\""+id_angkot+"\",\""+lat+"\",\""+lng+"\",\""+lat1+"\",\""+lng1+"\")'>Lihat</a></td></tr>");
              }
            }
           }
         });  
        }

function worshipangkot(id_angkot11224437,lat1,lng1){
          hapusMarkerTerdekat();
          hapusInfo();
          clearroute();
          clearroute2();
          $('#tampilangkotsekitarik').show();
          $('#tampillistangkotik1').show();
          $('#tampillistangkotik').empty();
          $('#tampillistangkotik').append("<thead><th>No Angkot</th><th colspan='2'>Action</th></thead>");
          console.log("hh");
          $.ajax({ 
          url: server+'_angkot_worship.php?id='+id_angkot11224437, data: "", dataType: 'json', success: function(rows) 
          { 
            if(rows==null)
            {
              alert('Data Did Not Exist!');
            }
            else
            {
            for (var i in rows) 
              { 
                var row = rows[i];
                var id = row.id;
                var id_angkot = row.id_angkot;
                var route_color = row.route_color;
               var lat = row.lat;
               var lng = row.lng;
               var description = row.description;
                var name = row.name;
                
                var latitude=row.latitude;
                var longitude= row.longitude;
                console.log(id_angkot);
                listgeom(id_angkot);
                tampilrute(id_angkot,  latitude, longitude, route_color);
                centerBaru = new google.maps.LatLng(latitude, longitude);
                map.setCenter(centerBaru);
                map.setZoom(18);  
                var marker = new google.maps.Marker({
                  position: centerBaru,              
                  icon:'icon/marker_tw.png',
                  animation: google.maps.Animation.DROP,
                  map: map
                  });
                //markersDua.push(marker);
                map.setCenter(centerBaru);
                infowindow = new google.maps.InfoWindow({
                  position: centerBaru,
                  content: "<bold>"+name+"",
                  pixelOffset: new google.maps.Size(0, -1)
                    });
                infoposisi.push(infowindow); 
                infowindow.open(map,marker);
                console.log(id_angkot);
                $('#tampillistangkotik').append("<tr><td>"+id_angkot+"</td><td><a role='button' class='btn btn-success' onclick='detailangkot(\""+id_angkot+"\",\""+lat+"\",\""+lng+"\",\""+lat1+"\",\""+lng1+"\")'>Lihat</a></td></tr>");
              }
            }
           }
         });  
        }

function callRoute(start, end)
{
  init();
  $('#hasildet').hide();
  $('#hasilrute').hide();  
  $('#detailrute1').show();
  $('#detailrute').empty();
  clearroute2();

  if (koordinat == 'null' || typeof(koordinat) == "undefined")
  {
    alert('Klik Tombol Posisi Saat ini Dulu');
  }
  else
  {
  	$('#hasilrute').show();
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsService.route
    (
    {
      origin:start,
      destination : end,
      travelMode:google.maps.TravelMode.DRIVING
    },
    function(response, status)
    {
      if (status === google.maps.DirectionsStatus.OK)
      {
        directionsDisplay.setDirections(response);
      }
      else
      {
        window.alert('Direction request failed due to' +status);
      }
    }
    );
    directionsDisplay.setMap(map);
    map.setZoom(16);

    directionsDisplay.setPanel(document.getElementById('detailrute1'));
  }
}




function clearroute2(){      
    if(typeof(directionsDisplay) != "undefined" && directionsDisplay.getMap() != undefined){
    directionsDisplay.setMap(null);
    $("#rute").remove();
    }     

}

//Menampilkan Form FilterIK
function selectkul()
{

  $("#selectkulll").show();
  $("#hasilik").hide();
  $("#selectfacility").hide();
  $('#hasildet').hide();
  $("#popular").hide();
  $('#selectcategory').hide();
  init();
}

function list()
{
  $("#popular").show();
  $("#hasilik").hide();
  $("#selectfacility").hide();
  $('#hasildet').hide();
  $('#selectcategory').hide();
  init();
}

function selectfacility()
{

  $("#selectfacility").show();
  $("#hasilik").hide();
  $("#selectkulll").hide();
  $('#hasildet').hide();
  $("#popular").hide();
  $('#selectcategory').hide();
  init();
}

function viewkull()
{
  $("#popular").hide();
  hapusawal();
  var fas=selectkul.value;
  var arrayLay=[];
  for(i=0;i<$("input[name=culinary]:checked").length;i++){
    arrayLay.push($("input[name=culinary]:checked")[i].value);
  }
  console.log('zz');
  if (arrayLay==''){
    alert('Pilih Kuliner');
  }else{
    $('#hasilcari').append("<thead><th>Name</th><th colspan='3'>Action</th></thead>");
    console.log(server+'selectkul.php?lay='+arrayLay);
    $.ajax({ url: server+'selectkul.php?lay='+arrayLay, data: "", dataType: 'json', success: function(rows){
      console.log("hai");
      if(rows==null)
            {
              alert('Data not found');
            }
        for (var i in rows) 
            {   
              var row     = rows[i];
              var id   = row.id;
              var nama_kuliner   = row.name;
              var nama_tempat_kuliner   = row.name;
              var latitude  = row.latitude ;
              var longitude = row.longitude ;
              centerBaru = new google.maps.LatLng(latitude, longitude);
              console.log(name);
              console.log(latitude);
              console.log(longitude);
              map.setCenter(centerBaru);
              map.setZoom(16);
              clickMarker(centerBaru, id);
              $('#hasilcari').append("<tr><td>"+nama_tempat_kuliner+"</td><td><a role='button' class='btn btn-success' onclick='detculi(\""+id+"\");detailinfokul(\""+id+"\");'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-taxi' onclick='kulAngkot(\""+id+"\")'></a></td></tr>");
            }
            $('#hasilpencarian').append("<h5 class='box-title' id='hasilpencarian'>Result :</h5>"+rows.length);
    }});
  }
}


function viewfas()
{ 
  hapusawal();
  var fas=selectfacility.value;
  var arrayLay=[];
  for(i=0;i<$("input[name=facility]:checked").length;i++){
    arrayLay.push($("input[name=facility]:checked")[i].value);
  }
  console.log(arrayLay);
  if (arrayLay==''){
    alert('Pilih Fasilitas');
  }else{
    $('#hasilcari').append("<thead><th>Name</th><th colspan='3'>Action</th></thead>");
    $.ajax({ url: server+'selectfas.php?lay='+arrayLay, data: "", dataType: 'json', success: function(rows){
      console.log("hai");
      if(rows==null)
            {
              alert('Data not found');
            }
        for (var i in rows) 
            {   
              var row     = rows[i];
              var id   = row.id;
              var id_facility   = row.id;
              var name_facility   = row.name;
              var nama_tempat_kuliner   = row.name;
              var latitude  = row.latitude ;
              var longitude = row.longitude ;
              centerBaru = new google.maps.LatLng(latitude, longitude);
              console.log(name);
              console.log(latitude);
              console.log(longitude);
              map.setCenter(centerBaru);
              map.setZoom(12);
              clickMarker(centerBaru, id);
              $('#hasilcari').append("<tr><td>"+nama_tempat_kuliner+"</td><td><a role='button' class='btn btn-success' onclick='detculi(\""+id+"\");detailinfokul(\""+id+"\");'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-taxi' onclick='kulAngkot(\""+id_facility+"\")'></a></td></tr>");
            }
            $('#hasilpencarian').append("<h5 class='box-title' id='hasilpencarian'>Result :</h5>"+rows.length);
    }});
  }
}


 function hapus_Semua(){
          //set posisi
          basemap()
          //hapus semua data
          hapusRadius();          
          }

 function hapus_kecuali_landmark(){
            hapusRadius();
            hapusMarkerObject();
            hapusInfo();
            clearangkot();
            clearroute();
          }
 
 function hapusMarkerObject() {
            for (var i = 0; i < markersDua.length; i++) {
                  markersDua[i].setMap(null);
              }
          }

   function clearangkot(){
          for (i in angkot){
              angkot[i].setMap(null);
            } 
            angkot=[]; 
          }

  function clearroute(){
          for (i in rute){
            rute[i].setMap(null);
          } 
          rute=[]; 
        }

 /********************************************************** RADIUS - OBJEK SEKITAR******************************************************/
 /***************************************************************************************************************************************/


function route_sekitar(lat1,lng1,lat,lng) {
          var start = new google.maps.LatLng(lat1, lng1);
          var end = new google.maps.LatLng(lat, lng);

          if(directionsDisplay){
              clearroute();  
              hapusInfo();
          }

          directionsService = new google.maps.DirectionsService();
          var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            provideRouteAlternatives: true
          };

          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
             directionsDisplay.setDirections(response);
           }
          });
          
          directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: false,
            polylineOptions: {
              strokeColor: "darkorange"
            }
          });

          directionsDisplay.setMap(map);
          rute.push(directionsDisplay);          
      }



 function tampil_sekitar(latitude,longitude,namaa){
        hapus_Semua();

        rad_lat = latitude;
        rad_lng = longitude;

        //Hilangkan Button Sekitar
        $('#view_sekitar').empty();
        $('#hasilik').hide();
        document.getElementById("inputradius").style.display = "inline";

        // POSISI MARKER
        centerBaru = new google.maps.LatLng(latitude, longitude);
        map.setZoom(16);  
          var marker = new google.maps.Marker({map: map, position: centerBaru, 
         icon:'assets/img/cul.png',
          animation: google.maps.Animation.DROP,
          clickable: true});

        //INFO WINDOW
        marker.info = new google.maps.InfoWindow({
          content: "<bold>"+namaa+"",
          pixelOffset: new google.maps.Size(0, -1)
            });
          marker.info.open(map, marker);
          map.setCenter(centerBaru);

        $("#nearbyik").show();
        $("#hasildet").hide();
        $("#hasilcaridet").hide();
        $("#hasilculi").hide();
        $("#hasilsouv").hide();
        $("#hasilindustry").hide();
        $("#hasilobj").hide();
        $("#hasilhotel").hide();
        $("#hasilmosque").hide();
        $("#hasilrestaurant").hide();
                        
      }


function industri_sekitar(latitude,longitude,rad){ //INDUSTRI SEKITAR
        $('#hasilcariind').empty();
        $('#hasilcariind1').show();
        $('#hasilcariind').append("<thead><th class='centered'>Nama</th><th colspan='3' class='centered'>Aksi</th></thead>");
        $.ajax({url: server+'_sekitar_industri.php?lat='+latitude+'&long='+longitude+'&rad='+rad, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows){ 
            var row = rows[i];
            var id = row.id;
            var name = row.name;
            var address = row.address;
            var cp = row.cp;
            var lat=row.latitude;
            var lon = row.longitude;
            console.log(name);

            //POSISI MAP
            centerBaru = new google.maps.LatLng(lat, lon);
            map.setCenter(centerBaru);
            map.setZoom(16);  
            var marker = new google.maps.Marker({
              position: centerBaru,              
              icon:'assets/img/ik.png',
              animation: google.maps.Animation.DROP,
              map: map
              });
            markersDua.push(marker);
            map.setCenter(centerBaru);
            $('#hasilcariind').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-danger fa fa-info' onclick='detailinfoik(\""+id+"\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='route_sekitar(\""+latitude+"\",\""+longitude+"\",\""+lat+"\",\""+lon+"\")'></a></td><td><a role='button' class='btn btn-danger fa fa-taxi' onclick='ikangkot(\""+id+"\",\""+lat+"\",\""+lon+"\")'></a></td></tr>");
          }//end for
        }});//end ajax  
      }

function restaurant_sekitar(latitude,longitude,rad){ //INDUSTRI SEKITAR
        $('#hasilcarirestaurant').empty();
        $('#hasilcarirestaurant1').show();
        $('#hasilcarirestaurant').append("<thead><th class='centered'>Nama</th><th colspan='3' class='centered'>Aksi</th></thead>");
        $.ajax({url: server+'_sekitar_restaurant.php?lat='+latitude+'&long='+longitude+'&rad='+rad, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows){ 
            var row = rows[i];
            var id = row.id;
            var name = row.name;
            var address = row.address;
            var cp = row.cp;
            var lat=row.latitude;
            var lon = row.longitude;
            console.log(name);

            //POSISI MAP
            centerBaru = new google.maps.LatLng(lat, lon);
            map.setCenter(centerBaru);
            map.setZoom(16);  
            var marker = new google.maps.Marker({
              position: centerBaru,              
              icon:'assets/img/culf.png',
              animation: google.maps.Animation.DROP,
              map: map
              });
            markersDua.push(marker);
            map.setCenter(centerBaru);
            $('#hasilcarirestaurant').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-danger fa fa-info' onclick='detailinforestaurant(\""+id+"\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='route_sekitar(\""+latitude+"\",\""+longitude+"\",\""+lat+"\",\""+lon+"\")'></a></td><td><a role='button' class='btn btn-danger fa fa-taxi' onclick='restaurantangkot(\""+id+"\",\""+lat+"\",\""+lon+"\")'></a></td></tr>");
          }//end for
        }});//end ajax  
      }


function kuliner_sekitar(latitude,longitude,rad){ //KULINER SEKITAR 

          $('#hasilcariculi').empty();
          $('#hasilcariculi1').show();
          $('#hasilcariculi').append("<thead><th class='centered'>Nama</th><th colspan='3' class='centered'>Aksi</th></thead>");
          $.ajax({url: server+'_sekitar_kuliner.php?lat='+latitude+'&long='+longitude+'&rad='+rad, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows){ 
              var row = rows[i];
              var id = row.id;
              var name = row.name;
              var address = row.address;
              var cp = row.cp;
              
              var open = row.open;
              var close = row.close;
              var capacity = row.capacity;
              
              var employee = row.employee;
              var lat=row.latitude;
              var lon = row.longitude;

              //POSISI MAP
              centerBaru = new google.maps.LatLng(lat, lon);
              map.setCenter(centerBaru);
              map.setZoom(16);  
              var marker = new google.maps.Marker({
                position: centerBaru,              
                icon:'assets/img/cul.png',
                animation: google.maps.Animation.DROP,
                map: map
                });
              markersDua.push(marker);
              map.setCenter(centerBaru);

              $('#hasilcariculi').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-danger fa fa-info' onclick='detculi(\""+id+"\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='route_sekitar(\""+latitude+"\",\""+longitude+"\",\""+lat+"\",\""+lon+"\")'></a></td></tr>");
            }//end for
          }});//end ajax  
        }


function masjid_sekitar(latitude,longitude,rad){ // MASJID SEKITAR 

        $('#hasilcarimosque').empty();
        $('#hasilcarimosque1').show();
        $('#hasilcarimosque').append("<thead><th class='centered'>Nama</th><th colspan='3' class='centered'>Aksi</th></thead>");
        $.ajax({url: server+'_sekitar_masjid.php?lat='+latitude+'&long='+longitude+'&rad='+rad, data: "", dataType: 'json', success: function(rows){ 
          for (var i in rows){ 
            var row = rows[i];
            var id = row.id;
            var name = row.name;
            var address = row.address;
            var capacity = row.capacity;
            var lat=row.latitude;
            var lon = row.longitude;
            
            //POSISI MAP
            centerBaru = new google.maps.LatLng(lat, lon);
            map.setCenter(centerBaru);
            map.setZoom(16);  
            var marker = new google.maps.Marker({
              position: centerBaru,              
              icon:'assets/img/msj.png',
              animation: google.maps.Animation.DROP,
              map: map
              });
            markersDua.push(marker);
            map.setCenter(centerBaru);

            $('#hasilcarimosque').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-danger fa fa-info' onclick='detailinfomosque(\""+id+"\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='route_sekitar(\""+latitude+"\",\""+longitude+"\",\""+lat+"\",\""+lon+"\")'></a></td><td><a role='button' class='btn btn-danger fa fa-taxi' onclick='worshipangkot(\""+id+"\",\""+lat+"\",\""+lon+"\")'></a></td></tr>");
          }//end for
        }});//end ajax  
      }

function oleholeh_sekitar(latitude,longitude,rad){ // OLEH-OLEH SEKITAR 

          $('#hasilcarisouv').empty();
           $('#hasilcarisouv1').show();
          $('#hasilcarisouv').append("<thead><th class='centered'>Nama</th><th colspan='3' class='centered'>Aksi</th></thead>");
          $.ajax({url: server+'_sekitar_oleholeh.php?lat='+latitude+'&long='+longitude+'&rad='+rad, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows){ 
              var row = rows[i];
              var id = row.id;
              var name = row.name;
              var owner = row.owner;
              var cp = row.cp;
              var address = row.address;
              
              var lat=row.latitude;
              var lon = row.longitude;
              
              //POSISI MAP
              centerBaru = new google.maps.LatLng(lat, lon);
              map.setCenter(centerBaru);
              map.setZoom(16);  
              var marker = new google.maps.Marker({
                position: centerBaru,              
                icon:'assets/img/souv.png',
                animation: google.maps.Animation.DROP,
                map: map
                });
              markersDua.push(marker);
              map.setCenter(centerBaru);

              $('#hasilcarisouv').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-danger fa fa-info' onclick='detailinfosou(\""+id+"\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='route_sekitar(\""+latitude+"\",\""+longitude+"\",\""+lat+"\",\""+lon+"\")'></a></td><td><a role='button' class='btn btn-danger fa fa-taxi' onclick='souangkot(\""+id+"\",\""+lat+"\",\""+lon+"\")'></a></td></tr>");
            }//end for
          }});//end ajax  
        } 

function tw_sekitar(latitude,longitude,rad){ // TEMPAT WISATA SEKITAR 

          $('#hasilcariobj').empty();
          $('#hasilcariobj1').show();
          $('#hasilcariobj').append("<thead><th class='centered'>Nama</th><th colspan='3' class='centered'>Aksi</th></thead>");
          $.ajax({url: server+'_sekitar_tw.php?lat='+latitude+'&long='+longitude+'&rad='+rad, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows){ 
              var row = rows[i];
              var id = row.id;
              var name = row.name;
              var address = row.address;
              var open = row.open;
              var close = row.close;
              var ticket = row.ticket;
              
              var lat=row.latitude;
              var lon = row.longitude;
              
              //POSISI MAP
              centerBaru = new google.maps.LatLng(lat, lon);
              map.setCenter(centerBaru);
              map.setZoom(16);  
              var marker = new google.maps.Marker({
                position: centerBaru,              
                icon:'assets/img/tours.png',
                animation: google.maps.Animation.DROP,
                map: map
                });
              markersDua.push(marker);
              map.setCenter(centerBaru);

              $('#hasilcariobj').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-danger fa fa-info' onclick='detailinfoobj(\""+id+"\")'></a></td><td><a role='button' class='btn btn-danger fa fa-road' onclick='route_sekitar(\""+latitude+"\",\""+longitude+"\",\""+lat+"\",\""+lon+"\")'></a></td><td><a role='button' class='btn btn-danger fa fa-taxi' onclick='owangkot(\""+id+"\",\""+lat+"\",\""+lon+"\")'></a></td></tr>");
            }//end for
          }});//end ajax  

        }



      function h_sekitar(latitude,longitude,rad){ // TEMPAT WISATA SEKITAR 

          $('#hasilcarihotel').empty();
          $('#hasilcarihotel1').show();
          $('#hasilcarihotel').append("<thead><th class='centered'>Nama</th><th colspan='3' class='centered'>Aksi</th></thead>");
          $.ajax({url: server+'_sekitar_hotel.php?lat='+latitude+'&long='+longitude+'&rad='+rad, data: "", dataType: 'json', success: function(rows){ 
            for (var i in rows){ 
              var row = rows[i];
              var id = row.id;
              var name = row.name;
              var address = row.address;
              var cp = row.cp;
              
              var lat=row.latitude;
              var lon = row.longitude;
              
              //POSISI MAP
              centerBaru = new google.maps.LatLng(lat, lon);
              map.setCenter(centerBaru);
              map.setZoom(16);  
              var marker = new google.maps.Marker({
                position: centerBaru,              
                icon:'assets/img/hotels.png',
                animation: google.maps.Animation.DROP,
                map: map
                });
              markersDua.push(marker);
              map.setCenter(centerBaru);
              console.log(rad);

              $('#hasilcarihotel').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-danger fa fa-info' onclick='detailinfohotel(\""+id+"\")'></a></td> <td><a role='button' class='btn btn-danger fa fa-road'  onclick='route_sekitar(\""+latitude+"\",\""+longitude+"\",\""+lat+"\",\""+lon+"\")'></a></td><td><a role='button' class='btn btn-danger fa fa-taxi' onclick='hotelangkot(\""+id+"\",\""+lat+"\",\""+lon+"\")'></a></td></tr>");
            }//end for
          }});//end ajax  
        }


//Fungsi Aktifkan Radius
function aktifkanRadius()
{
   var koordinat = new google.maps.LatLng(rad_lat, rad_lng);
          map.setCenter(koordinat);
          map.setZoom(16);  

          hapus_kecuali_landmark();
          hapusRadius();
          var inputradius=document.getElementById("inputradius").value;
          console.log(inputradius);
          var rad = parseFloat(inputradius*100);
          var circle = new google.maps.Circle({
            center: koordinat,
            radius: rad,      
            map: map,
            strokeColor: "blue",
            strokeOpacity: 0.5,
            strokeWeight: 1,
            fillColor: "blue",
            fillOpacity: 0.35
          });        
          circles.push(circle);     
          //TAMPILAN
          $("#hasilindustry").hide();
          $("#hasilculi").hide();
          $("#hasilmosque").hide();
          $("#hasilsouv").hide();
          $("#hasilobj").hide();
          $("#hasilhotel").hide();
           $("#hasilrestaurant").hide();

          if (document.getElementById("check_i").checked) {
            industri_sekitar(rad_lat,rad_lng,rad);
            $("#hasilindustry").show();
          }        

          if (document.getElementById("check_k").checked) {
            kuliner_sekitar(rad_lat,rad_lng,rad);
            $("#hasilculi").show();
          }      

          if (document.getElementById("check_m").checked) {
            masjid_sekitar(rad_lat,rad_lng,rad);
            $("#hasilmosque").show();
          }        

          if (document.getElementById("check_oo").checked) {
            oleholeh_sekitar(rad_lat,rad_lng,rad);
            $("#hasilsouv").show();
          }        

          if (document.getElementById("check_tw").checked) {
            tw_sekitar(rad_lat,rad_lng,rad);
            $("#hasilobj").show();
          }        

          if (document.getElementById("check_h").checked) {
            h_sekitar(rad_lat,rad_lng,rad);
            $("#hasilhotel").show();
          }  
          if (document.getElementById("check_res").checked) {
            restaurant_sekitar(rad_lat,rad_lng,rad);
            $("#hasilrestaurant").show();
          }        
          
        }

 function set_center(lat,lon,nama){

        //Hapus Info Sebelumnya
        hapusInfo();
        
        //POSISI MAP
        var centerBaru      = new google.maps.LatLng(lat, lon);
        map.setCenter(centerBaru);

        //JENDELA INFO
        var infowindow = new google.maps.InfoWindow({
              position: centerBaru,
              content: "<bold>"+nama+"</bold>",
            });
        infoDua.push(infowindow); 
        infowindow.open(map);  

      }


//Cek Radius
function cekRadius()
{
  rad = inputradius.value*100;
  console.log(rad);
}


//Fungsi Hapus Radius
function hapusRadius()
{
  for(var i=0;i<circles.length;i++)
  {
    circles[i].setMap(null);
  }
  circles=[];
  cekRadiusStatus = 'off';
}

//Fungsi Aktifkan Radius
function aktifkanRadiuss()
{
  if (koordinat == 'null')
  {
    alert ('Click the Button of Your Position Beforehand');
  }
  else 
  {
    hapusRadius();
    var inputradiuss=document.getElementById("inputradiuss").value;
    var circle = new google.maps.Circle
    ({
      center: koordinat,
      radius: parseFloat(inputradiuss*100),      
      map: map,
      strokeColor: "blue",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "blue",
      fillOpacity: 0.35
    });        
    map.setZoom(12);       
    map.setCenter(koordinat);
    circles.push(circle);     
  }
  cekRadiusStatus = 'on';
  tampilradiuss();
}


//Menampilkan Data Radius yg dicari pada Result
function tampilradiuss()
{
  hapusawal1();
  cekRadiuss();
  $('#hasilcari').append("<thead><th>Name</th><th colspan='2'>Action</th></thead>");
  console.log(server+'culradius.php?lat='+koordinat.lat+'&lng='+koordinat.lng+'&rad='+rad);
  $.ajax
  ({ 
    url: server+'culradius.php?lat='+koordinat.lat+'&lng='+koordinat.lng+'&rad='+rad, data: "", dataType: 'json', success: function(rows)
    { 
      console.log(rows);
      for (var i in rows) 
      {   
        var row     = rows[i];
        var id  = row.id;
        var name   = row.name;
        var latitude  = row.latitude; ;
        var longitude = row.longitude ;
        centerBaru      = new google.maps.LatLng(latitude, longitude);
        centerBaru = new google.maps.LatLng(latitude, longitude);
        marker = new google.maps.Marker
        ({
          position: centerBaru,
          map: map,
          icon: "assets/img/cul.png",
        });
        markersDua.push(marker);
        map.setCenter(centerBaru);
        map.setZoom(14);
        console.log(latitude);
        console.log(longitude);
        console.log(rad);
        clickMarker(centerBaru, id);
        $('#hasilcari').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-success' onclick='detculi(\""+id+"\");detailinfokul(\""+id+"\");'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-taxi' onclick='kulAngkot(\""+id+"\")'></a></td></tr>");     
       }
       $('#hasilpencarian').append("<h5 class='box-title' id='hasilpencarian'>Result :</h5>"+rows.length);
    }

  });   
}


//Cek Radius
function cekRadiuss()
{
  rad = inputradiuss.value*100;
}


function clean()
 {
  $('#hasilcari').empty();
  $('#hasilculi').empty();
  $('#selectfacility').hide();
  $('#hasilpencarian').empty();
  $('#hasilpencarian').append("Bukittinggi Tourism..");
  hapusInfo();
  hapusRadius();
  hapusMarkerTerdekat(); 
}



function viewcapacity()
{
  hapusawal();
  if (document.getElementById('caricapacity').value=="")
    {
      alert("Pilih Option Dahulu !");
    }
    else
    {
  hapusMarkerTerdekat();
    $('#hasilcari').append("<thead><th>Name</th><th colspan='3'>Action</th></thead>");
    var kulcap = document.getElementById('caricapacity').value;
    console.log(kulcap);
    $.ajax
    ({ 
      url: server+'capacity.php?kapasitas='+kulcap, data: "", dataType: 'json', success: function(rows)
      { 
        if(rows==null)
        {
          alert('Data Did Not Exist !');
        }
        for (var i in rows)
        {   
          var row     = rows[i];
          var id  = row.id;
          var name   = row.name;
          var capacity   = row.id;
          var latitude  = row.latitude ;
          var longitude = row.longitude ;
          centerBaru = new google.maps.LatLng(latitude, longitude);
          marker = new google.maps.Marker
          ({
            position: centerBaru,
            map: map,
            icon: "assets/img/cul.png",
          });
          markersDua.push(marker);
          map.setCenter(centerBaru);
          map.setZoom(14);
          clickMarker(centerBaru, id);
          console.log(id);
          $('#hasilcari').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-success' onclick='detculi(\""+id+"\");detailinfokul(\""+id+"\");'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-taxi' onclick='kulAngkot(\""+id+"\")'></a></td></tr>");
        }   
        $('#hasilpencarian').append("<h5 class='box-title' id='hasilpencarian'>Result :</h5>"+rows.length);
      }
    }); 
  }
}

function viewprice()
{
  hapusawal();
  if (document.getElementById('cariprice').value=="")
    {
      alert("Pilih Option Dahulu !");
    }
    else
    {
    $('#hasilcari').append("<thead><th>Name</th><th colspan='3'>Action</th></thead>");
    var kulprice = document.getElementById('cariprice').value;
    console.log(kulprice);
    console.log("s");
    $.ajax
    ({ 
      url: server+'price.php?harga='+kulprice, data: "", dataType: 'json', success: function(rows)
      { 
         console.log("sa");
        if(rows==null)
        {
          alert('Data Did Not Exist !');
        }
        for (var i in rows)
        {   
          var row     = rows[i];
          var id  = row.id;
          var name   = row.name;
          var price   = row.price;
          var latitude  = row.latitude ;
          var longitude = row.longitude ;
          centerBaru = new google.maps.LatLng(latitude, longitude);
          marker = new google.maps.Marker
          ({
            position: centerBaru,
            map: map,
            icon: "assets/img/cul.png",
          });
          markersDua.push(marker);
          map.setCenter(centerBaru);
          map.setZoom(14);
          clickMarker(centerBaru, id);
          console.log(id);
          $('#hasilcari').append("<tr><td>"+name+"</td><td><a role='button' class='btn btn-success' onclick='detculi(\""+id+"\");detailinfokul(\""+id+"\");'>Show</a></td><td><a role='button' class='btn btn-danger fa fa-taxi' onclick='kulAngkot(\""+id+"\")'></a></td></tr>");
        }   
        $('#hasilpencarian').append("<h5 class='box-title' id='hasilpencarian'>Result :</h5>"+rows.length);
      }
    }); 
  }
}


 