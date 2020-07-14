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

- Design your table.
What kind of information do you need to track? Which columns, what are their data types?
- Refine your ideas.
What are some problems with your implementation? Imagine your table's use. Are there any implementations which could be normalized?
For example, for eye color, do you want people to enter their own eye color with a `varchar(20)` field? Or do you want to create a
join table with `person_id: SMALLINT, color: VARCHAR(20)`? The benefits of _normalization_ in this case are that you wouldn't have both
"blue" and "cerulean", so if you ever needed to sort or query based on the data it would be easier. However it makes for a poorer user experience
occasionally.
- Build the schema

```
CREATE TABLE person
(id SMALLINT UNSIGNED,
first_name VARCHAR(30),
last_name VARCHAR(30),
CONSTRAINT pk_person PRIMARY KEY (id));
```
When creating a table youneed to tell the database server which column will be used as a primary key.
you do this by creating a CONSTRAINT and naming that constraint `pk_tablename` There are other types of constraints. 
Another type of constraint is called a `CHECK` constraint. It lists allowable values for your field. If we wanted to
only allow people to choose certain favorite colors:
```
favorite_color VARCHAR(10) CHECK (favorite_color In ('purple','pink'))
```
the MySQL allows you to do a check constraint but will not enforce it, unlike other servers. But we can use `enum` to get around this:
```
favorite_color ENUM('purple', 'pink')
```
So we don't use a constraint for this. The enum will function as one.
- View your new table
describe person; (or desc person)
six colums are shown in the describe output. `Field`, `Type` mean what you'd think.
`Null` is whether or not a column can be null. `Key` is whether a column is a part of any keys, foreign or primary.
`Default` is whether a column has a default value (automatically saved when you update unless another value is specified).
`Extra` is anything else that might apply to your column.
_note_: The reason you need null columns is self-explanatory, but when you have a null column, you may say that it _is_ null, not that it _equals_ null. A fine but important distinction.
- Create a related table:
```
CREATE TABLE favorite_food
(person_id SMALLINT UNSIGNED,
food VARCHAR(20),
CONSTRAINT pk_favorite_food PRIMARY KEY (person_id, food),
CONSTRAINT fk_fav_food_person_id FOREIGN KEY (person_id)
REFERENCES person (id));
```
Things to note: 
- To guarantee uniqueness of the table, you must use two keys, since a person can have more than one favorite food (so there will be more than one row with the same person's ID),
- a foreign key constraint can only allow values in the person_id column that correspond to values in the ID table of person. That is, if there isn't a person with an ID of 100, you cannot have
that as a value in your new table. If you forget to add this constraint, you can add it later with `ALTER TABLE`

### Table Modification
#### INSERT
Before inserting data into any table we need to discuss how to generate a value for a numeric primary key. Pick a number out of thin air? Terrible. Choose one based on the last value? Still bad--
what if another person is running an insert statement at the same time? Rather, all database servers provide a method for generating primary keys. For Oracle, a separate schema object called
a _sequence_ is used. In MySQL, just turn on the _auto-increment_ feature. Normally you'd do it at creation, but if you forgot that's cool, we need to learn about altering tables anyway.
`ALTER TABLE person MODIFY id SMALLINT UNSIGNED AUTO_INCREMENT`
Of course, because we have a foreign key constraint with favorite_foods, we cannot alter the primary key! We get this error:
> ERROR 1833 (HY000): Cannot change column 'id': used in a foreign key constraint 'fk_fav_food_person_id' of table 'sakila.favorite_food'
So what do we do? Well. First, lock the tables for writing so you don't have any data integrity problems:
`LOCK TABLES favorite_food WRITE, person WRITE;`
Then, drop the foreign key constraint so you can modify it:
`ALTER TABLE favorite_food DROP FOREIGN KEY fk_fav_food_person_id, MODIFY person_id SMALLINT UNSIGNED;`
Then you can modify your table. Then add the foreign key back in:
`ALTER TABLE favorite_food ADD CONSTRAINT fk_fav_food_person_id FOREIGN KEY (person_id) REFERENCES person (id);`
As for unlocking the tables, you can do so manually, or the locks will time out. During the lock, only your database connection can insert update or delete, all other users are locked out.
Now, you'll see _auto-increment_ under *Extra* if you describe the table!
When inserting data, insert either null for the ID or don't insert anything at all.
Now we can add data:
```
INSERT INTO person (first_name, last_name) VALUES ('Michael', 'Burnham')
```
Breaking it down:
`INSERT INTO table_name (column1, column1) VALUES (value-for-column1, value-for-column2)`
The columns and values must correspond in number and type. Dates need to be a string, but as long as they're in the corect format they'll get turned into dates.
```
INSERT INTO person (first_name, birth_date) VALUES ('Spock', '2230-01-06');
INSERT INTO favorite_food (person_id, food) VALUES (1, 'LSD');
INSERT INTO favorite_food (person_id, food) VALUES (1, 'Psilocybin')
SELECT food FROM favorite_food WHERE person_id = 1 ORDER BY food
```
Look how we ordered that data. Without the order by clause, the data may be
in a particular order.. or it may not be.

#### XML Data
Most database servers provide a way to get XML data from your query. With MySQL, just use the `--xml` option when starting the MySQL command line tool:

> mysql -u root --xml
```
mysql> select * from favorite_food;
<?xml version="1.0"?>

<resultset statement="select * from favorite_food;" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <row>
  <field name="person_id">1</field>
  <field name="food">LSD</field>
  </row>

  <row>
  <field name="person_id">1</field>
  <field name="food">Psilocybin</field>
  </row>

  <row>
  <field name="person_id">2</field>
  <field name="food">bananas</field>
  </row>
</resultset>
```
Isn't that cool?
With SQL server, instead of configuring your command line tool you can use a flag:
`SELECT * FROM favorite_food FOR XML AUTO, ELEMENTS`

#### UPDATE
```
UPDATE person SET street = '225 Baker Street', city = 'London' WHERE person_id = 1;
```
Of course, you can put anything you want in the WHERE clause, updating any number of rows.
 QUESTION: How to update all rows ANSWER leave off your WHERE clause altogether.
The response of the server tells you how many rows were updated.

#### Common Mistakes
- Nonunique primary key
The answer here is simple--don't try to bypass the auto-increment function.
- Nonexistent foreign key
If there's a foreign key constraint, also don't try to bypass it. If you want to create a child row that references a parent, you must have a parent first.
_note_: foreign key constraints are only enforced if your tables are created using the InnoDB storage engine.
- Column value violations
If you try to set a value that can't be set in a column you'll get various errors depending on what you try to do. For example since we have our favorite_color restricted to 
pink and purple with an enum, if we try to set it to blue we'll get `ERROR 1265 (01000): Data truncated for column 'favorite_color' at row 1`
- invalid date conversions
If you don't give mysql the date format it's expecting, you'll get an `Incorrect date value: 'DEC-21-1985'` for example. That's not the right format.
However you don't need to rely on the default format; you can tell MySQL exactly what format you're using.
```
UPDATE person SET birth_date = str_to-date('DEC-21-1985', '%b-%d-%Y') WHERE id = 1;
```
Here are some other date format types you'll need:
```
%a The short weekday name, such as Sun, Mon, ...
%b The short month name, such as Jan, Feb, ...
%c The numeric month (0..12)
%d The numeric day of the month (00..31)
%f The number of microseconds (000000..999999)
%H The hour of the day, in 24-hour format (00..23)
%h The hour of the day, in 12-hour format (01..12)
%i The minutes within the hour (00..59)
%j The day of year (001..366)
%M The full month name (January..December)
%m The numeric month
%p AM or PM
%s The number of seconds (00..59)
%W The full weekday name (Sunday..Saturday)
%w The numeric day of the week (0=Sunday..6=Saturday)
%Y The four-digit year
```
# Chapter 2
## Query Mechanics
How are queries actually executed by database servers?
- A connection is made
You log into the server, in this case using the mysql command line tool. Having provided a username & password, once mysql verifies that that is correct,
 a _database connection_ is generated for you to use. This connection is held by the application that requested it, until release (quitting, server shutdown)
 Each connection is assigned an identifier. When I logged in just now: 
> Your MySQL connection id is 327
How is the connection ID useful? well, it could be useful to your database admin if a malformed query runs for hours or something.
Once a connection is made you can execute queries.
- A query is made, and these checks are done:
  - Do you have permission to execute this statement?
  - Do you have permission to access the desired data?
  - Is your statement syntax correct?
If your statement passes these checks, your query is handed to the _query optimizer_
 that determines the most efficient way to execute your query. It will look at things like indices,
 join ordering, and then picks an _execution plan_.
*NOTE*: (For more about optimizers, read Baron Schwartz's "High Performance MySQL" on O'Reilly.)
- A _result set_ is returned to the calling application (in our case the mysql tool)
A result set is just another table containing rows and columns, remember.
A query that returns nothing will merely return *Empty set* (0.02 sec)
A query that returns results will be formatted by the mysql tool into a table with column headers and boxes constructed around the results to make it readable
by using the `+ | -` characters.
After the last row of data mysql will tell you how long that took and how many rows were returned.
