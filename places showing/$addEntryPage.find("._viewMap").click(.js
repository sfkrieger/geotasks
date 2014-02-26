function(e) {
    		$enrtiesPage.hide();
    		$addEntryPage.hide();
			$viewMapPage.show();
			
			if (geo.isSet == true){
				//MapEl.addMarker(MapEl.map, 49, -123)
			    var myLocation = new google.maps.LatLng(geo.latitute,geo.longitude);

			    //pass my location, won't make too many changes now tho
				MapEl.map.setCenter(new google.maps.LatLng(geo.latitute,geo.longitude));
				MapEl.map.setZoom(16);
				MapEl.addMarker(MapEl.map, geo.latitute, geo.longitude)
				
				/*
				 * if your geo location is set then also put in a request for some nearby places
				 * We can now put together a request to Google with our location, 
				 * the search radius and the type of 'place' we're looking for:
				 */
				var request = { location: myLocation, radius: '5000', types: ['store'] }; 
				
				var service = new google.maps.places.PlacesService(MapEl.map);
				service.nearbySearch(request, callback);
				
				function callback(results, status) {
					  if (status == google.maps.places.PlacesServiceStatus.OK) {
					    for (var i = 0; i < results.length; i++) {
					      createMarker(results[i]);
					    }
					  }
					}

				function createMarker(place) {
					  var placeLoc = place.geometry.location;
					  var marker = new google.maps.Marker({
					    map: MapEl.map,
					    position: place.geometry.location
					  });
				}
				
				

			}
        }