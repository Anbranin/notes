# Basics
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
Information about dates and times.
Date, date time, a year, or elapsed time can all be stored.
Type, Default format, Allowable values
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
- a foreign key constraint can only allow values in the person_id column that correspond to values in the ID table of person. That is, if there isn't a person with an ID of 100, you cannot have The rest of the string is tossed away. We are, though, given a warning to let us know about this.
Note that if you want to convert a string to a date, time, or datetime, you have to use the default formats. `cast()` functions cannot accept format strings. If your string is not of the
correct format, you can just use `str_to_date()` or something.
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
UPDATE person SET birth_date = str_to_date('DEC-21-1985', '%b-%d-%Y') WHERE id = 1;
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
A query that returns results will be formatted by the mysql tool into a table with column headers and boxes constructed around the results to make it readable by using the `+ | -` characters.
After the last row of data mysql will tell you how long that took and how many rows were returned.
## Query Clauses
Several components (clauses) make up the SELECT statement. One is mandatory: `SELECT`, you usually use more:
*Query Clauses*
Clause name, Purpose
---
SELECT, which columns to include in the query's result set
FROM, which tables to draw information from, and how they are joined
WHERE, Which rows from the tables to draw information from (you can say that it filters out unwanted data)
GROUP BY, used to group rows together by common column values
HAVING, select which groups/filters out unwanted groups
ORDER BY, sorts the result set rows by one or more columns
### SELECT
The select clause is actually the last one evaluated by the query optimizer-if you think about it, before you can possibly know what will be returned, you must know from where your data will be drawn.
For example, `SELECT * FROM language;` means in English "show me all columns and rows in the language table".
You can explicitly name columns, like `SELECT language_id, name FROM language;` which means in English "show me the language and  name of all rows in language table"
So the JOB of the select clause is to determine which, of all possible columns, should be included in the query's result set.
fun fact: You don't have to just include columns in your result set. You can include other things like:
- Literals (numbers or strings)
- Expressions (like equations, such as transaction.amount * -1)
- Built-in function calls like ROUND
- User-defined function calls
Here is an example that uses all three:
```
SELECT language_id, 'COMMON' language_usage, language_id * 3.1415927 lang_pi_value, upper(name) language_name FROM language;
```
Note that if you only need to execute a built-in function or evaluate a simple expression you can skip the FROM clause, for example:
```
SELECT version(), user(), database();
```
Although I suspect that in Oracle you'd need to use the dummy table.
### Column Aliases
Labels of columns generated by result of expression are auto-generated.
To use your own, add a column alias after each element of SELECT clause.
`language_usage`, `lang_pi_value`, and `language_name` here are all column aliases.
```
SELECT language_id, 'COMMON' language_usage, language_id * 3.1415927 lang_pi_value, upper(name) language_name FROM language;
```
Column aliases make the output easier to read and interact with programmatically.
You can use the AS keyword if you want to make them stand out:
```
SELECT language_id, 'COMMON' AS language_usage, language_id * 3.1415927 AS lang_pi_value, upper(name) AS language_name FROM language;
```
### Removing Duplicates
As an example of possible duplicate data in our Sakila database, we have Actors, Films, and Film Actors--that is, actors who appear in films. If we wanted to get a list of all actors (just the IDS) that appear in a film, we could select them like so:
`SELECT actor_id FROM film_actor ORDER BY actor_id`
That would give us a long list of actor IDs for sure. But of course, actors can and do appear in multiple films! So our list will have duplicates. Since you aren't selecting the film_id and don't care to know anything about those films, you can unique the data like so:
`SELECT DISTINCT actor_id FROM film_actor ORDER BY actor_id`.
See how it's 200 rows instead of like five thousand? Please note also that these are only actors that have appeared in Films. If you just want a list of actors, just select * from the actors table...there will be no duplicates in that table because of primary keys.
Note that the opposite of DISTINCT is ALL. `SELECT ALL actor_id FROM film_actor` is what you could type if you were sure there were no duplicates... however, "ALL" is the default, and we never have to explicitly type it. Most of the time people do not. However if you like it, go right ahead.
Note also that generating a distinct set of results requires that the data be sorted--therefore it's better to only use it if you know you need to. Take the time to understand your data and whether duplicates are possible, don't just use it "just in case".
### The FROM clause
The FROM clause defines the tables where our data comes from. That includes how to link those tables together if there are more than one.
Think of the definition of a table though, there's more than one kind. Each of them can be used in a query's FROM clause.
- Permanent tables
created using the `create table` statement. these are stored in long term memory.
- Derived tables
A query contained within another query. Surrounded by parentheses and can be found invarious parts of a select statement, in the from clause
serves the role of generating a derived table that is visible from all other query clauses and can interact with other tables inamed in the from clause
For example:
```
SELECT concat(cust.last_name, ', ', cust.first_name) full_name FROM (SELECT first_name, last_name, email FROM customer WHERE first_name = 'JESSIE') cust;
```
The _containing query_ here references two out of three available columns. The subquery has an alias `cust` which is referenced by the containing query.
The data in `cust` is held in memory for the duration of the query and then discarded--you can say that the `cust` variable is local I guess?
- Temporary tables
Volatile data held in memory. Every relational database allows the ability to define temporary/volatile tables.
They look just like permanent tables but the data will vanish either when your session is closed or at the end of a transaction.
For example:
```
CREATE TEMPORARY TABLE actors_j (actor_id smallint(5), first_name varchar(45), last_name varchar(45)); /* create your temporary table */
INSERT INTO actors_j SELECT actor_id, first_name, last_name FROM actor WHERE last_name LIKE 'J%'; /* populate your temporary table */
SELECT * FROM actors_j; /* observe all the beautiful actors whose last name starts with J in your temporary table. these rows will disappear when you close your session.*/
```
Note that in Oracle Database, temporary tables are kept available for future sessions QUESTION: until when?
- Virtual tables/Views
Created using the create view statement. It's a query, although it looks and acts like a table. There is however no data associated with a view (what?)
This means that unlike a normal table that has columns and rows, virtual tables do not store columns and rows: They are just queries. When you query against a view,
your query is merged with the view definition to create a final query to be executed.
For example:
```
CREATE VIEW cust_vw AS SELECT customer_id, first_name, last_name, active FROM customer;
```
No data is inserted in this table; the server simply tucks away the select statement for future use. Now that the view exists you can use it to generate queries like so:
```
SELECT first_name, last_name FROM cust_vw WHERE active = 0;
```
Why use a view? To simplify a complex database, or to hide columns from users, etc.

#### Table Links
mothafuckin JOINS!
If more than one table appears in the FROM clause they must be linked.
This is not a database server requirement, it's an ANSI-approved method of joining multiple tables.
QUESTION: What is ANSI? American National Standards Institutes. Private and nonprofit. consensus standards.
It is the most portable method across database servers.
Here's a simple example:
```
SELECT customer.first_name, customer.last_name,
  time(rental.rental_date) rental_time
FROM customer
  INNER JOIN rental
  ON customer.customer_id = rental.customer_id
WHERE date(rental.rental_date) = '2005-06-14';
```
With this query we can display data from both `customer` and `rental`.
The JOIN conditions are found in the ON subclause.
The `where` clause is not part of the join, and is only included to keep the result set small.
#### Defining table aliases
When multiple tables are joined, you need a way to reference them in your clauses like `select where group by having order by`.
You can either use the entire table name (see above) or an alias, like so:
```
SELECT c.first_name, c.last_name,
  time(r.rental-date) rental_time
FROM customer c
  INNER JOIN rental r
  ON c.customer_id = r.customer_id
WHERE date(r.rental_date) = '2005-06-14';
```
Note that you can also use the `AS` keyword when defining aliases but it is not required (`rental AS r`).
### The where Clause
Sometimes you want to retrieve all rows from a table and sometimes not. Most of the time you need a _filter_.
The `where` clause is the mechanism for filtering out unwanted rows from your result set.
Like, if we wanted to see only G rated films that can be rented out for at least a week:

`SELECT title FROM film WHERE rating = 'G' AND rental_duration >= 7;`

Wowza, that just filtered out 971 of the 1000 rows in the film table!
This clause contains two _filter conditions_, but you can include as many as you want with the keywords `AND`,`OR`, and `NOT`.
When separating using the AND operator, all conditions must be true to be included in the result set.
When using the OR operator, only one of the conditions must be true. This OR is inclusive.
 That is, if you ask for:
`SELECT title FROM film WHERE rating = 'G' OR rental_duration >= 7;`
You will get three kinds of films: rated G, rated G and whose rental duration is over 7 days, rental duration is over 7 days.
If you need to use both AND and OR operators, you should group the conditions with parentheses much like you would any mathematical or logical operation:
```
SELECT title, rating, rental_duration FROM film WHERE (rating = 'G' AND rental_duration >= 7) OR (rating = 'PG-13' AND rental_duration < 4);
```
You should always group conditions with parentheses so that you, the database server, and anyone modifying your code all know what's going on without a question.
### The group by and having clauses
If you want to manipulate your data a bit, you can use these clauses. `GROUP BY` groups data by column values.
For example if you want to find all customers who have rented 40 or more films (frequent customers!) You can just group the rentals by customer, then
return only those whose `rental_count >= 40`. When using group by you can also use `having`, which filters grouped data in the same way `where` filters raw data.
```
mysql> SELECT customer.first_name, customer.last_name, count(*)
    -> FROM customer
    -> INNER JOIN rental
    -> ON customer.customer_id = rental.customer_id
    -> GROUP BY customer.first_name, customer.last_name
    -> HAVING count(*) >= 40;
```
These clauses are so advanced so we're going to wait until a later chapter to really get into them.
### The order by clause
In general, rows returned are in no particular order. If you want your result sorted you will need to specify.
This clause is a means to sort your result set using either raw column data or expressions based on column data.
As an example we can use an earlier query:
```
mysql> SELECT c.first_name, c.last_name, time(r.rental_date) rental_time
    -> FROM customer c
    -> INNER JOIN rental r
    -> ON c.customer_id = r.customer_id
    -> WHERE date(r.rental_date) = '2005-06-14'
    -> ORDER BY c.last_name;
```
Voila, the results are ordered by last name. If you want to order by first A then B as it were, add another clause like so
```
mysql> SELECT c.first_name, c.last_name, time(r.rental_date) rental_time
    -> FROM customer c
    -> INNER JOIN rental r
    -> ON c.customer_id = r.customer_id
    -> WHERE date(r.rental_date) = '2005-06-14'
    -> ORDER BY c.last_name, c.first_name;
```
Then John Smith will appear after Jane Smith and all will be well.
#### Ascending vs descending sort order
The default is _ascending_, that is, earliest or primary first. So A-Z, 1-10, 10/10/1980-10/10/10/1990
A _descending_ order would mean last to first, so Z-A etc.
Descending sorts are most commonly used for ranking queries, e.g. "show me the top 5 account balances". If that's the case MySQL includes a `limit` clause as well.
#### Sorting via Numeric Placeholders
If you're sorting using the colums in your `select` clause you can reference the columns by their position in the clause rather than by name.
This can be useful if you're sorting on an expression. The previous example can function as an example here as well:
```
mysql> SELECT c.first_name, c.last_name, time(r.rental_date) rental_time
    -> FROM customer c
    -> INNER JOIN rental r
    -> ON c.customer_id = r.customer_id
    -> WHERE date(r.rental_date) = '2005-06-14'
    -> ORDER BY 3 desc;
```
This is, of course, barely readable. Adding a column to the select clause without changing the numbers in the order-by clause can lead to unexpected results--that is, it's brittle.
Maybe you might, for expediency's sake, reference columns positionally when writing ad-hoc queries, but when writing code it's much more future-proof to reference then by name.

# Filtering
Working with every row in the table is sometimes fine. Maybe you have a temp storage table you want to purge.
Maybe you need to modify all the rows after adding a new column. Maybe you need every customer's name.
In these cases you won't need a `where` clause, but most of the time you will. All of SQL's data statements
except `INSERT` have an optional `WHERE` clause containing one or more _filter conditions_ used to restrict the number
of rows acted upon by the statement.
Additionally, `SELECT` has a `HAVING` clause which filters conditions relating to grouped data.
## Condition Evaluation
A `where` clause may contain one or more `conditions`, separated by `and`/`or`.
The `AND` is a logical operator meaning that all the conditions have to evaluate to true in order for it to return true,
and thus for those rows to be included in the result set.
The `OR` is an inclusive or, meaning that one or more conditions evaluating to true is enough to return that row in the result set.
So for example `WHERE favorite_color = 'RED' OR eye_color = 'BLUE'` means that your row can be returned if:
- Your eyes are blue, but your favorite color is not red
- Your eyes are not blue, but your favorite color is red
- Your eyes are blue and your favorite color is red
As you can see, you get a lot more rows this way.
### Parentheses
If you include 3 or more conditions with both `AND and `OR`, you should use parentheses to make your intent clear.
Otherwise, confusion--whether on the part of the database server or the part of someone reading your code--could occur.
This statement is clear in its intent:
`WHERE (favorite_color = 'RED' OR eye_color = 'BLUE') AND last_name = 'YOUNG'`
The more conditions you have in your clause, the more combinations there are for the server to evaluate.

### Not
Look at this bullshit:
`WHERE NOT (first_name = 'STEVEN' OR last_name = 'YOUNG') AND create_date > '2006-01-01'`
Now we're retrieving only rows where the first name is not steven or the last name is not young... 
The NOT applies to the first set of parentheses in this case.
That's hard to read, right? It's a weird way of saying find all the customers whose name isn't 'Steven Young'.
But we can say it like this instead to be clearer:
```
WHERE first_name <> 'STEVEN' AND last_name <> 'YOUNG'
```
The `<>` is like the ! in Ruby, the symbolic not operator.

### Building a Condition
Now ou know how to evaluate multiple conditions. So what comprises a single condition?
A condition is made up of one or more _expressions_ combined with one or more _operators_.
An expression can be:
- a number
- a column
- a string literal
- a built-in function
- a subquery
- a list of expressions
The operators used within conditions include:
- comparison operators like `=,!=,<,>,<>,like,in,between`
- arithmetic operators like `+,-,\*,/`

### Condition Types
So many ways to filter. You can look for values, sets of values, or ranges.
Or you can do pattern-matching to look for partial strings.
#### Equality Conditions
Most filters are like `column = expression`, for example `SELECT film_id FROM film WHERE title = 'RIVER OUTLAW'`
Those are called _equality conditions_ because they equate one expression to another.
You can equate a column to a literal, or a value returned from a subquery.
#### Inequality Conditions
Also common are _inequality conditions_ which asserts two expressions are not equal.
For example
```
SELECT c.email
FROM customer c
  INNER JOIN rental r
  ON c.customer_id = r.customer_id
WHERE date(r.rental_date) <> '2005-06-14'
```
Please note that when you build an inequality condition you can use either `<>` or `!` because in this kind of case that is the same.
#### Data modification with equality conditions
Let's say the movie rental company wants to remove old account rows once per year. So your task is to grab whatever "old" is and remove those rows.
You could do
```
DELETE FROM rental
WHERE year(rental_date) = 2004;
```
There's a single equality condition there. Or you could do this odd thing:
```
DELETE FROM rental WHERE year(rental_date) <> 2005 AND year(rental_date) <> 2006;
```
#### Range Conditions
Also common is finding data between two dates, or before/after a certain date. Maybe ages, whatever. That's where the comparison alligators come in.
```
SELECT customer_id, rental_date FROM rental WHERE rental_date < '2005-05-25';
```
You could specify a lower range as well:
```
SELECT customer_id, rental_date FROM rental WHERE rental_date <='2005-04-03' AND rental_date >= '2005-03-03'
```
That's a way of doing `BETWEEN` but we could also use:
#### The Between Operator

```
SELECT customer_id, rental_date FROM rental WHERE rental_date BETWEEN '2005-06-14' AND '2005-06-16'
```
You _must_ specify the lower limit of the range _before_ the upper limit (after `and`) because otherwise you'll have a negative time range and thus no data will be returned.
Another thing to remember is that the range for `BETWEEN` is _inclusive_.
And since you are not specifying the time component of the date, the time defaults to midnight. Rentals occurring on midnight when June 14 begins will be returned, as well as 11:59 on June 15.
Number ranges are easy:
```
SELECT customer_id, payment_date, amount FROM payment WHERE amount BETWEEN 10.0 AND 11.99;
```
#### String Ranges
These are a bit harder. To work with string ranges, you need to know the order of the characters within your character set.
The order in which the characters within a character set are sorted is called a _collation_.

`SELECT last_name, first_name FROM customer WHERE last_name BETWEEN 'FA' AND 'FR';`

Will return names like Farnsworth, Fennell, and Fox.. But names like Frazier are out of range. WHY?
#### Membership Conditions
If you wanted to locate movies that are fine for your kids, maybe with a rating of either G or PG, you could use OR:

`SELECT title, rating FROM film WHERE rating = 'G' OR rating = 'PG';`

But imagine how tedious this would be if you had like, a shit ton of conditions to check! For that we can use `IN`:

`SELECT title, rating FROM film WHERE rating IN ('G','PG');`

We can put however much we want in that IN expression.
#### Using Subqueries
Instead of a set of expressions you've written, you can use a subquery to generate a set for you.
As an example:

`SELECT title, rating FROM film WHERE rating IN (SELECT rating FROM film WHERE title LIKE '%PET%);`

The subquery returns the ratings for films with PET in the name, then the outer query finds all the films with those ratings.
#### Using NOT IN
To see if an item does _not_ exist in a set, you can just use something like this:
`SELECT title, rating FROM film WHERE rating NOT IN ('PG-13','R','NC-17');`
#### Matching Conditions

Partial string matches are cool. If you wanted to find for example all customers whose last name begins with Q,
you can use a built-in function that strips the first letter off a column. It's this:
```
SELECT last_name, first_name FROM customer WHERE left(last_name, 1)=  'Q';
```
Check that shit out. This built-in function does this particular job but what's more flexible is wildcards.
#### Wildcards
Using wildcards you can search for any partial match.
Wildcard characters include:
- `\_`, which stands for exactly one character, and
- `%`, which stands for any number of characters (including no characters)
When building these expressions you use the LIKE operator, like so:
```
SELECT last_name, first_name FROM customer WHERE last_name LIKE '_A_T%S';
```
That means "one character, then an A, then another character, then a T, then any number of characters, then an S.
So it will give you names like Matthews, Walters, and Watts.
#### Regular Expressions
OH YEAH WE GOT REGEX SUPPORT
A regular expression is a search expression "on steroids"
For further reading, consult "Mastering Regular Expressions" by Jeffrey E. F. Friedl.
How it's done:
```
SELECT last_name, first_name FROM customer WHERE last_name REGEXP '^[QY]';
```
This is the previous example finding customers whose last name starts with Q or Y.
Both Oracle and Microsoft SQL Server support regex as well.
Note that with Oracle, you would use `regexp_like` function instead of the regexp operator in the previous example.
SQL Server allows regular expressions to be used with the `like` operator.
#### NULL BITCH
You know what null means. But remember that you can describe it in different ways:
- Not applicable (a person doesn't have a last name)
- Value not yet known (a person is born, but does not have a name yet)
- Value undefined (An account is created for a product that has not yet been added to the database)
REMEMBER:
- An expression can _be_ null, but never _equal_ null. Nothing isn't nothing but it isn't not nothing either.
- Two nulls are never equal to each other.
To test whether an expression is null, you use the null operator like:
```
SELECT rental_id, customer_id FROM rental WHERE return_date IS NULL;
```
That will get you all the rentals that were never returned (no return date, no return)
Note that you cannot use equals:
```
SELECT rental_id, customer_id FROM rental WHERE return_date = NULL;
```
Won't return shit, because nothing is equal to null.
Want to see if there is a value in that bitch?
```
SELECT rental_id, customer_id FROM rental WHERE return_date IS NOT NULL;
```
Now you'll get all the returned rentals.
Another potential pitfall of realizing that nothing is ever equal or not equal to null is this. Suppose you were asked to find all rentals that were not returned from May through August of 2005.
If you wrote this query like so:
```
SELECT rental_id, customer_id, return date FROM rental WHERE return_date NOT BETWEEN '2005-05-01' AND '2005-09-01';
```
You would get a lot of rows, all of them _with_ a return date. It will not return rentals that have a null return date. Why?
Because a null return date wasn't returned during that time period, but it was also not _not_ returned during that time period.
You will need to add an OR clause to that query to get the right answer.

# Querying Multiple Tables
BITCH WE ARE GONNA DO SOME JOINS.
## What is a JOIN?
For example tables, customer and address. Customers belong_to one address, so in the `customer` table we got, relevant columns
`customer_id` and `address_id`. In the address table we have `address_id`. It would be proper to say that `address_id` in customer is the _foreign key_
that refers to the address table.
If you wanted to retrieve the names of customers along with their street address, you would have to do a join because the address
info is stored in the address table.
The query instructs the server to use the customer.address_id column as the _transportation_ between the customer and address tables.
You can now use both sets of columns in the result set. _THIS_ is a join.
*Remember* A foreign key constraint can be optionally created to make sure that the values in one table actually exist in another.
Like, to make sure that address_id: 6 where there is actually an address with an ID of 6.
### Cartesian Product
Now here's a simple JOIN:
```
SELECT c.first_name, c.last_name, a.address FROM customer c JOIN address a;
```
Now this will definitely work but... Look how we didn't specify HOW the two tables should be joined. If we do not do that, we will get what's called a _cross_ join,
or the _cartesian product_, which is _every_ permutation of the two tables! (599 customers x 603 addresses = 361,197 results!) 
### Inner Joins
Here's our fucking join that's real and works, you need to actually link the tables. That way you'll get a single row for each customer.
```
SELECT c.first_name, c.last_name, a.address FROM customer c JOIN address a ON c.address_id = a.address_id;
```
Basically you need an `ON` subclause.
If a value exists for the address_id column in one table but not the other then the join fails for the rows containing that value and excluded from the result set.
Joins are INNER by default BUT you should get used to being specific.
Fun fact: If the names of the columns used to join the two tables are identical, you can use the `using` subclause instead of `on`:
```
SELECT c.first_name, c.last_name, a.address FROM customer c JOIN address a USING (address_id);
```
But it's a shorthand notation that only works in one case so.. better to be explicit and not do that.
### ANSI Join Syntax
The notation used throughout this book for joining tables was introduced in the SQL92 version of the ANSI SQL Standard.
All major databases have adopted this syntax.
But because these servers have been around since before the release they understand an older syntax as well:
```
SELECT c.first_name, a.address FROM customer c, address a WHERE c.address_id = a.address_id
```
See no ON subclause. Instead tables are named in the FROM clause separated by commas and the JOIN is caused by a WHERE.
You can use the older syntax but ANSI syntax has advantages:
- Join conditions and filter conditions are separated into two different subclauses (on/where) making a query easier to understand
- The join conditions for each pair of tables are contained in their own ON clause making it less likely that part of a join will be mistakenly omitted
- Queries that use the SQL92 syntax are portable across db servers--the older syntax is slightly different across different servers
With more complex queries you can easily see the benefits. If you have any filter conditions.

### Joining Three or More Tables
With a three-table join there are two join types in the `from` clause and two `on` subclauses, as you might expect.
In our database `city` is a separate table from the street address.
It's accessible in the address table via a `city_id` foreign key.
To show each customer's city you need to go through the address table like so:
```
SELECT c.first_name, c.last_name, ct.city FROM customer c INNER JOIN address a ON c.address_id = a.address_id INNER JOIN city ct ON ct.city_id = a.city_id;
```
Woo there we go.
Note: You can do the joins in any order. SQL is a _non-procedural_ language.
This means you describe what you want done, but it is the database server who actually decides how to execute it.
Using statistics gathered from your database objects, the server picks one of the tables as a starting point (the _driving table_).
Then it decides in which order to join the remaining tables. So the order doesn't matter.
BUT. If you want them to be joined in a particular order, you can:
- specify the keyword `straight_join` in MySQL
- request the `force order` option in SQL Server
- use the `ordered` or `leading` optimizer hint in Oracle Database.
For example to tell the mysql server to use the city as the driving table and then join the address then customer tables, you could do:
```
SELECT STRAIGHT_JOIN c.first_name, c.last_name, ct.city FROM city ct INNER JOIN address_a ON a.city_id = ct.city_id INNER JOIN customer c ON c.address_id = a.address_id
```

### Using Subqueries as Tables
Subqueries are super useful. You can join to them like this:
```
SELECT c.first_name, c.last_name, addr.address, addr.city 
FROM customer c
  INNER JOIN
    (SELECT a.address_id, a.address, ct.city
     FROM address a
       INNER JOIN city ct
       ON a.city_id = ct.city_id
     WHERE a.district = 'California'
    ) addr
  ON c.address_id = addr.address_id
```
Check that shit out. The subquery, which is in parens, is given the alias `addr`
and finds all addresses in california, only returning them to be joined with.
Yes, this query could have been written just by joining 3 tables and not using a subquery,
but sometimes you do need one, and sometimes it's better performance-wise to use one.

### Using the same table twice
You may need to join the same table more than once for some queries. This is A-OK, don't get weirded out.
In our example database actors are related to the films in which they appeared via the `film_actor` table.
If you want to find all the films in which two actors appeared, you could write a query like this one:
```
SELECT f.title FROM film f 
  INNER JOIN film_actor fa ON f.film_id = fa.film_id
  INNER JOIN actor a ON fa.actor_id = a.actor_id
WHERE ((a.first_name = 'CATE' AND a.last_name = 'MCQUEEN')
  OR (a.first_name = 'CUBA' AND a.last_name = 'BIRCH'));
```
This query returns all movies where either actor appeared. If you want all films where BOTH appeared though? Gotta do this:
```
SELECT f.title FROM film f
  INNER JOIN film_actor fa1 
  ON f.film_id = fa1.film_id
  INNER JOIN actor a1
  ON fa1.actor_id = a1.actor_id
  INNER JOIN film_actor fa2
  ON f.film_id = fa2.film_id
  INNER JOIN actor a2
  ON fa2.actor_id = a2.actor_id
WHERE (a1.first_name = 'CATE' AND a1.last_name = 'MCQUEEN')
  AND (a2.first_name = 'CUBA' AND a2.last_name = 'BIRCH');
```
This is an example of a query that _requires_ table aliases, since the same tables are used multiple times.

## Self-Joins
You can join a table to itself! Obviously there can be self-referencing foreign keys like with employee assignments and parents.
The sample database we're using doesn't contain such a relationship, but we can pretend.
If the film table included a column `prequel_film_id` it'd be that. How it would go:
```
SELECT f.title, f_prnt.title prequel FROM film f INNER JOIN film f_prnt ON f_prnt.film_id = f.prequel_film_id WHERE f.prequel_film_id IS NOT NULL;
```
Whee

# Working with Sets
You can definitely interact with the data in a database one row at a time.
Buut, relational databases are really all about _sets_. We're going to learn how to combine multiple result sets using various _set operators_.
## Basics
In lots of places you learn basic set theory in elementary school.
Think of two circles named A and B that intersect. The set operation to combine these sets is the `union` operation,
`A union B`
The area (usually shaded a different color) where they overlap represents data common to both sets.
Set theory is a bit uninteresting if the data don't intersect.
The set operation that is concerned _only_ with the overlap between two data sets is known as the _intersection_.
`A intersect B`
The data set generated with this operation is just the area of overlap between the two sets.
If the two sets have no overlap, then the intersection operation yields an empty set.
The third operation is the `except` operation. For example
`A except B`
is the whole set of A minus any overlap with set B. If the two sets have no overlap,
obviously the whole set of A is generated by this operation.
Using these three operations you can generate whatever results you need. Want A and B without the intersection?
Then it's `(A union B) except (A intersect B)` OR `(A except B) union (B except A)` which is a little harder to understand but, more than one way to skin a cat.

## Set theory in Practice whoooo
The circles we visualize don't convey anything about what data sets we're dealing with.
IRL you need to describe the composition of the data sets if they are to be combined.
As an example, what would happen if you tried to generate a union of the customer and city tables?
The customer table contains 9 columns of various types. The city table contains just 4, of other varying types.
The first column in our result set would be a combination of the city.city_id and customer.customer_id.
The second column would be the combination of the customer.store_id and city.city columns (the second column in each set).
Some column pairs are easy to combine (like two numeric columns) but how do we combine, say, a numeric and string column?
And furthermore what do we do with all the extra colums in the customer table that have nothing to combine with?
No, clearly we need some guidelines for how to perform set operations on two data sets.
The rules:
- Both data sets must have the same number of columns
- The data types of each column across the two sets must be the same (or be able to be converted by the server)
To perform a set operation, you place a set operator between two `select` statements:
```
SELECT 1 num, 'abc' str UNION SELECT 9 num, 'xyz' str;
```
Each of the individual queries here yields a data set consisting of a single row having a numeric column and a string column.
Theset operator tells the database server to combine all rows from the two sets.
THUS.. the final set includes two rows of two columns.

## Set Operators
We got three set operators we can use to do a UNION,  EXCEPT, and INTERSECT.
Each operator has two _flavors_, one that includes duplicates and another that removes it (but not necessarily all of them).
### The Union Operator
`union` and `union all` allow you to combine multiple data sets.
`union` sorts the combined data sets and removes duplicates, `union all` does not.
with `union all`, the number of rows in the final set will always equal the sum of the number of rows
in the sets being combined. This operation is the simplest to perform from the server's POV since
there needs no checking.
Why would we do this? Well like for example:
```
SELECT 'customer' type, c.first_name, c.last_name FROM customer c UNION ALL SELECT 'actor' type, a.first_name, a.last_name FROM actor a;
```
You can specify rows and columns and their header like is done above with "customer type" and "actor type" which will give you
the value in each row of 'customer' as the column header 'type'. It is optional but allows us to see which table they both came from.
So now we have a list of all the names of both actors and customers.
Please note that this does NOT remove duplicates. Even if you query the same table twice, the same data will just appear twice.

If you want your table to not have duplicates, use the `union` operator instead:
```
SELECT c.first_name, c.last_name
 FROM customer c 
 WHERE c.first_name LKE 'J%' AND c.last_name LIKE 'D%' 
 UNION 
 SELECT a.first_name, a.last_name
 FROM actor a
 WHERE a.first_name LKE 'J%' AND a.last_name LIKE 'D%' 
```
### The intersect operator

The ANSI SQL specification includes the intersect operator for performing intersections. BUT. Version 8.0 of MySQL does _not_ implement it.
That is, no versions of MySQL so far implement the `intersect` operator so this example won't work unless you're using some other sql server.

If two queries in a compound query return nonoverlapping data sets, the intersection will be an empty set.
```
SELECT c.first_name, c.last_name FROM customer c
WHERE c.first_name LIKE '%D' AND c.last_name LIKE 'T%'
INTERSECT
SELECT a.first_name, a.last_name FROM actor a
WHERE a.first_name LIKE '%D' AND a.last_name LIKE 'T%';
```
While there are both actors and customers having the initials DT, these sets do not overlap in any way so this would yield an empty set.

However this query would return a single row:
```
SELECT c.first_name, c.last_name
FROM customer c
WHERE c.first_name LIKE 'J%' AND c.last_name LIKE 'D%'
INTERSECT
SELECT a.first_name, a.last_name
FROM actor a
WHERE a.first_name LIKE 'J%' AND a.last_name LIKE 'D%';
```
Jennifer Davis. The only name found in both queries' result sets.
ANSI SQL also specifies for an `intersect all` operator, which does not remove duplicates like `intersect` does. But the only database server that implements it is IBM's DB2 Universal Server.

### The except Operator
The ANSI SQL specification includes the `except` operator but yet again MySQL 8 does not implement it.
Oracle doesn't either, it uses the non-ANSI-compliant `minus` operator instead.
The `except` operator returns the first result set minus overlap with the second. We'll use the previous example except with the order reversed:
```
SELECT a.first_name, a.last_name
FROM actor a
WHERE a.first_name LIKE 'J%' AND a.last_name LIKE 'D%'
EXCEPT
SELECT c.first_name, c.last_name
FROM customer c
WHERE c.first_name LIKE 'J%' AND c.last_name LIKE 'D%';
```
This version includes three rows from the first query.. just not Jennifer Davis, who is found in the results from both queries.
There's also `except all` but once again only IBM's DB2 Universal Server implements it.
The `except all` operator is a little tricky, so we need examples to explain how duplicate data is handled.
Pretend you have two sets of data like this:
Set A:
```
actor_id
10
11
12
10
10
```
Set B:
```
actor_id
10
10
```
The operation `A except B` would obviously be this:
```
11
12
```
which is "which results are in neither result set?
But the operation `A except all B` would yield this:
```
10
11
12
```
`except` removes all duplicate data. `except all` removes only one ocurrence of duplicate data from set A for every occurrence in set B. 
## Set Operation Rules
### Sorting Compound Query Results
If you want your results sorted you can add the `order by` clause _after_ the last query.
When specifying column names to order by, you must choose from the column names in the _first_ query of the compound query.
Frequently, the column names are the same for both, but sometimes not, like so:
```
SELECT a.first_name fname, a.last_name lname
FROM actor a
WHERE a.first_name LIKE '%J' AND a.last_name LIKE 'D%'
UNION ALL
SELECT c.first_name, c.last_name
FROM customer c
WHERE c.first_name LIKE 'J%' AND c.last_name LIKE 'D%'
ORDER BY lname, fname;
```
The column names for these two queries are different. If you specified a column ame from the second query, you'd get an error:
"unown column 'last_name' in 'order clause'" which you've seen before aye?
You can give the columns in both queries identical column aliases to avoid this issue.
### Set Operation Precedence
If you had a compound query with more than 2 queries using different set operators you need to think about the order of operations there.
Placing your query in different orders can affect the results. Like:
```
SELECT a.first_name, a.last_name
FROM actor a
WHERE a.first_name LIKE 'J%' AND a.last_name LIKE 'D%'
UNION ALL
SELECT a.first_name, a.last_name
FROM actor a
WHERE a.first_name LIKE 'M%' AND a.last_name LIKE 'T%'
UNION
SELECT c.first_name, c.last_name
FROM customer c
WHERE c.first_ncme LIKE 'J%' AND c.lcst_ncme LIKE 'D%'
```
This compound query returns sets of nonunique names; the first and second are separated with `union all` while the second and third are separated with `union`.
If you take a look at the results, you see all unique names. If you reverse the set operators, you will get non-unique names!
In general, compound queries are evaluated from TOP to BOTTOM, with the caveats:
- The ANSI SQL specification calls for the `intersect` operator to have precedence over the others
- You can dictate order by enclosing multiple queries in parentheses
MySQL doesn't allow parens yet in compound queries but in a different db server, you can wrap to override the top-to-bottom order.

# Data Generation, Manipulation, and Converstion
So how do you deal with string, numeric, or temporal data? Sometimes you wanna like, do stuff to it.
The SQL language does not include commands covering this functionality, BUT, there are built-in functions.
The SQL standard does specify some, but db vendors often do not comply with standard in this case.
You can download a reference guide for your specific server.
## Working with String Data
The following character types are used when working with string data:
- char
  Holds fixed-length, blank-padded strings. MySQL allows up to 255 characters. oracle up to 2k, SQL Server up to 8k
- varchar
  Holds variable-length strings. MySQL permits 65,535 chars. Oracle (varchar2) allows 4k, SQL Server 8k
- text (MySQL and SQL Server) or clob (Oracle)
  Holds very large variable-length strings (generally referred to as documents). MySQL has multiple text types for documents up to 4GB in size.
  SQL Server has a single text type for documents up to 2GB, Oracle's clob allows up to 128 TB (you heard me). SQL Server 2005 also has the varchar(max)
  data type and wants you to use that instead of text, which will be removed from the server in some future release.
To play with this, we can create an example table like so (note the creative column names):
```
CREATE TABLE string_tbl (char_fld CHAR(30), vchar_fld VARCHAR(30), text_fld TEXT);
```
### String Generation
The simplest way to populate a char column is a string literal:
```
INSERT INTO string_tbl (char_fld, vchar_fld, text_fld) VALUES ('This is char data','This is varchar data','This is text data');
```
If you try to insert too long of a string (designated or data-type maximum) the server will throw an exception.
This is called "Strict Mode" and it is the new default as of MySQL 6. Older versions would truncate and give you a warning.
This is called "ANSI Mode" and you can check which mode you're in and even change it with these commands:
```
SELECT @@session.sql_mode; /* Checks the mode */
SET sql_mode='ansi'; /* Sets the mode */
```
The best way to avoid exceptions or truncation is to make sure your varchar column has a high enough limit.
This is not wasteful--the server only allocates enough space to store your string.
### Including Single Quotes
Strings are demarcted by single quotes, so what if you wanted to include, say, the word "doesn't" in your string?
The answer is to add an _escape_ to the string so the server ignores it. All three SQL servers allow you to escape
with another single quote as in:
```
UPDATE string_tbl SET text_fld = 'This string didn''t work, but it does now';
```
Oracle and MySQL users can also escape with a backslash:
```
UPDATE string_tbl SET text_fld = 'This string didn\'t work, but it does now;
```
Retrieving the string will show a normal, single quote.
However, what if you're retrieving the string to add to another program that will read it?
You'll want to escape the string for this. In MySQL, you can use the built-in function `quote()`,
which places quotes around the whole string and adds escapes to any single quotes/apostrophes within the string.
```
SELECT quote(text_fld) FROM string_tbl;
```
> 'This string didn\'t work, but it does now'
When retrieving data for export, you may want to use the quote function for all non-system-generated character columns (like customer_notes).
### Including Special Characters
So what about characters like the ö and é in other languages? SQL Server and MySQL include the built-in function `char()` so you can build from any of the 255 characters in the
ASCII character set. Oracle users get the `chr()` function. This example retrieves a typed string and its equivalent built via individual characters:
```
SELECT 'abcdefg', CHAR(97,98,99,100,101,102,103);
> +---------+----------------------------------------------------------------+
| abcdefg | CHAR(97,98,99,100,101,102,103)                                 |
+---------+----------------------------------------------------------------+
| abcdefg | 0x61626364656667                                               |
+---------+----------------------------------------------------------------+
1 row in set (0.00 sec)
```
See how the 97th character in that set is the letter a?
I don't really get what's happening here. I know about ASCII.. what does. OMG. What is being displayed? In the book the second row above is just abcdefg, not a hexidecmial number!
Maybe my encoding is different.
```
SELECT CHAR(128,129,130,131,132,133,134,135,136,137);
```
Should return:
```
+-----------------------------------------------+
| CHAR(128,129,130,131,132,133,134,135,136,137) |
+-----------------------------------------------+
| Çüéâäàåçêë                                    |
+-----------------------------------------------+
1 row in set (0.01 sec)
```
Mine returns:
```
+----------------------------------------------------------------------------------------------+
| CHAR(128,129,130,131,132,133,134,135,136,137)                                                |
+----------------------------------------------------------------------------------------------+
| 0x80818283848586878889                                                                       |
+----------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```
In the book he is using the utf8mb4 character set. You can configure your session for a different character set and you will see a different set of characters.
Asked Matt about this...
iHe said it's my character set.
"No, looks fine. I'll be honest, I might skip this section."
"you can just use unicode directly in MySQL at this point:"
"There's no particular reason I can think of that you would want to be using arrays of "extended ascii" codes."
So I won't skip the section but take abbreviated notes.
Hoe to Concat:
`mysql> SELECT CONCAT('danke sch', 'ö', 'n');`
Note that Oracle users can use the concatenation operator `||` instead of `concat()`
As in:
`SELECT 'danke sch' || 'ö' || 'n' FROM dual;`
And SQL Server doesn't have the concat function so you must use the + operator:
`SELECT 'danke sch' + 'ö' + 'n';`
Look babe if you're using a non-accented keyboard, you will need to encode your character set as ASCII or something, or find out how to write them. But chances are you'll never have to go without that particular feature.

### String Manipulation
Each database server contains many built-ins for manipulating strings.
#### String functions that return numbers
We got `.length()` (SQL Server has `len()`):
```
SELECT LENGTH(char_fld) char_length, LENGTH(vchar_fld) varchar_length, LENGTH(text_fld) text_length FROM string_tbl;
```
And don't be surprised that the length of a `char` field is always the same: Remember it's right-padded with spaces.
We got `position()` if you want to know where a substring appears in a string (the first time it appears, if more than once):
```
SELECT POSITION('characters' IN vchar_fld) FROM string_tbl;
```
If the substring can't be found, the function returns zero. YES THAT'S RIGHT.. The first element's position is not zero like in most language's arrays, it's 1. So zero is nowhere.
If you want to start the search somewhere other than the first character, you use `locate()`:
```
SELECT LOCATE('is', vchar_fld, 5) FROM string_tbl;
```
This example is asking for the string "is" starging at the 5th character. `locate` is just like `position` in that it allows an optional third parameter.
Note that Oracle uses `instr()` instead of `position` or `locate`. It can be used with an optional third parameter so mimics either function depending on how many are passed.
SQL Server has the `charindx()` function, which can accept 2 or 3 arguments also.

A function that has no analog in Oracle Database or SQL is `strcmp()`. It takes two strings as arguments and returns the following:
- `-1` if the first string comes before the second string in sort order
- `0` if the strings are identical
- `1` if the second string comes before the first string in sort order
This function is case insensitive.
You can also use `LIKE` in a true/false sense like so:
```
SELECT name, name LIKE '%y' ends_in_y FROM category;
```
Breaking this query apart, we select the name and that column gives us a name, then we select `name LIKE '%y'` which gives us a row of 0s or 1s depending.
You can perform more complex pattern matching with the `REGEXP` operator:
```
SELECT name, name REGEXP 'y$' ends_in_y FROM category
```
The second column of this query returns 1 if the value stored in the name column matches the given regular expression.
Note that SQL Server and Oracle users can achieve similar results by building `case` expressions (more on that later).
#### String functions that return strings
You can modify strings by either extracting part of it, or by adding additional text. Every server contains various functions.
You got the `concat()` function, in use here to help modify a field:
```
UPDATE string_tbl SET text_fld = CONCAT(text_fld, ', but now it is longer')
```
You can also use the `concat` function to do a sort of string interpolation like:
```
SELECT concat(first_name, ' ', last_name, ' has been a customer since ', date(create_date)) customer_narrative FROM customer;
```
The `concat` function can handle expression that returns a string, date, or number.
Note that Oracle has the concat function but that one will only accept 2 string arguments. To combine multiple strings, you have to use pipes:
```
SELECT first_name || ' ' || last_name || ' has been a customer since ' || date(create_date) customer_narrative FROM customer;
```
SQL Server has no concat function, or pipes--but it does have `+`.
If you want to add or replace characters in the middle of a string rather than just the beginning or end, you can use the following functions:
MySQL's `insert()` takes four arguments: The original string, the position at which to start, the number of characters to replace, and the replacement string.
`insert(original_string, starting_position, num_replacement_chars, replacement_string)`
Depending on the value of the third argument, the function may be used to either insert or replace characters in a string.
Obviously, "replace 0 characters" would not replace anything and just push everything to the right over.
```
SELECT INSERT('goodbye world', 9, 0, 'cruel ') string;
```
In this example, all characters starting from position 9 are pushed to the right, and the string "cruel" is inserted.
If the third argument is greater than zero, then that number of characters is replaced with the replacement string: as in:
```
SELECT INSERT('goodbye world', 1, 7, 'hello');
```
Oracle does not provide a single function like insert, but rather a couple that can do the job:
The `replace()` function replaces one substring with another:
`replace(original_string, what_to_replace, replacement_string)`
```
SELECT REPLACE('goodbye world', 'goodbye', 'hello') FROM dual;
```
Please note that the `replace` function will replace _every_ instance of the search string with the replacement string!
SQL Server also has the `replace` function and it also includes `stuff()`, that is similar to MySQL's `insert`:
```
SELECT STUFF('hello world', 1, 5, 'goodbye cruel')
```
Along with insertion, you may need extraction. All three servers include `substring()` (Or, for Oracle, `substr()`:
`substring(original_string, starting_position, number_of_characters_to_extract`
```
SELECT SUBSTRING('goodbye cruel world', 9, 5);
```
Note that there are many more functions for manipulating string data. You can look 'em up or whatever.
### Working with Numeric Data
ALl the usual arithmetic operators like `+ - * /` are available. Functions will follow order of operations unless parentheses are used.
Remember that the main concern about storing numeric data is that numbers might be rounded if they are larger than the specified field column size.
#### Performing Arithmetic Functions
You will never use any of the specific arithmetic functions, but you can calculate the arc cosine, cosine, sine, tangent, whatever, of anyting you want. look them up if you please.
Okay, maybe the exponent/square root or whatever of something.. but probably not.
There are some functions that are less specific and more broadly useful. Such as the `modulo` operator, which is--you guessed it-- the divmod of the SQL world.
Its method signature is `mod(x,y)` and will give you the remainder of dividing one number into another:
```
SELECT MOD(10,4);
```
Although it's typically used with integers, real numbers also work just fine and will give you a real answer:
```
SELECT MOD(22.75, 5)
```
Note that SQL Server has no `mod()` function, it instead uses `%` for finding remainders. Simply write `10 % 4` for example.
Want to find out what one number raised to the power of a second number is? Use `pow()` (SQL) or `power()` (ORacle and SQL Server).
```
SELECT POW(2,8);
```
Since computer memory is allocated in chunks of bytes, you can use this function to determine the exact number of bytes in a certain amount of memory:
```
SELECT POW(2,10) kilobyte, POW(2,20) megabyte, POW(2,30) gigabyte, POW(2,40) terabyte;
```
#### Controlling Number Precision
Four functions can limit the precision of floating-point numbers:
- `ceil()`, or `ceiling()` in SQL Server, which rounds up to the nearest integer
- `floor()`, which rounds down to the nearest integer
- `round()` which rounds from the midpoint up and under the midpoint down, taking an optional second argument for how many digits to the right of the decimal point you want to display.
  For example,
  ```
  SELECT ROUND(35.6834, 2);
  => 35.68
  ```
- `trunc()` just cuts off anything to the right of the decimal point that you don't want. It also takes an optional second argument for how many digits you want to keep.
  ```
  SELECT TRUNC(35.698, 2);
  => 35.69
  ```
  Note that SQL Server has no trunc() function, so the round() function takes an optional third argument that, when present and nonzero, indicates that the numbers should be truncated.
  If the number is negative, you will k
Both trunc and round can take a negative number as the second argument, which will round the numbers to the _left_ of the decimal. Why do this? Well, pretend you can only sell candles
in blocks of 10. If a customer ordered 17, you'd want to do this:
```
SELECT ROUND(17, -1), TRUNCATE(17, -1);
=> 20, 10
```
#### Handling Signed Data
Numeric columns that allow negative values are _signed_, versus ones that only allow positive ones, which are _unsigned_.
If you want to show people's bank account balances, say, well, you could do this which is weird:
```
SELECT account_id, SIGN(balance), ABS(balance) FROM account;
```
So the `sign()` function returns -1 if the account balance is negative, and 0 if it is positive. The `abs()` function
returns the absolute value of the field. So, if the value is -100, the ABS of it would be 100.

### Working with Temporal Data
Temporal data is.. wow, you know? So many different formats. Like, just think about the ways you can describe a data:
- Wednesday, June 5, 2019
- 6/05/2019 2:14:56 P.M. EST
- 6/05/2019 2:14:56 P.M. EST
- 1562019 (Julian format)
- Star date [−4] 97026.79 14:14:56 (Star Trek format)
The complexity owing to format differences are one thing, but _most_ of the complexity actually has to do with your frame of reference.
Enter, the TIME ZONE.
#### Dealing with Time Zones
People all around the world really want noon to roughly coincide with the sun's peak at their location, so there's never been a serious attempt to make everyone use a universal clock (although that would be tits).
Instead we slice the world up into _time zones_. Within a zone everyone agrees on a particular time.
This seems simple enough but add in daylight savings time and it gets dumb. Within some geographic regions, the time is shifted by one hour twice a year
and some do not do this.
Even within a single time zone, different regions may not adhere to DST--so the time agrees for one-half of the year, but be different for the other half.
The computer age has exacerbated the issue because it's not a very computer-friendly cont. people have been dealing with it, however, since the age of naval exploration.
Since explorers might frequently cross time-zones, they decided to use a common point of reference -- the time of day in Greenwich, England -- for timekeeping in the fifteenth century.
Enter GMT, or _Greenwich Mean Time_.
All other time zones can be described by the number of hours' difference from GMT; for example, EST is GMT -5:00, or 5 hours earlier than GMT.
Today we use _Coordinated Universal Time_, or UTC, or "Universal Time", which is based on the average time of 200 atomic clocks in 50 locations around the world.
To return the current UTC timestamp use `getutcdate()` for SQL Server and `utc_timestamp()` for MySQL.
Most DB Servers know the time zone of the server on which they reside and you can modify the time zone if you wanted to.
Maybe you are located in Colorado but service a company on the East Coast,
for example. But if you store stock exchange transactions from around the world, you should use UTC.

MySQL stores two different time zone settings: Global and session, which could be different for each user logged in. You can see both settings with
```
SELECT @@global.time_zone, @@session.time_zone;
```
A value of `system` tells you the server is using the time zone setting from the server on which the database resides. Why is this useful?
Well, if you're in Colorado and you open a session to a MySQL Server on your client's machine in New Jersey, you might change your session's
time zone using the following command so that the times make sense to you.
```
SET time_zone = 'Europe/Zurich';
```
And for Oracle:
```
ALTER SESSION TIMEZONE = 'Europe/Zurich'
```
You have to figure out what your time zone name is obviously.
#### Generating Temporal Data
You can do this in many ways:
- Copying existing temporal columns (duh)
- built-in functions
- building a string representation of the data to have the server evaluate it (needs format knowledge)
##### String representations of temporal data
For date format components, see date format component table.
Each type of column has a default format. If you want to build a string that automatically gets saved as one of these data types, you must use the default format.
Type, Default Format
date, YYYY-MM-DD
datetime, YYYY-MM-DD HH:MI:SS
timestamp, YYYY-MM-DD HH:MI:SS
time, HHH:MI:SS

Obviously, hours are in 24 hour format.
##### String to date conversions
You can use the `cast()` function:
```
SELECT CAST('2020-12-01 15:30:00' AS DATETIME);
```
You can cast anything, dates, times, just use that syntax. When converting a string to temporal syntax, though, you must provide all the components in the required order.
MySQL is pretty lenient about what separaters you can use between components, though:
'2020-12-01 15:30:00' is great
'2020/12/01 15:30:00' is also great
'2020,12,01,15,30,00' is just fine too
'20201201153000' is dandy

##### Functions for Generating Dates
Is your string not in the proper format already? Well, you can just tell SQL which format it is and use a built-in function like
```
UPDATE rental SET return_date = STR_TO_DATE('September 19, 1999', '%M, %d, %Y') WHERE rental_id = 99999;
```
There are tables of formats on the internet. Note that the `str_to_date` function returns a datetime, time, or date object depending on the contents of the format string.
For Oracle, use `to_date()`. SQL Server users get a `convert()` function that's really not flexible--the format string has to comply with one of 21 predefined formats.
If you just want the current date/time, you can just use a built-in function to get one:
```
SELECT CURRENT_DATE(), CURRENT_TIME(), CURRENT_TIMESTAMP();
```
The values returned by these functions are in the default format. Oracle has `current_date()` and `current_timestamp()` but not the current_time. SQL Server only has the timestamp one.
#### Manipulating Temporal Data
##### Temporal Functions that return dates
MySQL's `date_add()` function allows you to add any kind of interval (days, months, etc) to a specified date to generate another date.
For example, want to add a week to today?
```
SELECT DATE_ADD(CURRENT_DATE(), INTERVAL 7 DAY);
```
The second argument is composed of 3 elements: The interval keyword, the quantity, and the type of interval.
Common types include: second, minute, hour, day, month, year, minute_second (separated by :), hour_second (same), year_month (separated by `-`).
So like, if you were told "hey that rental was actually returned a little later (3 hours, 27 minutes, and 11 seconds) than specified, you need to fix it,
you could do this:
```
UPDATE rental SET return_date = DATE_ADD(return_date, INTERVAL '3:27:11' HOUR_SECOND) WHERE rental_id = 99999;
```
sick.
Or if you figure out that an employee is actually younger than he said by 9 years and 5 months:
```
UPDATE employee SET birth_date = DATE_ADD(birth_date, INTERVAL '9-5' YEAR_MONTH) WHERE emp_id = 4789;
```
Note that SQL Server uses `dateadd` instead, and oracle just as `ADD_MONTHS` that takes in two arguments, what to add it to, and the number of months.
You can select the last day of a month by using `last_day` and passing in a date using the format YYYY-MM-DD. You can pass in a datetime but it'll return a date.
```
SELECT LAST_DAY('2020-12-12');
```
##### Temporal Functions that return strings
Want to extract a portion of a date or time? We gotchu. MySQL includes the `dayname()` function for example to determine which DOW. Example:
```
SELECT DAYNAME('2019-09-18');
```
There are many functions but the `extract()` function is the most flexible. It's also been implemented by Oracle Database.
You use it the same way you use `date_add()`. For example:
```
SELECT EXTRACT(YEAR FROM '2019-09-18 22:13:04');
```
Note that SQL Server doesn't have extract, but it has `datepart()`:
```
SELECT DATEPART(YEAR, GETDATE())
```
##### Temporal Functions that Return Numbers
You can take two dates and return the interval between them (number of days, weeks, years, etc). MySQL has the `datediff()` function which returns the number of full days between two dates.
For example if you want to know how long my summer vacation is you could do:
```
SELECT DATEDIFF('2021-09-01','2021-06-01');
```
Note that the second date is the first argument. Switching the arguments would give you a negative number.
This function ignores time of day completely, therefore you could pass in a `datetime` as an argument and it would make no difference.
Note that SQL Server has the `datediff` function too but you can specify the interval type so it's more flexible. Like so: `SELECT DATEDIFF(DAY, '2021-03-04', '2021-02-01')`
In Oracle you simply subtract one date from the other and it will give you the number of days.


### Conversion Functions
Every db server includes some built-in functions to convert data from one type to another. The `cast()` function is a good one and is included in MySQL, Oracle, and SQL Server.
To use it, provide a value/expression and the type to which you want the value converted. Such as:
```
SELECT CAST('123' AS SIGNED INTEGER);
```
`cast()` converts from left to right. If in this example a non-numeric character were found, the conversion would stop without error. So this:
```
SELECT CAST('123r5' AS SIGNED INTEGER);
```
Would give us "123". The rest of the string is tossed away. We are, though, given a warning to let us know about this.
Note that if you want to convert a string to a date, time, or datetime, you have to use the default formats. `cast()` functions cannot accept format strings. If your string is not of the
correct format, you can just use `str_to_date()` or something.

# Grouping and Aggregates
Data might be stored in one way--a very granular way--but perhaps you want to view it differently. Perhaps in.. grouping and aggregates.
## Grouping Concepts
So for an example of this we can think about a query someone might want to run. If you want to know which customers have rented the most films so you could give them a coupon, you _could_
run this query and get the information: `SELECT customer_id FROM rental;`. That would give you what you need, technically.
But, of course, that's too many records to parse by just reading it. We have 599 customers and 16,000 rental records. You could paste it in excel, but what if we could get SQL to do the work?
Well, if you group the rentals by customer ID you'll get back a result set with one row for each customer instead of 16k rows.
```
SELECT customer_id FROM rental GROUP BY customer_id;
```
This is nice, but it doesn't tell us what we want. For that we use an `aggregate function`. To see how many films each customer rented, use the `count()` function.
```
SELECT customer_id, count(*) FROM rental GROUP BY customer_id;
```
`count()` counts the number of rows in each _grouping_. The asterisk tells the server to count everything in the group.
Now, in this query we're just interested in looking at which customers have rented the most films, we didn't define how many customers we wanted returned (and in this query it would be
inappropriate, we have no idea what our data looks like). So we just want to look at all of them. We can tell at a glance what we need to know if we just add an ORDER BY clause:
```
SELECT customer_id, count(*) FROM rental GROUP BY customer_id ORDER BY 2 desc;
```
That orders by the count.. which is column 2 I guess?
With sorted results you can see who has rented the fewest and most films at a glance.
If you want to filter out some undesired data -- say you know you don't want anyone with under 40 films as a rental count -- you need to filter based on grouping data.
That is, the `group by` clause runs _after_ the `where` clause so you _cannot add filter conditions to your where clause_. So for example this:
```
SELECT customer_id, count(*) FROM rental WHERE count(*) >= 40 GROUP BY customer_id ORDER BY 2 desc;
```
will not work.
You can't refer to your aggregate function `count(*)` in your `where` clause because the groups _have not yet been generated_ when you reach that line. Capice?
But don't despair, you can filter using the `having` clause:
```
SELECT customer_id, count(*) FROM rental GROUP BY customer_id ORDER BY 2 desc HAVING count(*) >= 40;
```
Now your query will do what you want.

## Aggregate Functions
These functions perform an operation over all rows in a _group_. Every db server has its own set but there are common functions across all the major ones:
- `max()` returns the maximum value in a set
- `min()` returns the minimum value in a set
- `avg()` returns the average value of a set
- `sum()` returns the sum of all values in a set
- `count()` returns the number of values in a set
Example query to use all of them:
```
SELECT MAX(amount) max_amnt, MIN(amount) min_amnt, AVG(amount) avg_amnt, SUM(amount) total_amnt, COUNT(*) num_payments FROM payment;
```
Now we get the results we want with the headers max_amnt, min_amnt, etc.
### Implicit vs Explicit Groups
If there's no `group by` clause there's by default a single _implicit_ group, which is all rows of the payment table in the previous case, for example.
But you probably want additional columns. Like what if you wanted the previous query to execute the same aggregate functions, but for _each_ customer instead of all?
In this case you'd want to retrieve the customer_id column as well. But of course if you just `SELECT customer_id, MAX ... FROM PAYMENT`, you'll get an error:
`In aggregated query without GROUP BY, expression #1 of SELECT list contains nonaggregated column`
You have to _explicitly_ say how you want the data to be grouped or SQL will not know what you are talking about:
```
SELECT customer_id, MAX(amount) max_amnt, MIN(amount) min_amnt, AVG(amount) avg_amnt, SUM(amount) total_amnt, COUNT(*) num_payments FROM payment GROUP BY customer_id;
```
Oh snap. Now the server knows to group together rows having the same value in the `customer_id` column, and then to apply the five aggregate functions to each of those groups.
