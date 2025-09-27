---
title: "In memory acceptance tests part 1: using owin and webapi"
pubDate: "2014-06-01T22:12:03.284Z"
description: "A practical guide to writing in-memory acceptance tests for .NET applications using OWIN and WebAPI."
cover: "/images/blog/speed.webp"
category: "dotnet"
---

As part of the owin research I've been doing I decided to take another look at acceptance tests.

## The Problem

For those are unsure acceptance tests are tests that test the entire system end-to-end, unlike unit tests which test a single element of the system in isolation.

The thing is that acceptance tests tend to be closer to real world usage but they are a lot more painful to setup. Previously when using acceptance testing a webapi project I needed the following:

- get the site up and running on a know url
- have that url hardcoded into the tests
- make some call to the api to tell it to use fixed test data rather than live data
- run the tests and have them call into the running api on the known url.
- if something failed and I want to debug it I have to reproduce the circumstances of the test

That's a whole lot of bleugh.

## Owin.Testing to the rescue

Owin.Testing is an implementation of an owin host that runs entirely in memory, no network binding is needed. I can run up the testing server using:

`var testServer = TestServer.Create<MyApp.Startup>()`

and then I can get an in mem version of the httpClient and make a call using:

```
var httpClient = testServer.HttpClient;
var response = await httpClient.GetAsync("/products/");
```

The great thing about this is that because my tests and app are running in the same process the test code can actually alter the functionality of the app. This would let you alter things like an injected data layer to tell it to use the test data. Also, as the app start point is now your tests you can

So with all this running my acceptance tests consists of:

- no setup, no special urls
- running the tests

I've put up an example of this at https://github.com/stevejhiggs/WebApi-InMemoryAcceptanceTests

There are examples of simple tests and a more complex example that talks to mongo. The mongo example also shows making code changes in the tests
