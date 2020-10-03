---
title: "Update to the source control article"
date: "2012-08-13T22:12:03.284Z"
description: "TFS bad"
---

I have now used tfs, good god what a terrible monstrosity. The underpinnings may not be too bad but it's interface is horrible. To be honest though all the ui badness pale into insignificance next to one simple issue:

You cannot trust what it tells you.

That alone means you can't rely on it. A number of times now I have had tfs tell me nothing local needs updated when I know for a fact that something in the repository has changed. People who enthuse about tfs will say "ah but there is a force option to make it update anyway" - I don't care, if the common operation does not do the correct thing then don't make it the common operation.

Apparently the in development version of tfs will at least allow it to catch up to every other source control system on the planet circa 5 years ago but unfortunately the world has moved on.

Lets have a look at the other arguments for tfs:

- It's free - bzz wrong! Only if you are an msdn subscriber. Sure most of thepeople looking at it will be but even so the requirements for tfs are so high
  that the hardware requirements are incredibly expensive. In comparison most ofthe alternatives will quite happily live on a tiny box.

- It's got other tools like project management and ticketing - fair enough, unfortunately all of these tools are fairly inflexible and poor. Designed for
  huge overarching teams with multiple hierarchy levels. If it's just you and your team of small developers this all just gets in the way. You can replicate all of this functionality with other, better tools and be much happier (Hello Jira).

- It's got workflow functionality - ok, this is a little harder to replicate. Not impossible and lots of tools will help you out with this. To be honest I
  have never seen a situation where a workflow on check-ins is a good thing. Maybe that's because I have never worked for a massive corperation but I would want workflow on merges, not all check-ins.

In short, if you are thinking of using tfs and you are not the development head of a major corperation (and even then, why are you doing this?), then don't. Spend some time and look into your alternatives because there is a world of fantastic solutions out there you have not considered.

p.s I should say that these are my personal opinions and not those of my employer.
