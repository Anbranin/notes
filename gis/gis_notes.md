# GIS Meeting One:
- Niels and the rest of the team have created a database for us to maintain and use.
- Sasha, in his an almost comically stereotypically Russian accent: I'm a little bit like real estate agent
- GIS is just a regular database, and space is part of it as a data type.
- We call tables "layers" like in Adobe Illustrator
- You can edit geometry and attributes. Parking lots are just one layer geometry and attributes. Parking lots are just one layer
- We need a data collector -123 where you can survey.
- ARCGIS online
- GIS provides _context_. How different layers are spacially related to each other.
Even contains tree data for example.
- GIS FM umass there is a group for parking services - it's behind Shibboleth 
- ALL SPACIAL INFORMATION ABOUT UMASS IS AVAILABLE IN A DATABASE
---
# GIS Meeting 2: Database Queries
## Questions
- What is Tririga
- We could put bike racks on there

---
# Meeting to discuss Backend API
## Websites:
- confluence (an online collaboration software)
- SQL server (called ARCProd)
- https://developers/arcgis.com/javascript (API reference and sandbox)

## General notes
- This is a collection of modules just like JQuery that you can use, along with, I think,
an API?

## Examples:
Here is how it works:
https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=webmap-basic

Here is a course, I think I'm taking it?
https://learning.oreilly.com/learning-paths/learning-path-a/9781789953640/9781789953640-part2
---
# User Interface Specs
## Possible Scenarios
- finding bike racks
- When can I park and where with this type of permit and given what day it is?
- finding car chargers
- vendor parking
- motorcycle spots
- handicapped spots
- searching for buildings with walking directions
## Tools
- Should we use Vue.js?
---
# August 8th:
## We need to display waitlist data per lot on that map.
How to do it?
1. We make a query from T2 that gets the required data
1. We make a rake task that gets that data maybe every morning
1. We make a controller action on UMaps-rails that responds to a JSON
request and displays that data as a JSON object
1. We make that page public, like the garage status log.
1. MTF can use a piece of software to grab the JSON object and put it on GISProd

## Questions:
- What is ESRI, really?

## Action item
- watch at least another 2-3 chapters of video 

## Random notes:
- For pedestrian directions, we can roll out our own. We'll let Google handle driving directions.
- Any widgets we create should be open source. The repo can be private at first and we can make
it public later.

# August 28th
--------------
