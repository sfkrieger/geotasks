function GoogleMap(){

this.initialize = function(){
	this.map = showMap();
	//addMarkersToMap(this.map);
	}

this.addMarker= function(map, latitude, longitude){
	var latitudeAndLongitudeOne = new google.maps.LatLng(latitude,longitude);
 
	var markerOne = new google.maps.Marker({
		position: latitudeAndLongitudeOne,
		map: map
		});
	
 }
 
var showMap = function(){
	var mapOptions = {
		zoom: 12,
		center: new google.maps.LatLng(49.26, -123.1207667),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
 
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
 
	return map;
}
	
var addMarkersToMap = function(map){
	
	//s: check out the mapBounds object. how does it sense touch?
	var mapBounds = new google.maps.LatLngBounds();
 
	var latitudeAndLongitudeOne = new google.maps.LatLng('-33.890542','151.274856');
 
	var markerOne = new google.maps.Marker({
		position: latitudeAndLongitudeOne,
		map: map
		});
 
	var latitudeAndLongitudeTwo = new google.maps.LatLng('57.77828', '14.17200');
 
	var markerOne = new google.maps.Marker({
		position: latitudeAndLongitudeTwo,
		map: map
		});
		
	mapBounds.extend(latitudeAndLongitudeOne);
	mapBounds.extend(latitudeAndLongitudeTwo);
	map.fitBounds(mapBounds);
 }
}

/*
 * function GoogleMap(){

this.initialize = function(){
var map = showMap();
}
 
 var showMap = function(){
var mapOptions = {
zoom: 4,
center: new google.maps.LatLng(-33, 151),
mapTypeId: google.maps.MapTypeId.ROADMAP
}
 
var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
 
return map;
}
}
*/
//add current position marker

//var currentposition = new Parse.GeoPoint( { latitude: geo.latitute, longitude: geo.longitude } ));
//var markerOne = new google.maps.Marker({
//	position: currentposition,
//	map: map
//	});