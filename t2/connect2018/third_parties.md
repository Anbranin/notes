# Third Parties 
## How do other people use third parties?
- for vendors, construction people so they can buy a permit because they're not in the system. That also allows it for their companies to have invoices
- Departments as billable customers - construction/vendors as well
- This is how we use it: Departments can purchase permits, validations

## What are third parties for?
- Billing. It's for people that aren't in the system as entities. The payment of their permits can sit under third party accounts.
- Departments will have 10 permits for their 15 vehicles, you can move them around. Power goes to the department.

## Overview and Use Cases

## Flex Walkthrough
### configuration
- Contact name, invoices amounts listed right there on the record. Third parties don't have the same attrs as entities. You do link the customer
to the third party records. You can do this by way of import to link them to the record. 
### third party as a payment method
- Customer will have to be linked to the third party to use that payment method.
### invoicing third party balances
- moving charges to a third party comes in the form of receipt. Invoice that the same way as validations, all count as receipts. Encoding station can be linked to that.
Third parties can go online and produce validations.
- print pending letters
- tasks. Scheduled tasks for invoices or whatever.
## Flexport
### Third party agents
- Login to t2hosted. Manage the parking account. Use Group Customers. I wonder how that works?

## PARCS
### Validation Providerse
### Contract Holders
## Reports and Reconciliation

HOW WE DO THINGS DIFFERENTLY:
- To use FlexPort, a single person needs a login and we don't have a single user for each department. We roll out our own solution with logins and use
- To use T2 invoicing for validations, the whole balance of the validation would need to be charged to someone. But T2 cannot handle these scenarios:
    - % charge to customer, free for the department
    - % charge to the department, free for the customer
    - flat rate to the department, the rest of the charge goes to no one
    - flat rate for the customer, the rest of the charge to no one
