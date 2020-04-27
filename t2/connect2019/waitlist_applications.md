# Waitlist Applications
- deadline weeks before quarer
set up much easier
awarding almsot roo easy
waitlist description - when you want it to open/ close
not sure what this is
I wasn't payin gattention

Who's eligible - customer subclassifications
proprity is an integer field
award right to purhcase is just click of button to priority

old process:
students log in with MFA
students prioritize lot selection
apply for exceptions, permits
IT hours

# Commute coordinators
Responsible for manaing parking needs for individual departments
Every department has a commute coordinator - voted on by department
It used to be done by paper - they would fill out a form and mail it in
the coordinator responsibilities - fill out appropriate paper work for customer
email transportation services for all space needed
external application fr ferifying active permit holders

We won't use anything like this.


# E-permits and Special Permits

Special permits required additional paperwork to be turned in. They ave additional privlege or discounted rates.
Carpool Permits, Transit Permits, etc. These are special permits.
Any errors on the application means that the customer has to come back in.
How are we gonna move this into the e-permit Thing?

The three permits are X-permits, Clean Fuel Permits, and Carpool Permits - this is at UCLA. 

So what we wndid and is a pspecial Permit Request. Flexport there's a button that they click to get a special permit.
You have it filtered by sublcass - staff &student see different things. So they click the button, and then you have the requirements, they choose the reason fr the request,
they have all the things they can request, they submit it and attach additonal documentation. 

Customer is able to submit a special permit request online, they can include attachments

request is reviewed and an email with approval/denial is sent to customer through Flex
- email templates
if approved a custom field on customer record is checked

  the custom field needs to match on the customer record and on the permit control group exactl
  permit control group must be set to custom field controlled.
  So they make a custom field.. these are all boolean custom fields. So for each special permit type you have, so for example,

  you hae "capool permit eligible." on the.

  Setting up custom fields: add custom field, use entity & permission control group
  field anme and data type should be the same on both stables
  lookip values will be set up in lookup table management

  you only allow them to be approved for a wek - this isn't a sellig thing it's just an approval thing. And then they go in and purchase it.

Special circumstances? 
