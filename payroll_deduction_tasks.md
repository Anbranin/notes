Payroll tasks:

On Paydays:
 In the Hub: Payroll Deduction Import (imports INTO the hub from the president's office and INTO Flex from the Hub)
  Hub --> Admin --> Tasks
 In Flex: Payroll Deduction Import
  Task Scheduler

Steps: 
  1. Run the payroll_deduction_import task in the Hub before 10:00AM
    1. Download the file from the president's office which contains a record of
    the payroll deductions that occurred.
    2. Run some checks, create payroll deduction receipts
    3. Upload the file to Flex
  1. Flex automatically runs the PD-IMPORT task at 10:00 AM so it has a record of payments that
  were applied.
Notes: 
* If you forget in the morning but still remember on Friday, you can click 'run now'
  and it will still run and everything will be fine.
* If you miss friday, go in, "run now" then set the next run date in the _past_ (the last time it was supposed to have run)
* Editing the task in Flex? Manually close the payroll deduction task drawer so you can select it in the dropdown.

On Non-Paydays:
  In the Hub: Payroll Deduction Export (exports FROM Flex into the Hub and FROM the hub into the President's office's server)

Steps:
  1. Run the payroll_deduction_export task in the Hub before 10:00AM
    1. Download the file from Flex that contains the people that need to have deductions, and the amount of those deductions
    2. Create payroll deduction requests, and run some checks
    3. Send the file to the president's office
Notes:
* If you miss Friday, the president's pffice will think we missed it -- email them -- Marcus and Nicole
