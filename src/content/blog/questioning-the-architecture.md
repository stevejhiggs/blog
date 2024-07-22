---
title: "Questioning the architecture"
pubDate: "2013-10-08T22:12:03.284Z"
description: "Maybe we don't need all this stuff?"
cover: "/images/blog/question.webp"
category: "dotnet"
---

Note: It would probably be best to take a look at https://github.com/stevejhiggs/MiniArch which shows the current state of the project.

I think it’s helpful to sometimes take a step back from coding and re-evaluate the practices you tend to practice without even thinking. Over the last year or so I’ve been looking at my approach to architecture and figuring out if the things I am doing genuinely have value or if I am just doing them because they are the “right thing to do”.

## I had a problem, I used an enterprise architecture and now I have a dependency injected IProblemFactory.

Now rather than using RavenDb, MongoDb or one of the other wonderful document based data stores I am going to try to implement the simplest possible ”three tiers + sql” model I can come up with with the provisos that the solution must be easily:

- Deployable
- Testable

Everything else should be as simple as possible. To complicate things this will be modelling a system whose sql database already exists, a “we need a web interface for marketing’s crazy-pants database” problem.

##An upgradable, deployable database
This always used to be an issue with sql databases. Ideally I want to work on a local copy of the db, then, when ready deploy our changes to the running database as easily as possible. I also want to have the same safety net that source control gives us for our code.

## Sql Server Database projects, ssdt and dacpacs

In combination these give us exactly what I am after. Install the lastest sql server data tools for visual studio. Then in the “sql server object explorer” window in visual studio right click your database and select “Create new project”. This creates us a new project consisting of sql files that represent the state of the database. The nice thing is that if you click a sql file you can edit it just like you would a real database object e.g. click a table and you can visually design the table structure. Also because they are just sql files they can be source controlled and refactored just like code (refactoring this stuff is awesome btw…)

Running this database project will spool up a new version of the database in localdb so that I can work disconnected from the main db and test our changes. When I am done with our edits I can then deploy to the main database though one of four methods:

- Direct schema compare between the project and the main db that applies the changes in place.
- Direct schema compare between the project and the main db that generates a change script.
- Create and deploy a dacpac to the main db that applies the changes in place.
- Create and deploy a dacpac to the main db that generates a change script.

A dacpac is really just a file that represents the required data changes from visual studio so that you can give them to your local friendly/rabid dba and they can deploy them using the “deploy dacpac” wizard in sql server 2008+ (If you are using an older version of sql server you can still generate the change scripts).

Any changes made directly to the main db can be synced into your project using the built in sql comparison tools.

## Mo’ data, mo impedance problems.

Now I’m doing most of my home projects in RavenDb I’ve been spoilt in this area but the problem boils down to the fact that the structure of data in a database very rarely matches the structure of your data in your app. As an example think about how you represent child objects in both c# and sql. Now you can either write an awful lot of mapping code or you can use a tool to try and simplify your life (an object relational mapper); I’m going to use entity framework 6.

Ef has come in for a lot of criticism in the past, some of it well deserved (any version less than 4.1 is terrible) but from 5 and above when used in DBContext mode (now the default) rather than ObjectContext (here be mental dragons) mode and with object proxying turned off you end up with a supercharged big brother of LinqToSql that returns poco’s and can talk to many different types of data source.

So to create our persistence layer we need to:

- Install entity framework 6.
- Create a new c# class library project to hold our data persistence layer.
- Add a new “Ado.net entity data model” to our project and point it at our database (unfortunatly it can’t point at the sql project but you can point it at the local db version)

We will then have a nice set of linqable object we can use for database access.

Note: also add a dependency from the persistence layer to the database project, this will ensure the database is always up to date when you build the project.

## Map all the things

We don’t really want to pass dto objects around so we make models that we can use in our service layer. Now rather than writing code to map model <-> dto we can use automapper to do the job for us. Automapper will look at the properties and types of your object, and, in the case that they match it will just automatically populate the values; other more complex values can be specified.

## Look Ma, no repositories!

This is where I start to diverge from what I would normally do. I have traditionally used a repository to stop the data layer from leaking out into the service layer but I’m very aware that this ends up with code that looks like:

    DoodadService.GetAllItems()->DoodadRepository.GetAllItems()

Which just seems a little pointless. So, why do we use repositories?

- To help with the object impedance mapping problem
- To insulate the service layer from the underlying data representation
- To help with testability

In this case the impedance mapping problem is taken care of by automapper, the data representation is mostly insulated by linq and the ef6 data context is mockable with an in memory test doubles(more on that in a later post). Due to all this I consider repositories to be a poor choice in this case that would just create boilerplate and make logic more difficult. Instead the services directly call through to the ef6 linq representation. For a more cohesive argument against orms + repositories see http://ayende.com/blog/3955/repository-is-the-new-singleton.

I’m not saying repositories never have a place, just that the blind use of them could just result in wasting your time.

## View models

As what we are showing in our views could be very different to what is grabbed by the services and the fact that we don’t put logic in our views I will create view models for our views. We do this with auto mapper in exactly the same way as the model <-> dto mapping.

## No Inversion of control

Normally I would inject the layers into each other using an ioc layer but in this case I am instead trying simple default constructor injection. Ioc would still be used

for non-default lifetime objects and cross cutting concerns like logging though.

## So does it test?

In the linked project there is a test project that successfully tests the ef6 stuff in memory. The only test that wont currently work is the read as it doesn’t like the include statement, without the include it works fine. I will update this when I get it working, I suspect it’s something silly I’ve missed.

**Update**: replaced my homegrown dbcontext mocking with the effort library and now all tests run fine.
