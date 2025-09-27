---
title: "Why I use ravendb for pretty much all my home .net projects"
pubDate: "2013-03-08T22:12:03.284Z"
description: "Reasons for choosing RavenDB as the database for personal .NET projects, with practical examples."
cover: "/images/blog/raven.webp"
category: "dotnet"
---

People that have talked to me about development will probably have picked up the fact that I love working with ravendb. I guess I have never really gone over why though.

Raven has many advantages:

- It’s fast
- Easy to set up
- Has advanced searching built in
- Replication is simple and reliable
- Has a lovely c# api

However they all pale into insignificance next to one simple fact:

- I rarely (if ever) have to think about how to map my data from my models into ravenDb.

When working with sql databases you pretty much always have to think “ok, I’ve got my model, how do I store it in the db”. Sometimes this may be fairly straightforwards but in the case of parent -> child and other relationships you will have to break your model apart into multiple tables, then worry about relationships, key mapping etc. In raven I just take my object and tell it to store it. In fact the hardest thing about learning ravendb has been taking a step back, looking at my assumptions and seeing they no longer have a purpose. These have included:

- I need to use dto’s - nope I don’t need the mapping.
- I should use a repository - nope, again this it pretty much mapping to and from dto’s.

Because I this most of my projects do not have what you would traditionally consider a “data layer” and I’m fine with that.

Less code is better code and ravenDb lets me spend more time using my data and less time worrying about how to store it.
