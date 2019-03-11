//require: a backend javascript thing
//first argument: array of paths to modules you want to use inside the 
//application. second argument is a function, a callback
require([
  'esri/Map', //first module path
  'esri/views/MapView' // second module path
], function ( //callback
  Map, // first module. These are mapped to the array of paths in order.
  MapView // second module. 
){ 

  var map = new Map({ // Initialize a new map instance
    // pass it an object in the constructor
    basemap: 'topo' // object has a property called basemap which is a string
    // various names are available
  });

  var view = new MapView({ //Intantiate a new mapview
    container: 'viewDiv', //The DIV we want the map to go in (ID)
    map: map, // reference this map plz
    zoom: 10, // default zoom level
    center: [-105.360554, 39.610666] // center here by default, array of coordinates(lat,long?)
    // mapviews have a lot of options, like 'rotation'
    // These are sometimes just defaults--a user can change the rotation with
    // their left mouse button, and sometimes not--like the map. I think.
  });

});
