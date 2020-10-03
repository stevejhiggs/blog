---
title: "Better scaling for .net api calls using project helios"
date: "2014-02-24T22:12:03.284Z"
description: "Can .net be perfomant?"
---

##What’s helios?
Basically it’s microsoft’s go at building a fully async stack on top of the OWIN web server abstraction middleware. I would recommend any of the following
for more info:

- http://weblog.west-wind.com/posts/2013/Nov/23/Checking-out-the-Helios-IIS-Owin-Web-Server-Host
- http://blogs.msdn.com/b/webdev/archive/2014/02/18/introducing-asp-net-project-helios.aspx
- http://blogs.msdn.com/b/webdev/archive/2014/02/18/supplemental-to-asp-net-project-helios.aspx

So, running a trivial “hello world” (real world example would be better but I want to ensure the web server is the bottleneck) call what do I get:

**Traditional web api, iis:**
~4000 requests per second, 83mb memory in use by the iis worker process

**Helios web api, iis:**
~12000 requests per second, 60mb memory used by the iis worker process

Ok, that’s pretty impressive, just one problem:

##The .net web split
Helios has a lot of promise but right now the landscape is split into 2:

- Packages and projects using a the more up-to-date web stack, they usually have async support throughout and should be ported to run on helios trivially if they do not run already.
- Packages targeting the older web stack, usually lacking any sort of async support.

The problem is that if you app requires the use of any of these second sort of packages your scalability goes right out of the window.

In this way .net would have difficulty competing with something like nodejs on the scalability front simply due to the fact that all the nodejs packages are written with async working at the core, whereas in .net it’s optional.
