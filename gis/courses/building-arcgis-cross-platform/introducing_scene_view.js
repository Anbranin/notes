/* How to add a webmap and a webscene to SceneView
 * How SceneView works
 * Working with the camera inside the 3-d environment
 * 
 *  SceneView: 3D representation of your application. Like Google Earth.
 *  If you change the date of the scene the stars will change position.
 *  Your scene can display a webmap. WOW.
 * A WebMap is built for 2D but you can display it in 3D, and a WebScene is built specifically for a 3D environment
 *  Data you can show inside of Scene specifically like 3d buildings.
 *  SceneViewer. Or.. whatever. If we wanted to create one. 
 *  
*/

require([
  'esri/WebScene',
  'esri/views/SceneView',
], function ( 
  WebScene, SceneView
){ 

  // You can do this with a webmap or a regular map
  /* 
  var map = new Map({ 
    basemap: 'satellite',
    ground: 'world-elevation' //elevation layer
  });
  This shit here is like our own google earth
  */
  var map = new WebScene({
    portalItem: {
      id: 'e18d908bacd440f6ab15b75e85f637b4'
    }
  })
  // The Scene view renders your data in a 3d environemnt using webgl 
  // which is used for games (in browsers). It depends on browser support.
  // Some mobile phones may not completel support it.
  //
  // What is a camera?

  var view = new SceneView({ 
    container: 'viewDiv',
    map: map
  });

  /*
  view.watch('camera', function(camera){
    console.log(camera.position.x, camera.position.y);
    // a lot of properties of the camera you can look at. Like even tilt.
    // Camera.tilt could be used to figure out what you want to display.
  });

  setTimeout(function(){
    var camera = view.camera.clone(); //cloning the camera so we can change shit about it before going to it
    camera.position = {
      x: -118,
      y: 34
    };
    view.goTo(camera) // changes the camera position every 3 seconds to a certain position
  }, 3000);
  */
  
  view.then(function() {
    setTimeout(function(){
      var camera = view.camera.clone(); // You should not change properties of a camera currently in use or maybe even changing positions
      camera.position = {
        x: -118,
        y: 34,
        z: 10000
      };
      view.goTo(camera) // goTo method goes to new view.  Think what you could code!
    }, 5000);
  })

  // With this simple setup roughly everthing looks the same, but the little widgets
  // it comes with are different. And now we can tilt as well with our mouse.
  //
  // There's a lot more you can do with the camera. You can save the camera update
  // and replay it.

});
