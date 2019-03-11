### to dump new data into your round_three server
rake db:drop
rake db:create
ssh umasstransit.org 'sudo -n cat /var/lib/pgsql/data/round-three-obfuscated.sql.gz' | gzip -d | psql -d round_three_development
RAILS_ENV=test rake db:schema:load
dropdb round_three_development
createdb -O karin round_three_development
psql -d round_three_development -f filepath/name.sql
OR
gunzip file_path.sql stdout | psql -d round_three_development

### downloaded copy to upload to box for trainees:
ssh umasstransit.org 'sudo -n cat /var/lib/pgsql/data/round-three-obfuscated.sql.gz' | tee round-three-obfuscated.sql.gz | gzip -d | psql -d round_three_development
