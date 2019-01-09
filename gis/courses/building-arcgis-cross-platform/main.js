//first argument: array of paths to modules you want to use inside the application.
//second argument is a function, a callback
require([
  'esri/Map', //first module path
  'esri/views/MapView' // second module path
], function (
  Map, // first module
  MapView // second module. Note the order in the callback function!
){ 

  var map = new Map({ // Initialize a new map instance
    // a constructor with one object
    basemap: 'streets' // object has a property called basemap which is a string
  });

  var view = new MapView({ //Initialize a new mapview
    container: 'viewDiv', //The DIV we want the map to go in
    map: map, // reference this map plz
    zoom: 10, // default zoom
    center: [-118, 34] // center here by default, array of coordinates
  });

});
