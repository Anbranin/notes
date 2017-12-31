### Requirements to Implement
- Separate installer for barcode and dll on Flex application server (do we already have this?)
- Crystal Reports installed on the local machine to produce encoding station reports/validations
(do we need this if we have the web queries?)
- QR font to produce the barcode (can do)
- Barcode readers at each entrance/exit lane (yep)
- eBusiness solution is required for paperless validations (IS IT THOUGH)

### Features of paperless validations
- allows you to assign privileges to your merchants who can then give discounts
- each individual user would have their own username and password so that usage can be tracked
FALSE - we will store and track the spire numbers of each user
- Administers of a Third Party could add and grant privileges to their own users 
WE COULD DO THIS
- validations can be prepaid or invoiced
- No validation ticket to hand out
- configurable discounts
- editable validation discount amounts
- reporting 

### Coupons
- can be made available through websites, flyers
- issued at encoding station if you want
- barcoded or non
- barcoded coupons can be scanned at pay-in-lane, pay-on-foot, APS machines, and CC entry/exit

## Configuration
1. Configuration -> System settings -> Validations
  Default payment method: "Third Party"
  Exit device offline threshhold: Determines whether or not validations can 
  happen when the device is online
2. Configuration -> User Management
  Your user is "Web Services" User, because it is making a call to an external system.
  Your web services user must have "Validation Provider web Services (Rights to the validation provider management)"
  The other thing you want to give them rights to is to pay the invoice
  Those are the only two things that user needs in order to make this work.
  Your regular Flex user--there's only one thing, the person that's going to configure
  the validation providers - Does have to have the privilege under Third Party: "Validation Provider Management"
