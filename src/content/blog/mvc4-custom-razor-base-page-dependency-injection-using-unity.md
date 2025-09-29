---
title: "MVC4 custom razor base page dependency injection using unity"
pubDate: "2013-02-08T22:12:03.284Z"
description: "How to implement dependency injection in MVC4 Razor views using Unity for cleaner, testable code."
cover: "/images/blog/syringe.webp"
category: "dotnet"
---

## What is it?

Sometimes you want information to be available to every view in your project regardless of it’s source (common contextual information). You have a couple of ways of doing this:

- Inject it into every constructor action and add it to every viewmodel.
- Have a common base class for your constructors and viewmodels and use an action filter to inject the common parts - bleugh.
- Somehow inject into the view itself.

The solution I have gone for is option 3. The basic idea is to create a new razor base view class, wire this up in the web.config and then use unity to inject our dependencies. We can’t use constructor injection for this though as mvc does not like that at all; property injection works fine though.

The code shows this better than any explanation and is available here: https://github.com/stevejhiggs/MvcViewDependencyInjection

Note: this doesn’t work for layouts as they seem to exist outside of this process….very odd

## But you’re calling out from the view, this is bad!!!!

I compleatly agree, calling out from the view is bad; I think in this case though that the alternatives are worse. I wouldn’t use this technique for injecting stuff that belongs in the view model but for common contextual dependancies that are used all the time it works great
