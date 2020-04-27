`$mysqldump --port 3307 --host umwebdb.umass.edu --user umaps-db1 -p --databases umaps-db1 --result-file sql_dump_file`

OR, more appropriate:

$mysqldump --port 3308 --host umwebdb.umass.edu --user umaps-rail-production -p umaps-rails-production > dump_file.sql

And how to load the mysql file:

mysql -u username -p database_name < file.sql
