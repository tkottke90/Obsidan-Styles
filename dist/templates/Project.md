<% "---" %>
<%* let newEntry = await tp.user.createProjectFolder(tp) %>
project_name: <% newEntry %>
status: Backlog
date_created: <% tp.date.now("YYYY-MM-DD") %>
date_started:
date_updated:
<% "---" %>
# README

This is the guide you wrote to complete your own projects AND avoid doing them all at the same time.  This README is to remind you what you wanted to do when you created it.  So here we are going to have you fill out some details about your project so we can better keep an eye on the scope of that project and how we can get things completed.

- [[#The System]]
- [[#Getting Started]]

---
## The System

The system I have prepared here is straight forward.  This file used Templater, to create a new directory structure for your project that looks like this:

```
Project/
├─ Assets/
│  ├─ 
├─ Notes/
│  ├─ 
├─ Sources/
│  ├─ 
├─ Project.canvas
├─ README.md   <= You are Here
```

This high level structure aims to be a boilerplate and not a finalized system.  Initially there will be 3 directories which access as pools of resources to pull from.  Similar to a rain collection system, you don't need the whole thunderstorm, you need just enough to drink.  
- Assets
	- Assets store your non-text content.  Images, videos, design files.  This stuff lives off to the side to avoid cluttering up the Notes section.  These probably wont make much sense without the notes anyways.
- Notes
	- Anything you find that may help you with the project and you need to _write_ it down, can go here.  These are where you keep the meat of your notes about the project.  Find a cool painting pattern or a woodworking technique to solve the problem?  It goes here.  Price out parts for a prototype, notes go here.
- Sources
	- Just like the _Assets_, Sources acts as an out-of-the-way space to put notes dedicated to a source.  These files may be much more sparse when they live in this folder as a way to _reference_ a source in the Notes.  If a source is useful you can convert it to a regular note after the project is done.

Again, these are not the end-all-be-all directories but the ones to get started with a structure as opposed to a stack of files.  For example, using the [[Troubleshooting]]  automation would add a troubleshooting folder for you to include in a project that might need it.

The `*.canvas` file is meant to be where connections are made.  This may spawn new notes or just a web of stickies.  This file is the main hub of the project.  Where information can be added, created, deleted, related.  This is the primary designing tool.

Finally the `README.md` file is where you are currently.  It acts as both the instructions and entrypoint for the project.  The **frontmatter** contains a couple of properties for identifying and maintaining the project.  3 are related to dates around the project

> [!IMPORTANT] A word on maintenance
> You will need to maintain the date frontmatter manually.  I have not worked out automation for that yet.  

Additionally we have a **status**.  A status for the project which can either be in one of the following states:
- Backlog - A future project
- Planning - A low effort stage where the project is planned out.  This may include design or time/space for inspiration to strike as well.
- In Progress - I am working on the project
- Complete - I am all done with this project
- Stale - I have been ignoring this project
- Dead - We are never ever ever, getting back together

These can be used with other plugins like Dataview to get dashboards and such.

After the frontmatter we also have the Getting Started section which I hope to use.  It is intended to help you with 3 high level questions for the project.  2 for the starting and 1 after you (hopefully) complete the project.  

So get out there and finish the projects!

---
## Getting Started

Below are questions that I want you to answer about this project.

### Project Description
*Tell us about your project, what will it do or improve?  Who is it for?  Try to avoid setting a goal here and let this be your dreaming space*








> [!INFO] Why describe the project?  
> This is your chance to make your elevator pitch.  This gets at the heart of _why_ we are excited enough about this idea to spend our time and money on it.  This can also become a reminder of why you started doing this in the first place.  What is the source of the passion?

---
### Project Goal
*Tell us about what a completed version of your project looks like.  The clearer you are, the easier the rest of planning will be.*










> [!INFO] Why set a goal?  No one will hold you to it.
>  Something I have struggled with and only really came to understand in my own time.  I have done 100s of projects by just going.  Heck started one the other day.  But I think practicing this goal setting helps you finish instead of just starting.  Yes starting is 80% but for me the dopamine of the last 20% is what I _really_ need to get from a pile of projects to cool stuff.

---
### Reflection
*This is the last step of the project.  This is your opportunity to muse about what went well and what you would do differently.*










> [!INFO] Why reflect?
>  Learning to me is about understanding how the pieces fit together to build larger things.  It is also an opportunity for rewarding yourself.  I personally struggle with that and even reminders (such as "gratitude journals" ) just feel cliche or superficial to me.  Just don't forget to eat the cake you made.  