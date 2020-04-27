# User Management
Configuration -> User management -> (Pick a user) -> Privileges -> Task Scheduler 
  Enable/Disable System Purge: Allows someone to delete logs - it won't delete everything.
  Task management: Allows someone to edit tasks
  View: Read-only
# Task Scheduler Main Page
Configuration -> Task scheduler

Enabled?: Checkbox can show you which tasks you used in the past and aren't currently scheduled, or currently enabled (scheduled) takss.
Clear: Button will show you literally every task, scheduled and unscheduled.
Headers are sortable

Execution failed: Look at details

## Task Scheduler Menu

# Task Details
Task type - what kind of task it is
Once a task is run you can't delete it
Description is good
name is good
UID is the UID
Historical is a flag that just lets the user know it's no longer in use
process ID: For flex users doesn't have a significance. If it's 0 though that menans the task is not running. Either scheduled for the future or never scheduled. If it has a process ID it means it's
  currently running ont he server -- if you edit it, it could break the process.
You can't reset a task that's not running
before resetting it, more information why it failed

Task failures:
Look at the log, see processed count or error count
Look at the logs in detail: Report Detail
opens the actual log that you can look at in another tab
Exporter tasks NEED to go to the Flex FTP. Has to be the Flex FTP - you can view the path to that in your flex under Configuration -> System Settings -> Importer -> "Customer Importer File Path"
  By the way there should be two slashes \\ in front of the file paths on that screen.
Open thse l\
### Execution Failed
If execution has failed, there may be a process ID. It's safe to reset it in that case.
First, Edit the task that was failing to make it work again:
Edit Task -> Next -> Next -> Define Task Parameters -> (Fix stuff)
Go back to the show page for the task
Reset Task -> See Warning -> Click Finish
### Completed - With Errors

## Good to know items
- If you click run now it may not run now. If you're T2 hosted you're sharing servers with a bunch of other people, so you just get added to a queue. It really means "run as soon as possible"
A good metaphor is that there's a task scheduler service that gets to you when its your turn. Based on the current time, it'll run, when it gets to you, whatever tasks are scheduled to run.
For example if it's 8:30 AM and you have a task scheduled for 8:15 and one scheduled for 8:45, the task scheduler, if it gets to you at 8:50, will run the task scheduled for 8:15 and 8:45.
If it gets to you at 8:30 it'll run just the 8:15 task.
- When you're T2 hosted the team does get a notification about any tasks that have been running for 18 hours or longer.
- Task scheduling.. 
- Depending on the task type, processed count might show as zero but clicking on the log you can see how many records were actually processed.

# Task Scheduler Best Practices
Do not schedule two of the same task type to run simultaneously.
Scheduled reports: Same rules apply.
- Scheduled reports use a task to run and email reports. Scheduling two reports at the same time can create resource conflicts in the task scheduler.
Make sure there is enough time between consecutive tasks (step 1,2, etc) sixty minutes recommended
- sixty minutes is not always realistic - try to leave a minimum of thirty minutes between task start times when tasks are consecutive.
They do have scheduled maintenance hours: Monday mornings from 12:01 to 2AM ET
Daily - mornings from 5AM to 6AM ET
Not all maintenance windows are used
Some tasks must run during the maintenance windows, that's why it's imperative to monitor the taks sdaily to endure they aren't suck (execution failed status)
## Viewing task logs for errors
Erors will show up in red for easy visibility
You can set up a scheduled report to get those errors
Go to T2 Community
Look up "Task error report"
Task Scheduler Error Report
It's a Crystal Report Daily log of task scheduler errors...... maybe I could write my own?
Actual crystap report is a .rpt file, you can download and uploaded it into flex even if you don't have Crystal Reports
Import Import lookup talbes
it has log date/time and log text

How do I write reports? What is an RPT file? 
