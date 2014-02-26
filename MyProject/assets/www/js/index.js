/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//guessing app is keyword
var app = {
		
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	var map = new GoogleMap();
        map.initialize();
       // app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
//
//        console.log('Received Event: ' + id);
//      
//        //added this stuff
//    	var map;
//    	var infowindow;
//
//    	function initializing() {
//    	  var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
//
//    	  map = new google.maps.Map(document.getElementById('map-canvas'), {
//    	    mapTypeId: google.maps.MapTypeId.ROADMAP,
//    	    center: pyrmont,
//    	    zoom: 15
//    	  });
//
//    	  var request = {
//    	    location: pyrmont,
//    	    radius: 500,
//    	    types: ['store']
//    	  };
//    	  infowindow = new google.maps.InfoWindow();
//    	  var service = new google.maps.places.PlacesService(map);
//    	  service.nearbySearch(request, callback);
//    	}
//
//    	function callback(results, status) {
//    	  if (status == google.maps.places.PlacesServiceStatus.OK) {
//    	    for (var i = 0; i < results.length; i++) {
//    	      createMarker(results[i]);
//    	    }
//    	  }
//    	}
//
//    	function createMarker(place) {
//    	  var placeLoc = place.geometry.location;
//    	  var marker = new google.maps.Marker({
//    	    map: map,
//    	    position: place.geometry.location
//    	  });
//
//    	  google.maps.event.addListener(marker, 'click', function() {
//    	    infowindow.setContent(place.name);
//    	    infowindow.open(map, this);
//    	  });
//    	}
//
//    	google.maps.event.addDomListener(window, 'load', initialize);
    }
};
