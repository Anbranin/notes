`$mysqldump --port 3307 --host umwebdb.umass.edu --user umaps-db1 -p --databases umaps-db1 --result-file sql_dump_file`

OR, more appropriate:

$mysqldump --port 3307 --host umwebdb.umass.edu --user umaps-db1 -p umaps-rails-production > dump_file.sql
