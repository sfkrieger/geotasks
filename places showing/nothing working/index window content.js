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
var geo = {};
var arTypes = []	

var places = {
		bank: false,
		store: false,
		park: false
};

var AllJournal;

var infowindow;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        
        // Manually fire this event when testing in desktop browsers
        //this.onDeviceReady();
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

    	// set our device up with geo
    	app.initializeGeo();
    	
        // Init our parse SDK
        app.initializeParse();
        
        // test parse connectivity
        // app.testParse();
        
        // Query Parse for jounral entries
        app.getJournalEntries();
        
        // hook up our UI events
        app.initializeUI();
    },
    initializeGeo: function() {
    	// Throw an error if no update is received every 30 seconds
        var options = { timeout: 30000 };
        this.watchID = navigator.geolocation.watchPosition(this.geoSuccess, this.geoError, options);
    },
    geoSuccess: function(position) {
    	console.log("Geo success");
    	
    	geo.latitute = position.coords.latitude;
    	geo.longitude = position.coords.longitude;
    	geo.isSet = true;
        
        console.log(geo.latitute);
        console.log(geo.longitude);
    },
    geoError: function(error) {
    	// Do nothing, just write some output
    	console.log('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    },
    initializeParse: function() {
    	// Init with our app info and Key
    	var parseAppID = "rH73xxSN49XCzHknPjXxaNHdscZoVAjlGTHlkkMf",
        parseApiKey = "r8Rq8IFBqqxS0P5bHovFnPF6g1Ke3DUhsCQaB6H7";
    	//Parse.initialize("rH73xxSN49XCzHknPjXxaNHdscZoVAjlGTHlkkMf","r8Rq8IFBqqxS0P5bHovFnPF6g1Ke3DUhsCQaB6H7");
    	if (parseAppID == "" || parseApiKey == "") {
    		alert("Setup a parse account and add your AppID and ApiKey in 'initializeParse'");
    	}
    	
    	Parse.initialize(parseAppID, parseApiKey);
    	
    	// Setup our JournalEntryObject for interaction with Parse
    	JournalEntryObject = Parse.Object.extend("JournalEntryObject");
    },
    testParse: function() {
    	// Create a test object and try to save it
    	var TestObject = Parse.Object.extend("TestObject");
    	var testObject = new TestObject();
    	
    	testObject.save({foo: "bar"}, {
    	  success: function(object) {
    		  console.log("Parse Test Successful!");
    	  }
    	});
    },
    initializeUI: function() {
    	var self= this,
    	$enrtiesPage = $("._entriesPage"),
    	$addEntryPage = $("._addEntryPage"),
    	$viewMapPage = $("._viewMapPage"),
		$viewTasksNearbyPage = $("._viewTasksNearbyPage");
    	
    	$enrtiesPage.show();
		$addEntryPage.hide();
		$viewMapPage.show();
		$viewTasksNearbyPage.hide();
    	
		$enrtiesPage.find("._addEntry").click(function(e) {
    		$enrtiesPage.hide();
    		$addEntryPage.show();
			$viewMapPage.hide();
        });
    	$enrtiesPage.find("._checkTasksNearby").click(function(e) {
    		$enrtiesPage.hide();
    		$addEntryPage.hide();
    		$viewTasksNearbyPage.show();
			$viewMapPage.show();
			//alert ("wooohoooo")
			app.getTasksNearby()
			if (AllJournal.length > 0) {
	    		//check which locations are nearby
				for(var i=0, len=AllJournal.length; i<len; i++) {
	    			var entry = AllJournal[i];
	    			var curlabel = entry.get("placeLabel");
	    			if(curlabel == "park"){
	    				places.park = true;
	    				//alert ("PARK!!!")
	    			}
	    			if(curlabel == "store"){
	    				places.store = true;
	    				//alert("STORE!!!")
	    				
	    			}
	    			if(curlabel == "bank"){
	    				places.bank = true;
	    				//alert("BANK!!!")
	    			}
	    			
	    		}
			var myLocation = new google.maps.LatLng(geo.latitute,geo.longitude);
			if (places.park == true){
				arTypes.push('park')
				}
			
			if (places.store == true){
				arTypes.push('store')
				
			}
			
			if (places.bank == true){
				arTypes.push('bank')
				//alert(arTypes)
			}
			var request = { location: myLocation, radius: '800', types: arTypes }; 
			  infowindow = new google.maps.InfoWindow();

			var service = new google.maps.places.PlacesService(MapEl.map);
			service.nearbySearch(request, callback);

			
			}else {
    			alert ("Now entries found");
    			}
			
			function callback(results, status) {
				  if (status == google.maps.places.PlacesServiceStatus.OK) {
					//alert("Place services OK");
				    for (var i = 0; i < results.length; i++) {
				      createMarker(results[i]);
						//alert("Created markers. There are " + results.length + " number of results !??");

				    }
				  }
				}

			function createMarker(place) {
				//alert("creating markers, wtf is happening")
				  var placeLoc = place.geometry.location;
				  var marker = new google.maps.Marker({
				    map: MapEl.map,
				    position: place.geometry.location
				  });
				  
				  google.maps.event.addListener(marker, 'click', function() {
					  //iterate through place types
					  
					  }
					  if(place.type)
						var content = place.name + "\nLocation type: ";
					  	for(var i = 0; i < places.types.length; i++){
						  if(places.store == true){
							  places.types[i] == "store";
							  content += "store ";
						  }else if(places.bank == true){
							  places.types[i] == "bank";
							  content += "bank ";
						  }else if(places.park == true){
							  places.types[i] == "park";
							  content += "park ";
						  }
						 }
					    infowindow.setContent(content);
					    infowindow.open(MapEl.map, this);
					  });
  
				  
			}
			
        });
		/*$addEntryPage.find("._viewMap").click(function(e) {
    		$enrtiesPage.hide();
    		$addEntryPage.hide();
			$viewMapPage.show();
			//MapEl = new GoogleMap();
			//map = MapEl.initialize();
			if (geo.isSet == true){
				//MapEl.addMarker(MapEl.map, 49, -123)
				MapEl.map.setCenter(new google.maps.LatLng(geo.latitute,geo.longitude));
				MapEl.map.setZoom(16);
				MapEl.addMarker(MapEl.map, geo.latitute, geo.longitude)
			}
        });*/
        
		$viewMapPage.find("._updateMap").click(function(e) {
        	//$addEntryPage.hide();
			//$viewMapPage.show();
        	//$enrtiesPage.show();
			if (geo.isSet == true){
				MapEl.map.setCenter(new google.maps.LatLng(geo.latitute,geo.longitude));
				MapEl.map.setZoom(16);
				MapEl.addMarker(MapEl.map, geo.latitute, geo.longitude)
				
				//alert("Created map center");
	
				//s: added
				//MapEl.addMarker(MapEl.map, 49, -123)
			    var myLocation = new google.maps.LatLng(geo.latitute,geo.longitude);

			    //pass my location, won't make too many changes now tho
				MapEl.map.setCenter(new google.maps.LatLng(geo.latitute,geo.longitude));
				MapEl.map.setZoom(16);
				MapEl.addMarker(MapEl.map, geo.latitute, geo.longitude)
				//alert("Added marker for geocord");

				
				/*
				 * if your geo location is set then also put in a request for some nearby places
				 * We can now put together a request to Google with our location, 
				 * the search radius and the type of 'place' we're looking for:
				 */
				
				//var request = { location: myLocation, radius: '500', types: ['store'] }; 
				
				//var service = new google.maps.places.PlacesService(MapEl.map);
				//service.nearbySearch(request, callback);
				//alert("Sent request to google places");

				function callback(results, status) {
					//alert("In callback function");
					  if (status == google.maps.places.PlacesServiceStatus.OK) {
						//alert("Place services OK");
					    for (var i = 0; i < results.length; i++) {
					      createMarker(results[i]);
							//alert("Created markers. There are " + results.length + " number of results !??");

					    }
					  }
					}

				function createMarker(place) {
					//alert("creating markers, wtf is happening")
					  var placeLoc = place.geometry.location;
					  var marker = new google.maps.Marker({
					    map: MapEl.map,
					    position: place.geometry.location
					  });
				}
			}
			else{
				alert("Location is not available. Change settings")
			}
			
        });
    	$addEntryPage.find("._addEntry").click(function(e) {
        	var journalEntry = new JournalEntryObject(),
        	$title = $("#journalEntryTitle"),
        	$body = $("#journalEntryBody"),
        	$placeLabel = $("#placeLabel");
        	
			journalEntry.set("title", $title.val());
        	journalEntry.set("body", $body.val());
			alert("skip this alert")
        	alert($placeLabel.val())
        	journalEntry.set("placeLabel", $placeLabel.val());

        	if (journalEntry.get("title") == "") {
        		alert("Please enter a title for this journal entry.");
        		return;
        	}
        	
        	if (journalEntry.get("body") == "") {
        		alert("Please enter a body for this journal entry.");
        		return;
        	}

        	// Set our Geolocation if we have it
        	if (geo.isSet) {
        		console.log("Setting Geolocation");
        		journalEntry.set("position", new Parse.GeoPoint( { latitude: geo.latitute, longitude: geo.longitude } ));
        	} else {
        		console.log("no geo");
        	}
        	
        	journalEntry.save(null, {
    			success:function(object) {
    				console.log("Saved the object!");
    				$title.val("");
    				$body.val("");
    				
    				self.getJournalEntries();
    				
    				$addEntryPage.hide();
    				$enrtiesPage.show();
    				$viewMapPage.show();
    			}, 
    			error:function(object,error) {
    				console.dir(error);
    				alert("Sorry, I couldn't save this journal entry.");
    			}
    		});
        });
        
    	$addEntryPage.find("._cancelEntry").click(function(e) {
        	$addEntryPage.hide();
			$viewMapPage.show();
        	$enrtiesPage.show();
        });
		
    	$viewTasksNearbyPage.find("._cancelEntry").click(function(e) {
        	$viewTasksNearbyPage.hide();
			$viewMapPage.show();
        	$enrtiesPage.show();
        });
		
    	
    	$(document).on("click", "._mapLink", function(e) {
    		e.preventDefault();
    		e.stopPropagation();

    		//Get the position from the data attribute
    		var long = $(this).data("longitude"),
    		    lat = $(this).data("latitude");
    		
    		//Generate Google Static Map API link
    		var link = "http://maps.googleapis.com/maps/api/staticmap?center="+lat+","+long+"&zoom=13&size=400x400&maptype=roadmap&markers=color:red%7Ccolor:red%7C"+lat+","+long+"&sensor=false";

    		// alert("Opening Map:" + link);
    		window.open(link, '_blank', 'location=yes');
    	});
    },
    formatTime: function(d) {
    	var curr_hour = d.getHours();

    	if (curr_hour < 12) {
    		a_p = "AM";
    	} else {
    	   a_p = "PM";
    	}
    	
    	if (curr_hour == 0) {
    	   curr_hour = 12;
    	}
    	
    	if (curr_hour > 12)
    	{
    	   curr_hour = curr_hour - 12;
    	}
    	
    	return curr_hour + ":" + d.getMinutes() + " " + a_p;
    },
    getJournalEntries: function() {
    	var query = new Parse.Query(JournalEntryObject);

    	query.find({
    		success:function(results) {
    			AllJournal = results
    			//alert(AllJournal[0].get("title"))
    			console.dir(results);
    			var s = "";
    			if (results.length > 0) {
	    			for(var i=0, len=results.length; i<len; i++) {
	    				var entry = results[i];
	    				s += "<li>";
	    				s += "<h2>"+entry.get("title")+"</h2>";

	    				var d = new Date(Date.parse(entry.createdAt));
	    				s += "<div class='meta'><div class='created'>" + d.toDateString() + " at " + app.formatTime(d) + "</div>";
	    				
	    				// Do we have geolocation info?
	    				//if(entry.has("position")) {
	    				//	var pos = entry.get("position");
	    				//	s += "<a href=\"\" class=\"_mapLink location\" data-longitude=\"" + pos.longitude +"\" data-latitude=\""+ pos.latitude+"\">View on Map</a>";
	    				//}
	    				
	    				s += "</div>";
	    				s += "<p>" + entry.get("body") + "</p>";
	    				s += "<div> Location: " + entry.get("placeLabel") + "</div>";
	    				s += "</li>";
	    			}
    			} else {
    				s = "<li class='loading'><h2>No journal entries found</h2></li>";
    			}
    			
    			$("._entries").html(s);
    		},
    		error:function(error) {
    			alert("Error when getting journal entries!");
    		}
    	});
    },
    include: function(arr, obj) {
        for(var i=0; i<arr.length; i++) {
            if (arr[i] == obj) return true;
        }
    },
    
    getTasksNearby: function() {
    	var query = new Parse.Query(JournalEntryObject);

    	query.find({
    		success:function(results) {
    			AllJournal = results
    			//alert(AllJournal[0].get("title"))
    			console.dir(results);
    			var s = "";
    			if (results.length > 0) {
	    			for(var i=0, len=results.length; i<len; i++) {
	    				var entry = results[i];
	    				if (app.include(arTypes, entry.get("placeLabel")) == true)
	    					{
	    				s += "<li>";
	    				s += "<h2>"+entry.get("title")+"</h2>";

	    				var d = new Date(Date.parse(entry.createdAt));
	    				s += "<div class='meta'><div class='created'>" + d.toDateString() + " at " + app.formatTime(d) + "</div>";
	    				
	    				// Do we have geolocation info?
	    				//if(entry.has("position")) {
	    				//	var pos = entry.get("position");
	    				//	s += "<a href=\"\" class=\"_mapLink location\" data-longitude=\"" + pos.longitude +"\" data-latitude=\""+ pos.latitude+"\">View on Map</a>";
	    				//}
	    				
	    				s += "</div>";
	    				s += "<p>" + entry.get("body") + "</p>";
	    				s += "</li>";
	    					}
	    			}
    			} else {
    				s = "<li class='loading_nearby'><h2>No journal entries found</h2></li>";
    			}
    			
    			$("._entriesnearby").html(s);
    		},
    		error:function(error) {
    			alert("Error when getting journal entries!");
    		}
    	});
    }
    
    

};