# T2 Flex Financial concepts
Did you know there's a credit card transactions table?
FIT amount
# How the FINANCIAL_TRANSACTION table ties to other tables
Unique to a lot of tables to flex - it can join to many other tables
take payments on citations, appeals, lots of things that deal with money within flex
instead of building separate tables we just put it all in one place
so when you join you have to do it in a couple ways
JOIN from ENTITY straight to citation for example
financial transaction talbe FIT_SOURCE_OBJ_UID that is saying the sourece object of the financial transaction
we reuse UIDS across tables (WHAT THE FUCK?)
If you have a permit UID 2000 there could be a citation with that UID too
you need TAB_UID_SOURCE_OBJ_TYPE - what's the table ID of the source object
common ones: entity 1, permit: 10, contravention: 13, a lot of those are listed in teh application
if you get into it you can get a table in flex to query you can get all the table ids CONFIG_TABLE is the table that lists all the table ids
  why use UIDS if they're not unique
All permit data:
FINANCIAL_TRANSACTION FIT_SOURCE_OBJ = PER_UID TAB_UID_SOURCE_OBJ_TYPE = 10
only return transactions where type is a permit
The other thing
FTL_UID_TRANS_TYPE is a transaction type. A unique ident for what kind of transaction it is. permit charge? payment? permit renewal? permit deposit?  you need to be specific.
I do this already
every time anything happens from a financial perspective a new record gets inserted to the financial trans table. partial payments, etc, rest of payments
possible if you have a permit that renews monthly there's like a big table for each permit so you gotta look at date filters too if you need

# The financial Transaction "thread"
That is what tells us how transactions go together
Financial transaction history on an object - thread ties it together. Charge for permit, payment for permit, field that is called "FIT_UID_PAID_ADJ_REV_ITEM" payment adjstment reversal etc
that will link back to that original transaction. Charges and late fees can be broken up. Like if you have one payment for 40 bucks it can be split up in different transactions because of how
it gets applied! You can have multiple threads per object. If you have fees/partials/ might have payment that pays this one not that one etc... on different threads. 

# Taxes
I hate taxes in Flex. Reaon: calculate taxes at receipt level not item level. So set up flex choose tax when you go to take a pmt, look at all in basket, decide if iaxable, add up amount of all
taxable items, then multiply that by the taxable amunt you've set up in your system settings.
So if you need tax on individual items it makes it really hard because taxes aren't calculated per individual item.
Financial export: you have to calculate the tax for that? but there's rounding and stuff that makes it shitty

# Account Credits
Any time something is deposited into a customer account. Entity account balance and customer balance view - the account balnace is actually the account credit. Refunds? Anyhting you refund
goes into the account credit first and you can pay that out and do it however you want - you can set it up to pay citation balances, permit balances. (like paypal credit) One school
had someone that said I know I'm going to break the rules.. here's 500 bucks to use for citations

# Entity Fees
They're hard to track it makes it difficult to get a good handle other than just looking at the table. If you do anything with customer fees you can't do it with receipts

# Sale Items
Sale items? also special. Those don't use the FIT_SOURCE_OBJ_TYPE there's misc source linked to those. 

```
SELECT * FROM FINANCIAL_TRANSACTIONS WHERE SOMETHING_UID_MISC_ITEM IS NOT NULL
```

# General LEdger Accounts
Track the GLS on third party payment method so nto tracking at cash flow level
deduction - GL for revenue tracking goes against the fake pmnt method
when pmnt plan comes due don't get GL info
so if you care about tracking revenue from a cash flow perspective... it's complex
do you do revenue based on sale and not cash based it's simpler

# Tips

# Examples:

Let's see everything:

```
SELECT * FROM FINANCIAL_TRANSACTION FIT
WHERE FIT.FIT_SOURCE_OBJ_UID = '12345'
/* see all the fields to start with and break them down later */
AND FIT_TAB_UID_SOURCE_OBJ_TYPE = 10
```

YOU REALLY NEED SQL DEVELOPER

Fields:
RECEIPT_UID: attaches to payment record, not initial charge. receipts are only attached to payments.
AMOUNT_TENDERED: is like, if they gave us 20 bucks it would be 20. we might give them cash bsack and that's a different field.

You can link financial transaction table to itself to find reversals
Reversal is basically just undoing what you did, puts amount back ont he object it was on
a credit would go on a customer account

financial transaction uids  a charge would not link back to itself, a payment would link back to itself...?

another thing: payments are always shown as negative values. We're looking at it as receivables. a charge brings receivable up, a payment brings it down. Accounts Receivable.

So selecting only a payment it's transaction type. 

Ask this guy how to get database credentials, get his card. Josh Allanson.

Case statement???? How do you do that in SQL? He's talkin about that.
If you're doingahything from parcs or flexport with a credit card receipt the reference number goes in there
office that's where te casher can type in a note for reference field, check #? whatever. reversal whatever put a note
REFERENCE
other items?
GL account gets stored there as well
now on view
view pulls in extra stuff mastercard
FIT_RECEIPT_VIEW
the receipt is where ou want to start with most reports.. if you don't care about itemizing you can stick with RECEIPT.
not view.

They wrote a custom view to handle shit so if you have something that's super wacky just call T2 they'll figure out a way to help you
