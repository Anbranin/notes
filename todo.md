## NOW

- upgrade ruby on umaps-rails
- Help Ava with session_number
- Add Time-Type as a model
- get the st pax site up to show and tell
- refactor meterlogs

## Later

 - upgrade ruby on umaps-rails

Only make API calls in the Flex directory:
  - Convert everything to spec/models/flex to type: :flex (metadata) - rails helper
  - Eventually, put this in the .rspec folder: 
    rspec ~tag type:flex which will not run the :flex type tests by default
  stub all the Flex calls in one file or method that you call in tests that
  might call Flex. but not in the :flex type tests.
  - rspec --tag type:flex to run the flex tests, put that as a comment

Clean up Academic Year model LIKE YOU CAN USE .MONTH and .YEAR METHODS

Get rid of AB_TEST_OPTIONS completely

Make the meter_audit report page a fucking datatables page?
