---
title: "Asp.net Mvc and webforms hybrid"
date: "2012-03-13T22:12:03.284Z"
description: "Mixing mvc and winforms"
---

I was working on a large existing webforms project that the team involved wishes to port to mvc as it is "the new hotness". During a night where I was suffering from insomnia I suddenly began wondering why….what exactly is wrong with the webforms model?

# Things people don't like about webforms

## The fact that the entire page needs to be enclosed by a form

Ok, this sucks. This means that sending of a subset of forms is difficult.
This + viewstate also means that altering the structure of the page clientside becomes difficult.

## The weight of the viewstate

The viewstate is Microsoft's attempt to hide the stateless nature of HTTP and allow asp.net programming to be similar to the windows forms programming model. With that as it's goal it actually does a fairly good job, it's a pretty leaky abstraction at times but it's a useful tool. That said the viewstate gets encoded into your page and if you store lots in the viewstate this can get large very quickly leading to reduced page performance.

Personally I think the viewstate gets a bad rep due to people abusing it. The thing is that most .net controls don't really need viewstate and you are effectively storing a lot of stuff you never use. In .net 4 you should set viewstatemode to disabled on the page level and then enable it only for the controls that absolutely require it.

### Its event driven model

This is different to every other web development language out their, making it difficult for web developers transitioning to .net. Moving to MVC gives developers something similar to other web development languages, but it can be argued that this means that MVC's way of working is very unfamiliar to
existing .net developers.

## Poor testability and separation of concerns

Although thing like the httpcontext make testing difficult it can be argued that this tends to be more an issue with the code that was written by the developers rather than the underlying technology. Admittedly MVC encourages code to be structured in a way that allows for easier testability but it is still easy to write an untestable view.

## Poor integration with client side libraries

This is really the biggest issue. Due to the way that viewstate and id generation functions, integration with things like jquery is made much more difficult. Especially if you wish to make ajax calls to and from the server code. Your choices are as follows:

- Update panels - not really ajax, re-renders the entire page in the background and pokes in the result into the original page. Massive computationally intensive due to this.
- Web methods - a nice simple way of calling server side code but returns in an odd format so calling from jquery is problematic.
- Wcf service - Pre .net4 requires a ridiculous amount of code to set up a wcf service. In .net 4 this is much reduced but it still seems a little like overkill for a simple json request.
- HttpHandler - Probably the lightest weight option but requires a new handler for every ajax method unless you want to implement so god-awful switch statement hack.

MVC can use its controller system to implement really lightweight, easy to implement json calls. Turns out we can use these from within a traditional webforms application.

# MVC REST + Webforms Hybrid Model

Ok so we have a webforms application but we want to use jquery + json to implement a shiny, whizzy interface. So first get MVC running within your webforms application (google around for guidance on this or create a new empty mvc2 app and have a look what visual studio sets up). Then we are going to use MVC to implement a REST interface jquery can call into. Each of the rest methods will either be a GET that returns json or a post that accepts a form
collection. We can use these with jquery to implement a lightweight ajax interface in a traditional webforms application.

Below is a link to a (extremely simplistic) example of a todolist webforms application that uses this model to allow a full ajax interface. The example uses mongodb as it's storage engine and so to have the example execute mongodb will need to be running. It's fairly simple to see how the MVC integration works even without the app running though.

[Download WebForms + MVC Rest
Hybrid](http://www.mediafire.com/?7e740u025i5eajw)

## "But people say mixing the two is bad"

When people ask about mixing the two models online you get a lot of "why would you want to do that, just port the lot to mvc". If I was working on a new development or porting a simple development I would have no issues with this, MVC is a fantastic technology and I would highly recommend it for any new development work. However, if you have an existing app with 1000000's of lines of code then getting "your drag and drop list is only easy to implement if we spend a year rewriting the app frontend" past project planning is an
interesting experience. This hybrid approach clearly separates the two concerns and the jquery + rest callback code can be effectively re-used as-is if you eventually port the application to full MVC.
