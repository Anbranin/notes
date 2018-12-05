# Bicycle Registration Online

## Overview
Why register bikes?
- I don't know. It allows you to contact that person if they parked their
bike incorrectly or something. Identification basically. Is this a problem?
Maybe not. Definitely registration should be free.
- Stolen, Park someplace stupid,
Color, photo
Bicycles do not allow custom fields
Google Doc
sticker on the bike allows registration
Allow them to "buy" a sticker (could be free)

## How to do it?

### Flex

#### Lookup Table Management
- There's some flex configuration
- Lookup table management -> Vehicles
- We're going to enter it into Flex/Flexport as a vehicle.
- Under Vehicle Make - I say it's a bicycle. Model is something like
Schwinn/Trek/Specialized. This is what LaDonna does, you can do it
another way.
Code BIKE Description Bicycle Is active True. Enforcement and access/
revenue control selected.
- Then you can add some models. Add popular ones. The have an "other"
category in there people can select from. 
Insert/Edit Vehicle Model -> Code: "TK", Model "Trek" for example
- Lookup Table Management -> Physical Permit Type of "bicycle" 
because when you put them on Flexport, don't want you to accidentally buy one
for a vehicle.
So with those two things set up in Lookup Table Management. For Plate type of 
"serial number" could be used. A lot of you don't use plate types but some
people do... I think we do like "PAN" or motorcycles. Plate type of
serial number in that case.

#### Permit Number Ranges
Description Bicycle Stickers
Permit Type Bicycle
Payroll Eligible N/A
it is in-use. that's all you need though.

#### Control Groups
Your control group that you set up you set up as you would any other permit.
Regular permit class, Do whatever... How far in advance could you stick the
end date? You may not want them to expire. You can set them as far in the
future as you want. Ten years is great. You can always extend... If there's no
fee it don't matter. Pretty straightforward.

Q: What if someone sells their bicycle?
A: Have them tell us and you can just either add the other customer OR
de-register it and take the sticker off.

#### Fixed Fee/Return Schedule
Permit configuration. Insert fee schedule of fixed and 0.00. Permit type should 
be bicycles. No renewals.  This is off the permit control group configuration.

### Flexport
Search settings -> Bicycle 
CanAddBicycle = True
Bicycle Attachments Required -> maybe you want a picture of the bike!
Add Bicycle Make - Remember that's "bicycle" that you added before. It should be
shown as the UID of the make called "bicycle". Find out the UID and add it using
the edit button.
Add bicucle Plate Type  - add the one that you added before ,the UID.
Bicycle Attachments Note Type - we have put in 1 in this demo, which is a photo.
. How do we find that out.. that's a lookup table management note types 
Bocycle Phical Permit type - we made it in lookiup table management, find out
the UID there.
Add bicycle serial number label? What was that again???  Oh that's if you want 
the field to show up on the page where tehy add the bicycle? 

The serial number entered will end up under both VIN and PLATE in the vehicle. 
