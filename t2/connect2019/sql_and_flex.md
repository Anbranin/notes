# What is SQL?

Structured Query Language. We use PL/SQL.

## QUESTION 
I thought you used Oracle?
PL/SQL is Oracle Corporation's procedural extension for SQL and the oracle relational database.

# When do I use it?
To get stuff from the database.

# How do I use it?
Oracle SQL Developer
The way to log in is you hit connections
connection name
username
password
What is the connection name?
Hostname
what's necessary is a customer VPN - the hostname
if it's staging you'll orastaging-SID if you don't know your SID reach out to your account manager
  orastaging-<your SID>.t2hosted.com
PORT - SID. How do I set that up.

Connection name I guess I can ask.

# Basic qeury writing
You'll have a select in every one of your queries.

format:
SELECT fields FROM table.
`SELECT * FROM ENTITY`
So we get every single field in this table
If you want specific fields

`SELECT ENT_UID, ENT_FIRST_NAME FROM ENTITY;`

The field right before your FROM should not have a comma in front of it.

## Concatenation
```
SELECT
ENT_UID,
ENT_FIRST_NAME,
ENT_LAST_NAME,
ENT_FIRST_NAME || '' || ENT_LAST_NAME
FROM ENTITY
;
```

## Filtering results
```
SELECT
ENT_UID,
FROM ENTITY
WHERE ENT_LAST_NAME IS NOT NULL
```

## Combining Filters

```
SELECT
ENT_UID,
FROM ENTITY
WHERE ENT_LAST_NAME IS NOT NULL
AND ENT_FIRST_NAME IS NOT NULL
```

## Join tables
```
SELECT ENT.ENT_UID, ENT.ENT_FIRST_NAME, COE.COE_EMAIL_ADDRESS
FROM ENTITY ENT /* Note the aliasing */
INNER JOIN COR_EMAIL COE
ON ENT.COE_UID_HGHST_RNKED_EMAIL_CAC = COE.COE_UID
;
```
The way that I use the logic ehind how to decide what the table alias is.. it can be anything but it's best to be consistent. So.. for example COR_EMAIL the UID from that table is how I,
and how anyone that writes SQL names them. So for example from COR_EMAIL the UID field name is COE_UID. So we'd name it COE. It's just convention.

So when you write a task you specify a query. So you're writing a customer letter where you want to pull back data on everyone that has a permit from a specific
permit number range:
```
SELECT
ENT.ENT_UID, ENT.COE_EUID_HGHST_RNKED_EMIL_CAC
FROM ENTITY ENT
INNER JOIN PER_ENT_REL PNR
ON ENT.ENT_UID = PNR,ENT_UID_ENTITY
INNER JOIN PERMISSION PER
ON PNR.PER_UID_PERMISSION = PER.PER_UID
INNER JOIN PERMISSION_NUMBER_RANGE  PNA
ON PER.PNA_UID_PER_NUM_RANGE = PNA.PNA_UID
WHERE  PNA.PNA_SERIES_RPREVIX LIKE '19'
```
He's referencieng the series prefix. If you had a series prefix like 19A or 19B and you wanted both, hou could use a wildcard like
WHERE  PNA.PNA_SERIES_RPREVIX LIKE '19%' <-- the % is for any number of characters, a _ (underscore) is for just one.

## Aggregate Functions
If you're calling an aggregate function you have to group by something.
```
SELECT
PNA.PNA_SHORT_DESCRIPTION "Permit Number Range", /* YOu don't need the duoble quotes if you do PNA.PNA_SHORT_DESCRIPTION AS Permit Number Range */
COUNT(PER.PER_UID) "Sold Count"
FROM PERMISSION PER
INNER JOIN PERMISSION_NUMBRE_RANGE PNA
ON PER.PNA_UID_PER_NUM_RANGE = PNA.PNA_UID
Where PER.PER_SPLD_DATE iS NTO NULL
AND PNA.PNA_IS_IN_USE= 1
GROUP BY PNA>PNA_SHORT_DESCRIPTION
;
```
he did name the field. In the query manager you can't name the fields. Could be useful for export tasks.

## Grouping by 2 things
```
SELECT
PNA.PNA_SERIES_PRECIfix,
PNA.PNA_SHORT_DESCRIPTION "Permit Number Range", /* YOu don't need the duoble quotes if you do PNA.PNA_SHORT_DESCRIPTION AS Permit Number Range */
COUNT(PER.PER_UID) "Sold Count"
FROM PERMISSION PER
INNER JOIN PERMISSION_NUMBRE_RANGE PNA
ON PER.PNA_UID_PER_NUM_RANGE = PNA.PNA_UID
Where PER.PER_SPLD_DATE iS NTO NULL
AND PNA.PNA_IS_IN_USE= 1
GROUP BY PNA>PNA_SHORT_DESCRIPTION, PNA.PNA_SERIES_PREFIX
;
```
## Regular Expressions
You can look this up, it's a function.

## Functions

### TRUNCATE
```
SELECT
PER_UID,
PER_NUMBER,
PER_SOLD_DATE
FROM PERMISSION PER
WHERE TRUNC(PER_SOLD_DATE) = '09-JAN-2018'
```

### TO CHAR
```
SELECT
TO_CHAR(CON.CON_ISSUE_DATE, 'yyyy') 'Year',
SUM(CON_CON_AMOUNT_DUE_CAC) "Amount Outstanding"
FROM CONTRAVENTION CON
WHERE CON.OCN_ISSUE_DATE BETWEEN '01-JAN-2012' AND '01-MAY-2019'
AND CON.CON_IS_UNDER_APPEAL_CA 0
GROUP BY TO_CHAR(CON.CON_ISSUE_DATE, 'yyyy')
ORDER BY TO_CHAR(CON.CON_ISSUE_DATE, 'yyyy')
```

## Static values in select statement
Same field every time but has to have that in there? like an export file
```
SELECT ENT_UID, 'STAFF' FROM ENTITY WHERE ESL_UID_SUBCLSAS = 2011
```

Truncating datetime values
using field identifiers

w3school
