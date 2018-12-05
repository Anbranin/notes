#h1 additional pages in Flexport

Outline and notes t2systems.litmos.com
Click on Course Library > 2018 > Connect handouts and presentations

## What kinds of things can you put in custom pages?
- ONE and only one Boolean (so just a checkbox)
- A next button that goes where you want
- A save button that saves the boolean
- A picture
- A header
Q: Can you set a boolean within a modal?
A: No. It wouldn't be captured in Flex.

## How do you get to a custom page, where does it go? 
- You insert links in a modal that pop up when someone clicks on a link like "buy a permit"

## How does the boolean value get saved?
- It gets captured in Entity. The only table

## Setting up your first custom page

Admin menu -> Search Settings. Type in the box: "Text Display Pages"

Everything you need is under this one setting. 
The pages are separated by subnames. The subnames are what encode all your links
like so: ../per/index.aspx (that's the permit index page)
CMN/textdisplay.aspx?type=SUBNAMES

The only type of field that can be captured: A boolean
The only table that can be edited: Entity.
So far, Custom Fields are where it's at.

Q: Can you capture other-than-custom fields?
A: unsure
