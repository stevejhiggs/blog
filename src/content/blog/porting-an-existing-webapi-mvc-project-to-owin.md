---
title: "Porting an existing webapi/mvc project to owin"
pubDate: "2014-05-27T22:12:03.284Z"
description: "Bye bye IIS"
cover: "/images/blog/port.webp"
category: ".net"
---

While researching a talk on the owin/katana stack it occurred to me that I had not actually tried to move a reasonably sized exisisting project from the traditional iis/system.web pattern over to owin.

To fix this I ported my [galleria](https://github.com/stevejhiggs/Galleria) app accross to owin, this app is a combination of mvc, web api and signalR. It was fairly straightforward but it's worth documenting the few snags I hit.

It's worth noting that as this was a combined mvc/api project I could only move it accross to the partially owin helios (iis/system.web) stack. When mvc vNext comes along and mvc can run directly on owin I will finish the port to be a pure owin implementation.

## install the correct packages

To run your app under helios you will need the following nuget packages:

- Microsoft.AspNet.WebApi.Owin
- Microsoft.Owin.Host.SystemWeb - if your project is just web api then don't use this use one of the other hosts instead.

## Move everything out of global.asax and into the owin startup class

Mixing the owin startup class with global.asax appears to cause odd issues due to the order everything gets initialised. I'm sure it could be worked around but it's just easier to move everything accross to the startup class. Your global.asax will probably end up blank....why not delete it :)

## Dependancy injection

When I tried running the app I got di issues. It looks like the resolver just wasn't set. This turned out to be because I was using the boilerplate init code from the unity.webapi package and it injected into the current config which the owin startup class then overwrote. This I fixed by removing the boilerplate unity init code and just adding the following line to my owin startup class:

    config.DependencyResolver =  new UnityDependencyResolver(UnityConfig.GetConfiguredContainer());

After all of this my project was up and running.
