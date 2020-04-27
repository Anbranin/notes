# SQL Developer

1. Create manual connection
2. Fill in fields:
username: flex username (keichelm)
password: flex password (lastpass)
hostname: 10.25.25.95 (from digging at their DNS server)
Port: 1521
Service name: UMASS
3. Click connect

4. If your windows are all fucked up, go to the top
Windows -> reset windows to factory settings

5. In the connections window:
- expand T2
- expand Other Users
- expand FLEXADMIN 
- expand flex admin's tables

## VPN:
Group: T2ORACLEVPN
Username: keichelman1184
Password: lastpass

# Initial steps to get SQL Developer working on a mac connected to T2 database
1. Look at the network configuration of the Cisco adapter on a windows
machine that has already successfully connected to their VPN. From this you
should be able to obtain their DNS server address. Right now it is 10.25.25.9
If you go to the connections and statistics tab in the Cisco VPN you can see
the IP addresses
2. $ dig @10.25.25.9 oracle-umass.t2hosted.com
3. This should get you an IP address. In this case The IP address received was
 10.25.25.95.
4. Put that IP address manually in the Hostname portion of SQL Developer.

## Things we haven't solved yet:
have cisco client give us DNS server on the network.
Some people on the internet think it's possible for that to work.

# STEPS

Defining an ORACLE_HOME and environmental variables
Need a tnsnames file. We could set the tns_admin env variable somehow.
- make a tnsnames file without the help of oracle client

Next step: set up a TNSNAMES file.
- set the TNS_ADMIN environment variable
- make a tnsnames file somehow without the help of the oracle client

# TNSNAMES

The tnsnames.ora file is where the Oracle Client stores database connection entries.
These entries contain information that allows the ODBC driver to establish network connections to an Oracle Database, including hostname and port number.
Users must create an entry in this file for each database they wish to access.
The syntax for connection entries is strictly defined, must be formatted correctly.
The tnsnames.ora file is a configuration file that contains network service names mapped to connect descriptors for the local naming method, 
or net service names mapped to listener protocol addresses.

  By default, the tnsnames.ora file is located in the ORACLE_HOME/network/admin directory.
  Oracle Net will check the other directories for the configuration file.
  For example, the order checking the tnsnames.ora file is as follows:
  - The directory specified by the TNS_ADMIN environment variable. If the file is not found in the directory specified, then it is assumed that the file does not exist.
  HOW TO SET TNS_ADMIN environment variable?

  - If the TNS_ADMIN environment variable is not set, then Oracle Net checks the ORACLE_HOME/network/admin directory.

# Oracle Client / Instant Client
The oracle client sets ORACLE_HOME and may provide a DDBC OCI (java database connectivity oracle call interface) driver to connect to the database.

Oracle’s Instant Client is a valuable tool allowing anyone on a Mac to connect to Oracle databases, and is a prerequisite for installing SQL Developer, SQLPlus..
but it does not set ORACLE_HOME

The oracle client is "like a bridge that connects sqldeveloper to the oracle database"

Does Oracle Client provide a JDBC OCI for SQLDeveloper?
Java Database Connectivity (JDBC) Oracle Call Interface (OCI) driver
> The JDBC API is composed of a number of interfaces and classes
> that represent a connection to the database, provide facilities for
> sending SQL queries to a database and help Java developer process the
> results of relational database interactions."

For Mac OSX only the instant client is available. But this client does not bring a sample tnsnames.ora file.
So unless you or an application put that file it's not there.
If you need to create a tnsnames.ora file with proper content, set ORACLE_HOME or TNS_ADMIN env variable.
Instant client has some differences to default client installation. 

The Oracle Instant client does not provide Oracle Home
> Oracle Instant Client provides the necessary Oracle Database client-side
  files to create and run OCI, OCCI, ODBC, and JDBC OCI applications.
  Useful command-line utilities including SQL\*Plus, SQL\*Loader and Oracle Data 
  Pump are also available. Oracle Instant Client simplifies the deployment of applications by eliminating the need for an Oracle home on the client machines.

What kind of application are we running? None, we're just providing a JDBC API hopefully.

Oracle Instant Client 11.2 does not support OSX Mojave.
Oracle Instant Client 12 does not support OSX Mojave.

Important note:
Oracle Call Interface 18.3 can connect to Oracle Database 11.2 or later

Oracle Instant Client 18.1 is compatible with OSX Mojave. It also can connect to OD 11.2 or later. That makes me think Oracle Instant Client 18.1 will work.

1. What is the interoperability of instant client with various database versions?
- an instant client based app can interoperate with any database version that the full oracle client does. 

# Login Information
  keichelman1184 / password stored in lastpass

  port: 1521
  hostname: oracle-umass.t2hosted.com
  SID: UMASS

# Goals
1. Connect to the Oracle VPN
2. Connect MYSQL Developer to the Oracle Database hosted by T2

# DONE:
Downloaded the oracle Instant Client version 18.1 Basic package. It only comes in 64 bit so that may not work, but we can try it.
Well we should download it via homebrew instead because I think I just put the basic package in my downlaods folder.

1. Installed instant client via homebrew
  - brew install instantclient-basic (what that did? unsure)
  - installed instant-client 19.3
  - /usr/local/opt/instantclient-basic

1. Installed AnyConnect Secure Mobility Client
  - Cisco AnyConnect Secure Mobility System Extension successfully enabled (from system preferences)
  - CONNECTED TO VPN

It says OracleClient need that to set up and connect to
32 bit is required flex db using sql developer
# Notes about setup:
Oracle Instant Client 11.2 does not support OSX Mojave.
Oracle Instant Client 18.2 supports Mojave but does not provide a 32 bit version.
Oracle Instant Client does not set ORACLE_HOME, which I need. For the tnsnames.ora file.
I believe that Oracle Instant Client provides me with a JDBC API which is necessary to connect to an Oracle database.
