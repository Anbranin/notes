## PRIORITY
- Make a form for Spirit intake that's not garbage. A rails form.
  Problem: backup data and sharing with others. SOlution: Digital ocean droplet.
- update round three to Rails 4
- make a passenger registration form for ST-Pax
- Help Ava with session_number, finish that PR.
- Add Time-Type as a model

## Later
- email that sells permit -- link to entity
- jobapps - make sure issue is made. Need two columns "offered job" and "actually started working"
- custom flex error messages mapping numbers to human readable strings?
- make sure notes only send when box is checked - jobapps
- save for later note required make not required
Wuestion: How ARE bulk opens calculated? Don copies them to a spreadsheet to count them.
ST Dispatch qual: Link to ST Pax on round three
Add edit button to log - stpax
 rake app:update round three
 TPP exceptio notifier fix tests
 time type model round three
 add syste test s to jobapps
 address PRS
flex rescue and retrn actual erors
 - upgrade ruby on umaps-rails
 - make it so tpp::purchase just includes model validations, not inherits from activerecord
 - use strings instead of times on meter audits - and maybe refactor the timesheet shit also
 - learn TS / Take GIS courses
 - convert mocha to rspec mocks on round-three
 - don't send rejection to applicant
 - meterlot active paybycell active need default values
 - config/officer_constants.yml that gets loaded in an initializer is a terrible way to do things.

Only make API calls in the Flex directory:
  - Convert everything to spec/models/flex to type: :flex (metadata) - rails helper
  - Eventually, put this in the .rspec folder: 
    rspec ~tag type:flex which will not run the :flex type tests by default
  stub all the Flex calls in one file or method that you call in tests that
  might call Flex. but not in the :flex type tests.
  - rspec --tag type:flex to run the flex tests, put that as a comment

Clean up Academic Year model LIKE YOU CAN USE .MONTH and .YEAR METHODS

Get rid of AB_TEST_OPTIONS completely
