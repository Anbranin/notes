# ERD
entity relationship diagrams

This isn't user friendly. He doesn't use the ERD when he writes queries. He wanted to show the ERD so that you know what it is.

# About UQ-Madison
They support the adjacent hospital parking
Faculty and staff is like 22k
enrollment was 44k
936 acre lakefront campu
99 lots
17 gated facilities
capped at 13k paring stalls - agreement with the city of madison
when people come to him for data sets and queires it typically revolves around the gated system
you don't have to have PARCS to get some great data out of Flex
map of parking lots - blue is gated, other colored lots are surface lots
now there's one thing on here that's sublte giant lake? 
OMG the campus is between two lakes
traffic congestion can get hectic - even on a daily basis there are thousands of cars 
it can take hours to get from the west to east sizse.. any sort of event really clogs it
Lakes surrounding the city so hence the agreemtn
you have to manage parking really heavily because of Math
heart problems? leave because we're getting into some math now.
So. We'll take the numbers
44k students plus 22k staff plus 8k hospital staff = 75k people
now 13k parking cap? 75 thousand is greater than 13k so what do we do?
Why do we have to manage parking so heavily? Far more demand than sypply. Why we don't offer general student parking is because of this. Fuck the studnets, there are too many people.
even if you take the 44k student picture out we're left with more people than parking. Daily Parking for faculty/staff AND visitors. Patients need to park, definitely. 

# About Steve: 
PARCS IT analyst
10+ years in IT
BS in Bioinformatics
Software development experience
- couple years worked at a private company working on reporting content for their software
self-taught SQL
- I never took a class to write queries or anything become a DBA (admin) 

High level SQL Overview

SELECT * FROM PARKING_TRANSACTION

- select everything from table

``` 
LEFT OUTER JOIN table ON columns
```
example
```
LEFT OUTER JOIN PERMISSION ON PARKING_TRANSACTION.PER_UID_PERMISSION = PERMISSION.PER_UID
```
The main thing with joins is bringing related tables together

The last chunk of SQL query is a where condition, those are your filters

It filters out the rows! So you dont' want like millions 
useless data set for getting ALL the rows.

For example
```
WHERE PTX_DATE_EXIT > TO_DATE('2019-09-09', 'ETC') shit
```

They use T2 PARCS to understand what's going on in their facilities
they use the monitoring view but they found that there were some deficiencies in monitoring view
the main thing is you'll see everything that's happening in your facility. There's a lot of information - too much - you can't understand at a glance what's happenning.

When assigning dashboard steve wanted to make it easy and quick to understand what's happening. various sections to dashboard
Gates Dashboard - wht is that. What is this dashboard. Did he build it?
The next section is permit holders, will show occupancy
Gates dashboard- he build the dashboard I think?
There's a large refresh button, and it shows the last refresh.
His dashboard shows
Lanes, Permit Holders, Transients, Alarms, Pay-on-foots, Passbacks.
He has a bunch of facilities though.

# Tables Used - Dashboard

INCIDENT
PERMISSION
FACILITY
LANE
ALARM
POS_STATION
POS_FACILITY_REL
POS_CURRENT_STATUS
LANE_CONTROLLER
PARKING_TRANSACTION

Flex has a lot of info. need to learn where to look.

What did you use to create the dashboard? I use a PHP script and angular.

Are you calling the Flex API - actually connecting directly to the Flex database. They requested an account to the Flex database directly. 
Flex uses a VPN, so you'd need to set up a VPN. Restart the VPN connection - reboot. You need the production server to have a complex

Did I get his business card?

# Waitlist Processor

They couldn't  do what they wanted with T2 waitlist

Waitlist process:
Transportation coordinators assign priority numbers to department employees
Permit application system calculates overall priority percentage given a number and a department

T2_FlexWaitlists.asmx
- InsertWaitlistRequest()
- RemoveWaitlistRequest()
WAITLIST
WLT_ATTEMPT
ENTITY

If you have a complex business process you should look at the API so Flex can work with you, rather than you having to work with Flex.

# Lessons Learned

SOAP vs REST
2 ways that a program can connect to an API. SOAP is more legacy, REST is 
T2_Flex_Misc 
open up the function like CloseWebDrawer
The test form is only available for requests from the local machine - cannot use REST must use soap.

/PowerParkWS/T2_Flex_misc.asmx?wsdl

If you're 
SOAPUI is a program that can be downloaded to look at the WSDL

Lessons learned - API the standard format is XML data version using password. If you don't throw the XML data payload into...
technical you need to
API doesn't know what to do with XML needs string?

Refactor the flex web services module???


# Usful tools:
SQLBOLT 
DataGrip - this is another console. downside - you need an educational license and can be expensive
Oracle SQL Developer - this is another console. - this is free. not as full-featured, but you can still use it it's great.
Insomnia - REST API tester - these 2 programs are invaluable for working with APIS.
SoapUI Soap API tester

If you're ever working with an API, you can have th

A SQL CONSOLE will beomce invaluable to you if you want to run something make a quick change and run it again - get the

# Useful Tables
PARKING_TRANSACTION
INCIDENT
- what happened and when??
INCIDENT_TYPE_MLKP
- not actionable, more of a descriptor
- human readable versions of what's happening
- joined in with incident table you'll get human readable stuff
PERMISSION
ENTITY
PER_ENT_REL
FINANCIAL_TRANSACTION
RECEIPT

Question about revenue? Financial transaction / receipt

# Final Thoughts
Ask T2! The T2 community is super resourceful. 
The data dictionary describes the database.
API Documentation is on there as well.
There's a WEB API group within the T2 community that you can ask about things.

go.wisc.edu/nlueq7
T2 community > Groups > webAPI within T2

Steven Tan
steven.tan@wisc.edu
608-263-0960
