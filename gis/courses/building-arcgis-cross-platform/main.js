/*
 * Core class of the API - Accessor
 * Enhanced implementation of Array - collection
 * Useful for asynchromous tasks - promises
 * Loading resources as needed - loadables
 *  
*/

require([
  'esri/WebMap',
  'esri/views/MapView',
  'esri/core/watchUtils', //what's this?
  //widgets
  'esri/widgets/Expand',
  'esri/widgets/BasemapGallery',
  'esri/widgets/BasemapToggle',
  'esri/widgets/Home',
  'esri/widgets/Legend',
  'esri/widgets/LayerList',
  'esri/widgets/Print',
  'esri/widgets/ScaleBar',
  'esri/widgets/Search',
], function ( 
  WebMap, MapView, watchUtils,
  Expand, BasemapGallery, BasemapToggle, Home,
  Legend, LayerList, Print, ScaleBar, Search
){ 
  window.watchUtils = watchUtils; // what's this?
  const mapID = '15298012bff94b1482cf3fee6277fad8'

  var map = new WebMap({ 
    portalItem: {
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

  view.then(function() { // Wait until the view is ready, then load our widgets
    //widgets

    // Each widget needs about 2 things that you need to provide to it
    var basemapGallery = new BasemapGallery({
      view: view, // it needs a view (you have to tell it which view I guess)
      container: document.createElement('div') // and it needs a container
      // the container is because we gonna add them to the expand widget
      // This container is going to become the dom node for the widget
    });

    var basemapToggle = new BasemapToggle({
      view: view,
      nextBasemap: 'hybrid'
      // we didn't provide a container because we're not adding it to a container, 
      // it's sitting by itself in the corner
    });

    var home = new Home({
      view: view,
      container: document.createElement('div')
    });

    // for example this search widget will go inside the ExpandWidget. Meaning
    // when you click on the container it'll expand and be a part of it.
    var search = new Search({
      view: view,
      container: document.createElement('div')
    });

    var scalebar = new ScaleBar({
      view: view,
      container: document.createElement('div')
    });

    var legend = new Legend({
      view: view,
      container: document.createElement('div')
    });

    var layerlist = new LayerList({
      view: view,
      container: document.createElement('div')
    });
    var print = new Print({
      view: view,
      // it's a URL to .. a print service? You can use the default arcgis 
      printServiceUrl: 'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task'
    });

    // expands

    var bgExpand = new Expand({
      view: view,
      content: basemapGallery.domNode, // domNode of the widget
      // you need an actual domNode to provide so it knows what it's gonna show
      // see how we defined basemapGallery above and we're referring to it here?
      expandIconClass: 'esri-icon-basemap'
    });

    var searchExpand = new Expand({
      view: view,
      content: search.domNode,
      // The expandIconClass is the little icons that show up on the side. It is what the
      // actual visual icons look like that you click.
      // the info about the icons is docs in Guide -> Working with the API -> Esri Icon Font
      // You can get more icons there. Use any of them for the expand widgets.
      expandIconClass: 'esri-icon-search'
    });

    var legendExpand = new Expand({
      view: view,
      content: legend.domNode,
      expandIconClass: 'esri-icon-layers'
    });

    var printExpand = new Expand({
      view: view,
      content: print.domNode,
      expandIconClass: 'esri-icon-printer'
    })

    var listExpand = new Expand({
      view: view,
      content: layerlist.domNode,
      expandIconClass: 'esri-icon-layer-list'
    })

    // Add widgets to view.
    // The way we add a widget to the view is we use the method .add on the
    // by adding it to the UI. There's a UI property on the view and it has an add method.
    view.ui.add(home, {
      position: 'top-left',
      index: 2 // Indexed from 0
    });
    // You can look for the "add" method in the API reference, but it takes two
    // arguments, component and position. Position can be a string OR a number.
    // Here we're giving the add method an object as the second argument (what?)
    // And the position is top left but the index is 1. What does that mean? Well,
    // indexes go from 0 and start at the um.. top I guess, so if index is 0 we would be
    // moving the home button to the top, 1 would be second from the top, ETC.
    // It's just relative to other components.
    view.ui.add(searchExpand, 'top-right');
    view.ui.add(printExpand, 'top-right');
    view.ui.add(legendExpand, 'top-right');
    view.ui.add(listExpand, 'top-right');
    view.ui.add(scalebar, 'bottom-left');
    view.ui.add(basemapToggle, 'bottom-right');
    view.ui.add(bgExpand, 'bottom-right');
  });
  /*
   * So you can see that it's pretty easy to add the widgets to any location in the UI
   * that you want.
   *
   */
});
