/*
Using a webmap
 What is a WebMap?
 Scope could be a county, state, town, global, campus
 It's a container of information
 spacial reference - geography of map in local, regional, global, defines some props
 Webmap also contains information related to other aplications tha twill use it -- author, other apps, etc
 What data does the webmap contain that we can visualize?
  - basemap
  - operational layers - points or vehicles on the road, trees, lines, PARKING LOTS
  - boundaries
  - renderers
    Each of these layers probably has its own renderer, but you can override it.
    These renderers could maybe be streetlines - you want them to be a different color you can change it.
  - Popups
    Lot information like waitlists or whatever?
The webmap is really a model for how you want to    
*/

require([
  'esri/WebMap', //webmap module
  'esri/views/MapView' 
], function ( 
  WebMap, 
  MapView 
){ 
  //const mapID = "9330c364e64a491ba00442e050c52f4c" // test map for development found on confluence
  const mapID = '15298012bff94b1482cf3fee6277fad8' // 'Default' web map for Parking App
  //const mapID = 'b5cc864eeab34258baa30f8ff9cbfe9e' That's the map the guy from the video uses
  // const mapID = '07df23934aae4ffe8d3070c25dbd1776' // This is the map I made! It's not public so I can't use it.



  var map = new WebMap({ 
    portalItem: { // portal item from which WebMap is loaded
      id: mapID
    }
  });

  var view = new MapView({ 
    container: 'viewDiv',
    map: map,
    ui: {
      components: ['zoom', 'compass', 'attribution']
    }
  });

  // What if we want to access the layers inside the map? Well..

  // Since the view returns a promise, wait until it's loaded
  // That's what 'then' does.
  view.then(function() {
   // property on the map called layers
    // these are operational layers
    map.layers.forEach(function(layer) {
      // Now that's a hacky way to see all the layer ids, this is what printed:
      // MyUMassOperationalLayers_1903
      // MyUMassOperationalLayers_5202
      // MyUMassOperationalLayers_2330
      console.log(layer.id);
    })
    // The IDs are 'always going to be object'

    // you can find the layer by its ID if you know it:
    map.findLayerById('MyUMassOperationalLayers_2330')

  });

});
