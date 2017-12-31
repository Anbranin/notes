### OPTION 1: CUSTOMER PAYS FLAT RATE

  Discount Type: Flat Fee: 6.50
  Validation Sell Type: On Use
  Sell Price: 0
  - Customer gets charged flat rate
  - Third Party pays nothing
  ( refund to Third Party )

  Behind the scenes:
    Third party uses 300 of these flat rate coupons
    Customers have paid 6.50 on each of them
    Remaining balance = total_fee - (6.50 * 300)
    VOID remaining balance based on connected event description

### OPTION 2: DEPARTMENT PAYS FLAT RATE

  Discount Type: Flat Fee of 0 or 100% discount
  Validation Sell Type: On Use
  Sell Price: 0
  - Customer gets charged 0
  - Third Party pays 6.50 * number of uses

  Behind the scenes:
    Third party uses 300 of these flat rate coupons
    Customers have paid 0
    Remaining balance = 300 * 6.50

### Questions for Shelly
  Will the above solution work?
  - Not yet, she's asking
  How do we credit a third party? Uploading a document to Flex?
  - Shelly tried it -- tried to import third party payments. No--
  will only import outstanding amnts. When the validations are used,
  No, she'll have to ask people if we can do it. We have to do it
  manually right now.. 
  Can we update validations through a batch updateer?
  - NO. Not available in batch updater.
  Does the web password expire for validation providers?
  - Ask later

### Meeting

The link between the day pass and transient ticket is contained within the
transient ticket.

### Meeting notes

Day Passes for the Cashier Station - 
  Cashier station issue day pass? In order to do that setting up permit nunber 
  range for cashier day pass - different from Hotel day Pass.
  Value is blank - max uses? So for the hotel workaround is put in the permit
  control group a default value of 100 uses or whatever so that the expiration 
  date will control it When a day pass is issued at the cashier station
   - standard functionality is 1 day - can set up options for different days
  CDP is new nunber range for cashier day pass
  Buttons for day passses are connected to Permit Control Group
  Central Cashier is the cashier station where Bill sits
  STATUS: Shelly is trying to get trainings out and done for the cashier station so
  we can distribute to the people that need it.
Monitoring System (monitoring page)
  QUESTION: How do we get to the occupancy page?
  QUESTION: How do we get to the monitoring page??? I didn't see what
  she clicked on.
  The calls from the intercoms will come into parking office. 
  Monitoring System shows all activity for upper garage - gate activities,
  credentials used, day passes issued, validations issued. As far as users:
  Who will be able to use the functionality in the monitoring system. Occupancy view/edit
  etc..  The people at this table - Jon Programmers Metin Anne Karin Greg..
  Make sure someone is checking it.. There is an email alert system - we could 
  use it to send texts too by just putting the email in as (413)545-0056@verizon.net
  or whatever.
