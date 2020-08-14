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
