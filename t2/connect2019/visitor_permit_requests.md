# Flexport: Visitor Permit Requests

## What are visitor permit requests?
When a department or group user request a permit
at a high level a department or group user will pop into flexport, fill out a form, the parking office will be notified by email and can approve or modify
that request. once they approve a link is sent out to the guest user that they can send out to their guests.

Oh this is like TPP.

Say student affairs dept has 25 people coming
they'll make a request for those people
instead of
they can just push it to their end user, all 25 of those people
this is like the guest thing for TPP

## Flex Config

configuration -> Data Field Definitions -> Select Permit Control Group table from dropdown
-> Add new custom field
-> Define it as:
a boolean field
Field name: super important, but WEB_REQUEST_ONLY
You'll need to reference this field in FlexPort, field name will be referenced there.
On permit control group table he made it Web Request

configuration -> Permit Number Ranges
He defined them as like, $0 visitor permits, $5 visitor permits
doesn't matter if inventoried or non
Set up 
-> permit control group. Can have any combination of dates. Day, POS, whatever
THe custom field that we just created is there Web Request - we check that box.

"Copy custom fields to permits" is not suposed to be checked??? His isn't. Did he just say it should be?

Another thing, you need to add facilities. This is because in the submission form when requesting permit you hae to select a facility.
You do not need to have require facility selection for permit sales, not required.

FOR HELP:
Go to the website "T2 Knowledge Base". You can Google it.
T2 flexport website administartion and workflows - T2 Knowledge Base

scroll down to permit Sales -> Permit Requests

This will ahve all the configuration for Flex for reference.

For permit requests to wor k the PPA user type has to be set to group. Tht is the only way this would work.

Also this dude made a document. That lists all the shit you'll need. You need a different way for people to log in.. how do you do that
he has info on the document
it's on T2 U the connect handouts. find em
T2U - Connect2019 handouts. This handout is called Visitor Permit Requests probably.

## Flexport Config

Search Settings

PPA USER TYPES
PPA values Group

When you go to log in you have this third login, dept login. How did you make that? Look at the guide he wrote.

Login ID can be..

AUTHENTICATION AUTHORIZED GROUPS
So if you don't want to run the risk fo all diff people login, maybe you want to limit it
you can do is there's this setting "Authentication Authorized Groups"
That seetting wil lallow you to set which groups can submit permit requests.

You can totally log in as a department
under permits you get a new button called "Request Parking Permits"

What gives you these new buttons?  Maybe setting up that custom field

If they're charging back to the department you can get like so many free permits, you can set maximum allowed per user
Go through the workflow? set the higher for a bit so you don't get stopped

## Request Workflow

This is when you log in as a department you can configure

Requested By - Even though he went in through the dept siche was in the admin console
Yeah so how do you get department users to log in?

The facilitie are set by what is on the permit control group. This is TPP

Except: end users have to create an account. The department could not just send them a PDF
of the permit.
Our system is still superior.
The department COULD buy the permits themselves, just keep logging in as themselves. Like,
set "max amount allowed per user" as the whole amount and then once they're approved, log in
as themselves and buy those permits.

Field Definitions:
  Requested By
    I think you can see the authorized users for your department? Not sure how you determine that.
  Account Code
    If there's anything in this field, the end user will not get charged. Instead it'll report back 
    all the info somewhere. You can take this field away or require it.
  Quantity Requested
    License plate required: Required for sale.
  No custom fields you can add


## Approval Workflow

- You cannot deny a request. It'll stay there until the "needed by" date is there.
- If you hit approve it doesn't do it automatically, you can make some modifications.
- If another facility is open you can switch the facility
- They'll get a notification, it triggers an email to the requestor with a link in it that they send that link to the guests.

The report uses a table specific to web permit requests

## Purchase Workflow

They click on the link
you can select the permit and the quantity
you click that you read and approve (terms & conditions)
You hav to select the permit
permit effective date is there but there's no expiration. It's SET AT POINT OF SALE.??? It's picked by the customer.
Of course, I think he set up that the expiration date was set at point of sale, so we don't have to do it that way.

Then they can print their permits.

## Case Study: The Department is paying for the permits, not the guests.
## Tips & Tricks
