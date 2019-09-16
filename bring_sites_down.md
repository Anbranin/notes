# How to bring Web1 down temporarily
cd /etc/httpd/sites-enabled
sudo rm hub-parking.conf  hub-parking-shib.conf
sudo ln -s ../sites-available/hub-parking-down.conf
sudo systemctl reload httpd.service
_do stuff_
sudo rm hub-parking-down.conf
sudo ln -s ../sites-available/hub-parking.conf
sudo ln -s ../sites-available/hub-parking-shib.conf
sudo systemctl reload httpd.service
