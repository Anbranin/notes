# Custom App Basics
Note: Use the reference at developers.arcgis (bookmarks)

We must use the CDN - content delivery network 
just use it from a server that's going to serve out the files
Files served: stylesheet, Javascript API

those methods allow us to build our applications.

For the basic HTML Page, see index.html

# Using a Webmap

## What is a webmap?

You can think of a webmap as a container of information.
Information about: Extent of the map
is it a city? county? state? global?
Spacial reference
- spacial reference is defined if geography local regional or global
defines some properties to the projection / how to view
Webmap also contains infromations about applications that willuse it, 
details like that

What data does the webmap contain that we can actually visualize?
Most of the time, you'll have a basemap.
Webmap defines a basemap
## What information is in Webmap?
operational layers
- any data such as boundaries/points/lines/polygons not shown on basemap (like bus stops, trees,street lights)
renderers
- default renderer, overwrite. instead of arcgis online. Maybe you have street lines?
- popup information
The webmap is a model for how you want to display your map.
popups are when you click on the feature and it pops up to display shit.
container of data needed to draw your map onto the screen.
easy to add a webmap to your own application as long as you have the ID
and create a webmap instance.
Then we saw how to access layers.
