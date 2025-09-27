---
title: "Source control: working with a safety net"
pubDate: "2012-03-09T22:12:03.284Z"
description: "Best practices for using source control to safeguard your code and workflow."
cover: "/images/blog/safetynet.webp"
category: "learning"
---

As anyone who ever attempted D.I.Y will tell you, tools are important. So this
post will focus on one of the most basic tools in development: Source control.

Does your main development directory look something like this:

Trying to pick out which one is the latest copy is a nightmare. This structure is even more disastrous if this is a shared drive all your developers access.

Today we are going to go over how to sort this mess out and how to keep things simple and organized.

# The basics of source control

Source control is at its core a way of storing versions of files.

- You create a file, it gets added to source control.
- You change that file, the change gets checked into source control.
- You delete a file, the deletion gets checked into source control.

This may seem like extra work for little gain but by carrying this process out we can now do the following things:

- See every change that has occurred to a file over time.
- Regress the source tree to any point in time.
- Easily revert any change including file deletions.
- Get the latest copy of the source tree.
- Easily answer questions like "didn't bob do some work in this area six months ago?".
- Don't need to keep multiple copies of the development tree lying around.
- Easily pull copies of the development tree onto other machines.
- Merge changes easily between different versions of the development tree (e.g port changes from unstable to stable)

# Types of source control

### Check-out and check-in

There are a few source control products that use a "check-out then check-in"
model. This may seem fairly obvious to some people, you get the following
steps:

- Bob wants to work on file A
- Bob gets latest source tree.
- Bob checks out file A
- Bob alters file A
- Bob checks in file A

Both visual sourcesafe and team foundation server operate in this fashion. This is a really bad idea because no one can work on file A while Bob has it checked out, you may think "that's fine we will just not work on the same files at the same time, that seems dangerous anyway". However, in languages like c# you have common project files that are altered whenever a file is added. If this is checked out then no one else can add any files. Even worse is when someone checks out half the the project and then goes on holiday for two weeks. This forces an admin to forcibly revert the check out which leaves Bobs development tree in an odd state he will have real issues bringing up to date when he gets back.

The only reason people use sourcesafe is that it's free and it comes with visual studio. However, there are free alternatives that are infinitely more capable and I will go over these later on.

### Local merging

This is the most common model for source control. In this model we do not have a check-out step, we simply work on our files then check-in the results. If we
get the latest copy of the tree and there are some alterations to files we have altered locally then these changes are merged in. In the event of a merge not being able to be handled automatically (rarer than you may think) then the user is prompted to resolve the merge.

In this model we don't have to worry about people having files checked out so our workflow becomes:

- Bob wants to work on file A
- Bob gets latest source tree and changes are merged
- Bob alters file A
- Bob checks in file A

### Distributed version control systems

DVCS build upon the local merging model. They allow a user to commit to a local repository before pushing the changes out to a central repository. In this way you can retain all the advantages of the source control system without access to the source control server (useful for remote working). These features do add some complexity to the workflow though and this is also reflected in the complexity of the tools.

- Bob wants to work on file A
- Bob gets latest source tree and changes are merged
- Bob alters file A
- Bob checks in file A locally
- Bob connects to the central server and pushes the changes from his local repository to the central repository.

# Overviews of different source control solutions

### Visual sourcesafe (VSS)

"It's from Microsoft how bad can it be?" - Pretty bad actually, scratch that it's a disaster.

#### The good

- It's free.
- If you have visual studio you already have a copy.
- Managers tend to like the fact that it's from Microsoft.

#### The bad

- It uses the awful check-out check-in model so doesn't scale to many users very well.
- It's slow, especially over a network
- keeping track of changes, especially binary files is difficult.
- It corrupts itself over time - this is inexcusable for a source control system.
- Because of the corruption you need to run a sourcesafe equivalent of scandisk every fortnight, this can take several hours and sourcesafe is not usable while it is running.
- Transactions are not atomic - this means you can end up in a state where two users have the same file checked out at the same time or two check-ins overwrite each other.
- Visual studio integration crashes visual studio.
- Only works on windows.
- Moving a file tends to cause that files history to be lost.

#### Overview

There is a reason that Microsoft never used sourcesafe as its internal source control system. Friends don't let friends run sourcesafe.

### Team Foundation Server (TFS)

TFS was created by Microsoft as a replacement for Sourcesafe. It fixes some of the worst features of sourcesafe but unfortunately business processes appear to have been a higher priority than the basics.Before I go on I have to admit that of all the source control systems listed here TFS is the one I have used the least, as such I may be wrong about some of the following.

#### The good

- It's like sourcesafe with the corruption issues fixed.
- It's more than just a source control system, it's also an issue tracker and reporting suite and these are all integrated together nicely.
- Some managers like Microsoft stuff.

#### The bad

- Some basic operations do not seem to be supported. E.g. Looking to see what changes you are about to download.
- It only integrates with visual studio
- The server only runs on windows. There are clients for eclipse and the command line on other platforms.
- Visual studio integration requires the much more expensive "Team System" version of visual studio.
- The server requires the installation of sql server, iss and a whole raft of associated services.

#### Overview

It's slowly replacing sourcesafe in some companies which is definitely a good thing and the other tools it supplies are nice but it still fails pretty hard when compared with other source control solutions.

#### Subversion (SVN)

One of the most common source control systems around and for good reason.

#### The good

- It's free.
- It uses the local merge model.
- The server and clients are available for Windows, Mac OSX and Linux.
- A variety of clients are available.
- Transactions are atomic.
- I have been using it for years and have yet to see any corruption.
- Tools for transitioning from other source control tools are available.
- Regular updates with new features.
- Commercial support available.
- Can either run through it's own server application or integrate with apache.
- Pretty much every tool that builds on source control (build servers etc.. can integrate with subversion).

#### The bad

- Need a connection to the server for any operations to occur.
- Merging and branching is not handled any where near as well as a modern DVCS.

#### Overview

Subversion is an easy to use source control system with mature gui clients. I would highly recommend it as a starting point.

### Bazaar (BZR), Mercurial (HG) and GIT.

These products are part of the new generation of distributed version control systems. They are various advantages/disadvantages to each one but at a basic level each has similar features and issues. Because they are designed to be distributed, remotely hosted options are common (Kiln for mercurial, Launchpad
for Bazaar, Github for Git).

#### The good

- It's free.
- It uses the distributed merge model, allowing for easy remote working.
- The server and clients are available for Windows, Mac OSX and Linux.
- A variety of clients are available.
- Transactions are atomic.
- Tools for transitioning from other source control tools are available.
- Regular updates with new features.
- Merges are fast as they all happen on the local filesystem.

#### The bad

- Gui clients are nowhere as mature as the ones for subversion and this shows in their lack of ease of use.
- The distributed workflow takes some getting used to.

#### Overview

I use Mercurial for home projects using the Kiln remote hosted repository and find it's distributed nature very useful. This comes with an increase in the complexity of the client though and this may be unacceptable to someone starting out with source control.

### Perforce

A commercial source control service (although free for up to two users).

#### The good

- Clients are easy to use.
- Incredibly robust and can easily handle a terabyte of data.
- The server and clients are available for Windows, Mac OSX and Linux.
- Merges are extremely fast.
- Transactions are atomic.
- Regular updates with new features.
- Commercial support.
- Uses a distributed merge model but has a well polished gui.

#### The bad

- Expensive, charged per user.

#### Overview

I used perforce for 3 years and I was constantly amazed at how robust it was, regularly dealing with multi-gigabyte submissions from 100's of developers.

Highly recommended but it can work out to be very expensive.

# We keep all our files on a shared drive and the developers can all access them from there

I have heard the above quote far too many times to be comfortable. This is normally a good sign that the company you are talking to has no real idea about the processes of development and that no-one in that companies development team has put in any effort to get this changed. This model is most common with scripted languages (PHP, ASP etc) and is probably most prevalent in web development houses. By working with this model you can easily overwrite each others changes and you don't know what state each file is in. In fact I
shouldn't even have to explain this to you, you know very well the issues with this model because you live with them every day. Lets look at a simple alternative.

# Setting up source control for a web development house.

Here's the situation:

- We work for a small web development house.
- They currently use the "no this is the latest folder on the shared drive" model of source control
- There is a central development sever that everyone looks at to check their changes.
- For the sake of this example we will assume that it's a windows shop.
- We want to introduce source control but this idea makes the designers nervous.
- We don't have any budget.

This is a fairly common scenario (I have dealt with this on more than one occasion) and the most important thing is that the process should interfere as little as possible.

The source control system I am going to choose is Subversion and the client will be tortoiseSVN.

### Installing the subversion server

Installing a subversion server has always been fairly straightforwards but the
newly released Subversion edge product from collabnet
([http://www.open.collab.net/products/subversion/](http://www.open.collab.net/products/subversion/))
makes it incredibly simple and gives you a nice admin interface all for free.

- Download subversion edge and install it on your server.
- Wait for the server to become available and then login to the web interface.
- Go to Users and change the default admin password.
- Create new users for everyone using subversion and set them to be a standard user.
- Go to Repositories and create a new repository to store your files.

#### Installing the TortoiseSVN client

Download and install tortoise svn at:
[http://tortoisesvn.net/downloads.](http://tortoisesvn.net/downloads.)

### Using TortoiseSVN

TortoiseSVN integrates with windows at the explorer level and just shows some extra menus. Here is an example of a folder under source control with
TortoiseSvn installed:

The green tick means that it is under source control and that there have been no changes to the local files. If you do change a file the overlayed icon will become a red exclamation mark:

If we right-click a directory that is under source control then we get some extra entries in the windows explorer context menu:

On a day to day basis we will be most interested in the following operations:

SVN Update - get the latest changes from the remote server.

SVN Commit - send all the changes I have made locally back to the remote
server.

Other useful operations include:

Show log - show me the history of what I have selected, this could be the entire repository, a single directory or a single file.

Revert - Undo my local change and go back to the version from the repository.

#### Getting our new repository onto our local machine

Before we can work with the repository we need to replicate its contents to our local machine. For this we use the "checkout" command.

- make sure no directory is selected in explorer and right click.
- Tortoise svn will show the "checkout" command".

In the box marked "Url of repository" we need to enter the location of the repository on the remote server. This is available by clicking on the
repository in the administration interface. This shows the full checkout
command for the command line subversion client:

```
svn co http://MYREMOTESERVER/svn/myrepository myrepository --username=admin
```

In this case we only need to enter the http section in the box:

`http://MYREMOTESERVER/svn/myrepository`

Then click the icon of to the right of the box and we can see our remote repository. Navigate to the "Trunk" directory, this will always contain the working copy of your files. Click "select". The contents of the box will then be as follows:

`http://MYREMOTESERVER/svn/myrepository/trunk`

- Select in the box named "Checkout directory" where you would like the local files to live and click "Ok".
- The remote repository will be replicated to your local filesystem in the location you have selected.

You now have an empty repository.

- Create a file in this directory.
- Right click the file and select "TortoiseSvn-&gt;add". This adds it to our repository but the changes are not committed.
- Right click the file and select "commit". This will show a dialog box asked which files are to be committed. The commit is recursive so if you select the root of the repository then you can commit all changed files at once.
- Enter a description of your change and tick the file you have just added.
- Click "ok" and your newly added file gets added to the remote server.
- You will be prompted for your username and password.

Congratulations you have made your first commit (get yourself a beer)!

- Open the file you just added. Alter and save it.
- Notice that the overlay icon has turned red, this shows changes have occurred.
- Right click the file, go to commit and commit the altered file.

The file is now updated on the remote server and we can see a history of all the changes that have happened to the file by right-clicking it and going to "TortoiseSvn-&gt;Show log".

This gives us a pretty good workflow. All the designers need to remember is to right click the main folder and use "update" to get the latest copy of the code. They make their changes and then they "Commit" the changes back again.

### Everyone has a local server

In the above environment you can't really have a central dev server (well, you can but it's a bit beyond the scope of this post). Everyone should be working and testing on their local machine. Pulling and pushing from the remote server. This also provides a great deal of fault tolerance if something goes wrong as well as being generally faster.

# Moaning designers

Your people who are not used to source control will still moan that it "takes ages". Usually up until the first time it saves their arse. It doesn't take too long for a "bob has deleted this by accident" moment to occur and the ability to just recover the latest version from the server rapidly gives people an education.
