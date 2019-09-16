# Do in permtest
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
[x] Lookup table management -> Vehicle Make -> Add Bicycle DONE: UID: 2051
[x] Code BIKE Description Bicycle Is active True. Enforcement and access/
revenue control selected.
[x]NOTE: LEAVE ROVR CODE EMPTY
[x] Lookup table management -> Vehicle Model -> Add popular ones along with "Other"
  Insert/Edit Vehicle Model -> Code: "TK", Model "Trek" for example
[x] Lookup Table Management -> Physical Permit Type of "bicycle" 
  because when you put them on Flexport, don't want you to accidentally buy one
  for a vehicle. Set the phyiscal group type to "audit" which is the same as hangtags
  or adhesive permits.
[x] For Plate type, "serial number" could be used. (some Flex customers do not use plate type)
  We use plate type. I set it to code SERIAL desc Serial Number
[x] Permit Classification -> Bicycle
  code BIKE description Bicycle

#### Facilities
[x] Create a facility called Bicycle
  Code BIKE
  Description Bicycle
  Note: this is not strictly necessary, but Metin asked for it so that his queries would work.
  I still don't know why not having this would mess up any queries but there it is.

#### Permit Number Ranges
[x] Description Bicycle Stickers
  Permit Type Bicycle
  Payroll Eligible N/A
  it is in-use. that's all you need though.
  - I made it non-inventoried. It's red, don't know why.

#### Control Groups
[x]Your control group that you set up you set up as you would any other permit.
Regular permit class, Do whatever... How far in advance could you stick the
end date? You may not want them to expire. You can set them as far in the
future as you want. We picked 4 years.

Q: What if someone sells their bicycle?
A: Have them tell us and you can just either add the other customer OR
de-register it and take the sticker off.

#### Fixed Fee/Return Schedule
[x]Permit configuration. Insert fee schedule of fixed and 0.00. Permit type should 
be bicycles. No renewals.  This is off the permit control group configuration.

[x] SUBCLASSIFICATIONS?
https://umass.t2flex.com/POWERPARK/config/permission/eligibleSubclassifications.aspx?groupId=5075
look at the notes for this course

### Flexport
[x] Search settings -> Bicycle 
[x] CanAddBicycle = True
[x] Bicycle Attachments Required -> maybe you want a picture of the bike? Not desired at this time.
[x] Add Bicycle Make - Remember that's "bicycle" that you added before in Flex. It should be
shown as the UID of the make called "bicycle". Find out the UID and add it using
the edit button.
[x] Add bicycle Plate Type  - add the one that you added before, the UID. The Serial Number is what we want.
[x] Bicycle Attachments Note Type - we have put in 1 in this demo, which is a photo.
  How do we find that out.. that's a lookup table management note types 
[x] Bicycle Physical Permit type - we made it in lookiup table management, find out
  the UID there. It's the physical permit type of "bicycle"
[x] Add bicycle serial number label? What was that again???  Oh that's if you want 
the field to show up on the page where they add the bicycle?
The serial number entered will end up under both VIN and PLATE in the vehicle. 
