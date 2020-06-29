# Chapter 1
## Basics
The `primary_key` is a column that uniquely identifies a row in the table
There is a distinction between 'natural' and 'surrogate' keys: A primary key
of `first_name/last_name` is an example of a 'natural' key. It is a poor choice
for tracking users, since names can change. The surrogate key of ID is better.
  QUESTION: is `spire_id` a natural key, since it's an attr of user?

"SQL" is not an acronym for anything. In 1970 Dr. E. F. Codd's research lab
published a paper titled "A Relational Model for Large Shared Data Banks".
Within he proposed a language called DSL/Alpha for manipulating the data
within relational tables. A group at IBM built a prototype based on his ideas:
A simplified version of DSL/Alpha they called Square. Further refinements to
Square led to Sequel, which was shortened to SQL.

The result of an SQL query is called a _result set_ and tis, in itself, a table.

All database elements created via SQL schema statements are stored in a
special set of tables called the data dictionary
  QUESTION what is a data dictionary (answered, probably, in chapter 15)
  - allows querying column names dynamically in reports, for example.

## SQL: A non-procedural language

What does this mean?
In a procedural language you define the results you want _and_ the mechanism
that obtains the results.
For example, in Ruby, you define your variables, data structures, methods -- the
exact way you want your data to be returned. Every symbol is followed by the 
compiler to the letter.
In a non-procedural language, you state the results you want, but the procedure
is up to an external agent.
Which external agent? Enter _the optimizer_. The optimizer is a part of your 
database engine. It looks at your code and determines the most efficient (well,
almost always the most efficient) way to execute your statement given your table
structure and indices.
You can influence the optimizer by giving it _optimizer hints_ which most people
do not do.
Because SQL is non-procedural, you cannot write with it complete applications.
  QUESTION: Is SQL turing-complete?
You need to integrate it with your favorite programming language to do so.
Oracle has done this for you with PL/SQL and there are others.

## Terms
Select, Where, and From are _clauses_
/* your comment goes here */ is a comment for most SQL implementations

## built-in functions
`now()`

## missing FROM clauses
Some database servers won't let you run any queries without at least one FROM clause that names at least one table.
True for Oracle. For cases where you need to call a function like `now()`, `SELECT now();` would work in mysql but
we need a FROM in Oracle so we can use their dummy table called "dual" which contains a single column called "dummy".
> SELECT now() FROM dual;

## Data Types
### Character data
char can be fixed or variable length strings. Fixed: right-padded with spaces & always consume the same number of bytes, variable: not that.
When defining a char column you must specify the max size of the string stored within. Example:
```
char(20) /* fixed-length, max length 255 bytes */
varchar(20) /* variable-length, max length 65,535 bytes */
```
  QUESTION: _why_ might you use char vs varchar? 
  ANSWER: You would use char for fixed-length strings like state abbreviations, and varchars for variable-length strings like names
  EXCEPTION: oracle users should use `varchar2` type to define variable length characters
Character Sets:
A single byte can store letters in the Latin alphabet. Japanese and Korean etc contain large numbers of chars, requiring multiple bytes. Known as _multibyte character sets_
MySQL can store data using various character sets. To view the supported sets use the show command:

> `SHOW CHARACTER SET`

Shows a table of character sets. Column Maxlen indicates how many bytes it needs.
Fun fact: You can use a different character set for each char column in your db if you want, even different sets in the same table.
Just choose different than the default when defining a column:
```
varchar(20) character set swe7
```
or define the default set for your whole database:
```
create database european_sales character set latin1
```
If you're dealing with multiple or unfamiliar character sets there's definitely a book on it by Jukka Korpela.

### Text Data Types
For data that might exceed the 64 KB limit of varchar columns

Available text types and their max sizes: 

tinytext 255

text 65,535

mediumtext 16,777,215

longtext 4,294,967,295

When choosing, be aware:
- If the data exceeds the maximum size and you try to save it, the data will be truncated
- trailing spaces are not auto-removed
- when sorting or grouping by data from text columns, only the first 1,024 bytes are used (unless you manually increase it)
- These text types are unique to MySQL. SQL Server has a single `text` type, Oracle and DB2 have `clob` (Character Large Object)
- Since varchar allows 65,535 bytes (it used to only allow 255) there's no reason to use the tinytext or text type.
  If you're storing free-form data entry like a notes column, varchar will probably be find. If you're storing whole documents use mediumtext or longtext.

*Note*: Oracle allows up to 2k bytes for char columns and 4k bytes for varchar2. Larger docs use clob. SQL Server can handle up to 8k for both char and varchar, but you can store
up to 2GB of data in a column defined as varchar(max).

### Numeric Data Types

numeric data types are used in several ways, for example, as:
- booleans (0 for false, 1 for true)
- a primary key
- a count of something
- high precision data (needing decimal points)

To handle this we have several different numeric data types. Integer is most common.
When specifying you can also specify that it is _unsigned_, and that means it will be greater than or equal to zero.

#### Integer Data Types

type, signed range, unsigned range
---
tinyint, -128 to 127, 0 to 255
smallint, −32,768 to 32,767, 0 to 65,535
mediumint, −8,388,608 to 8,388,607, 0 to 16,777,215
int, −2,147,483,648 to 2,147,483,647, 0 to 4,294,967,295
bigint, −2^63 to 2^63 - 1, 0 to 2^64 - 1

When you create a column using one of the int types, appropriate space will be allocated to store the data.
try to choose the type big enough to accomodate what you need without wasting space.

#### Floating Point Types

type, numeric range
float( p , s )  −3.402823466E+38 to −1.175494351E-38 and 1.175494351E-38 to 3.402823466E+38

double( p , s ) −1.7976931348623157E+308 to −2.2250738585072014E-308 and 2.2250738585072014E-308 to 1.7976931348623157E+308

When using floating-point you can specify:
 _precision_
 - total number of allowable digits to the left and right of the decimal point
 _scale_
 - number of allowable digits to the right of the decimal point
 If you try to store data with a number of digits exceeding the allowable digits, your data will be rounded.
 For example, a column designed as `float(4,2)` will store a total of 4 digits, with a maximum of 2 to the right of the decimal point.
 So 26.44 and 5.60 will store fine, but 17.8949 would be stored as 17.89, and trying to store 127.33394 would generate an error.
 you can designate floating-point columns as unsigned, but that will not, as with integers, alter the ranges that can be stored,
 rather it will prevent negative numbers from saving.

#### Temporal Data Types

Information about dates and times. Date, date time, a year, or elapsed time can all be stored.
Type, Default format, Allowable values
------
date, YYYY-MM-DD, 1000-01-01 to 9999-12-31
datetime, YYYY-MM-DD HH:MI:SS, 1000-01-01 00:00:00.000000 to 9999-12-31 23:59:59.999999
timestamp, YYYY-MM-DD HH:MI:SS, 1970-01-01 00:00:00.000000 to 2038-01-18 22:14:07.999999
year, YYYY, 1901 to 2155
time, HHH:MI:SS, −838:59:59.000000 to 838:59:59.000000

Database servers store temporal data in various ways. the format string (Default format above) shows how it will be represented when retrieved,
or constructed when inserting or updating. Like if you want to update a year you should use the string "2005",
or if you want to update the date February 22, 1985 into a date you would use the string "1985-02-22".
The types `datetime`,`timestamp`, and `time` types allow fractional seconds up to 6 decimal places (microseconds). Supply a value from 0 to 6 when defining columns. For example
`datetime(2)` allows your time values to include hundredths of a second.

Each database server allows different ranges. Oracle accepts 4712BC to 9999AD, SQL Server accepts 1753AD to 9999AD (although SQL Server's `datetime2` data type allows from 1AD to 9999AD).
MySQL can store 1000AD to 9999AD. Keep this in mind for storing historical dates.

*Date format components*
Component, Definition, Range
---
YYYY, year including century, 1000 to 9999
MM, Month, 01 to 12
DD, Day, 01 to 31
HH, Hour, 00 to 23
HHH, Hours (elapsed), -838 to 838
MI, Minute, 00 to 59
SS, Second, 00 to 59

fun fact: You can use a simple `time` column to track how long something takes. Also, if there is such a thing as a time column, why can't we use it in uh...

### Table Creation

Step 1: Design
Decide what types of info you want to track. What columns do you need, and what are their data types?

First Name: varchar(40)
Last Name: varchar(40)
Birthdate: date
Age: integer
Address: varchar(40)
favorite_foods: varchar(100)

Step 2: Refinement
We find problems with our implementation.
 For example address should be broken up into different fields like
Postal Code, country, city, state
we also forgot our primary key.
id: smallint (unsigned)
and how about, since a person storing favorite foods in just one field is weird, we make another table of favorite_foods?

person_id: smallint
food: varchar(20)

To totally _normalize_ this implementation we would make people choose their favorite food from a list, rather than creating a new entry every time. After all,
what if one person puts "pasta" and another adds "spaghetti?" Are they the same thing?
We may want to just have it be totally flexible though, we don't need to normalize everything.

