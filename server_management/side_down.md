cd /etc/httpd/sites-enabled
sudo rm mysite.conf mysite-other.conf
sudo ln -s ../sites-available/mysite-down.conf
sudo systemctl reload httpd.service

sudo rm mysite-down.conf
sudo ln -s ../sites-available/mysite.conf
sudo ln -s ../sites-available/mysite-other.conf
sudo systemctl reload httpd.service
