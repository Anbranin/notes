LOOK INTO THIS MORE
# Document the Process
Eases office turnover
training purposes
prevents scrambling next year
provides proven success
notes and comments
screenshots
leave it better than you found it
easy to update
# Checklist
Prior planning prevents piss poor performance
Use your resources - T2U, T2 Community & Flex online help
1. Configuration -< Permit number ranges -> Permit control groups -> `is_renewable` checked

2. Permit Control groups -> Fees -> Renewal schedules -> Add new renewal schedule

# extend Expiration Date
This is more for virtual permits, at least that's how people use it
You gonna hve to select term type, lenght, fee amount, length
Automatically Renew in Batch (once you set your task up)
- Renewal period starts
- Grace period for payment
- Disable online renewals after grace period
Refund schedule
Round Refunds
Save
# Replace with a new permit
Pick next year's control group
renewal type: replace with new permit

Renewal period pick the start for renewals.. if the permits expire in august, pick maybe 30 days before
Renewal Period Starts: Opens the window for renewals. What's the first day we'll allow you to renew your permit?

The replace permit field, you pick the days before the expiry that the new permit will take effect

The confirmation required by permit holder means that they have to log into Flexport to confirm that they received the permit. They're still paying for it.. the confirmation
is like, "yeah I confirm that I've recieved the permit"

You NEED to use a payment plan
Replacement control group
renewal period sarts
replace permit
confirmation required if you want,
save
2 tasks required,
- permit auto renewal
- permit renewal replacement

So this would be for employees, not for students
For enforcement, the plates would have to be linked, the expiration date is not on the permit. 
They have to (the customer) has to update their vehicles

# Permit renewal tasks
Permit Control Groups
Customer Subclass - which subclass do you want to do 
Cash drawer - they have a drawer that only has renewals
you could send a letter
address type?
letter template - you have a template and you switch a couple things each year, 2019-2020 for example
## Permit Auto Renewal
Permit Auto Renewal Task
Both Renewal Types, used with
Configuration
Task Scheduler

## Permit Renewal Replacement Task

Replace with New Permit Renewal Type
Done AFTER the permit auto renewal task
Configuration
Task Scheduler

Permit Control Groups
Shipping
Mailing address
Cash drawer
Disable sales limit checks - make sure this is checked - this is like.. a sales limit. it's for facilities - lot overflow?

# Illinois tech case study

Permit Renewal - opt-out, automatic opt-in
Replace with new permit
Permit number ranges
control groups
sub-classifications - to opt-out they get a subclassification change to non-renewable permit. 
  This is based on subclass. everyone in a given subclass is renewed.
  some people deactivate the permits?

payroll deduction

# Caution
Do auto renewals for each type of person ONE at a time
Task order - Auto & Replacement
The tasks will do what you tell them to
Take your time
# questions

# FLEX STEPS
Configuring auto renewals is  in flex online help too
Permit Renewal Configuration OVerview - just read it like a book

Define scheduled task
task name renew
description renew, name whatever you want
Choose renewal Type - with "Extend expiration date" 
Pick the permit control group you want to extend.
Pick your subclassification
Pick your cash drawer
Address types, send letter, campus email, letter template

Once they're auto renewed and like set on the permits this renewal replacement kicks out and sends the permits.
So this one tells WW&L to send the permits out they've been assigned, set up properly, this one is sending
Replace Permits
it assigns them so Judy from WW&L can send them
control groups
shipping method you pick
top priority active address
no permit control groups to pick
cash drawer you pick the renewal ones, if you want makes it easier
disable sale limit checks - that's like if your garage has 200 and your expiration dates overlap slightly of the old permits you want to disable it
pick your payroll deduction
need a payment plan for this to work
payment plan time period - they do biweekly skip third? so if you get paid if 2 eeks then like some months you get 3 checks so skip third? dunno
