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

# April 18th
--------------

Making backups on Confluence for students leaving

barcode & sequencial integers something about MT Ida stickers
data collection starts May
I just realized all the notes are on confluence anyways

# November 25th
------------------
How are we going to document everything?
2 main things on agenda
establishing tech support / resources for the campus parking map
also to fill out integration of campus parking map
there are 2 different cmapus parking maps? there's a mobile application from housing called MyUmass
for staff a viewer they have parking rogue platform:? coroga??? what's he saying
a moudle that's not active

Manage what -- responsible for twisting armt o make sure all materials there
documenting all 3 section s of this in the same place
Confluence? 
example of why: application has a search bar - based on geolocator - geolocator is component - publish to arcgis server - applicationr eads it and it's fine
  server sometimes stops returning results, so users cannot find the things. If it's not working, Jonah created a monitoring process and it checks if things are working
  if it's not working it's send an auto email to arcgis support. parking-it should be in the email list for that
  group parking several people or people who would like to get it 
  web service restart is manual
  important but not urgent things never happen
  Right now we're not monitoring that
  a test to cover this application where you check it every 10 minutes or would you like to add htat
  better if you add it
  that shiuld be on the list of the project
  Failed to Find Route - walking directions sometimes don't work and we don't have a way of checking
You maintain Github works smooth you put PR Karin approves, buildbot builds application, but this isn't documented - How it moves from Github to ETLs  how it gets deployed
Matt did a thing
what is ETL
What if you put in ILC instead of integrative learning center, campus places
ARCGIS online
down time ratio
no downtime
let's say

## Monitoring

## Documentation
Confluence for bugs, main page for where you can check for things
Share log files from web server so you can see if any type of request 404? anything? that' be useful?
start working on this er documenting - who's going to do the documenting
Liam's last semester is next semester - the student who is in training needs to get 
that student needs to be onboarded to all the groups

## Confluence
Create
Select Space
How-to
atlassian tools?
GIS
Templates for creating
Multiple ways how to do it
Confluence for Documentation - Document the process before end of semester
For Liam about Data Dictionary
What is the Data Dictionary - feature layers - the documentation is all there
wow nice
Change Log is at the bottom

Summary: It's about an hour to summarize "we need to document"

