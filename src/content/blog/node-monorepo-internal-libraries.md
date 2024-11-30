---
title: "A Hot reloading typescript backend monorepo"
pubDate: "2024-11-30T10:52:03.284Z"
description: ""
cover: "/images/blog/monorepo-flame.webp"
category: "monorepo"
---

As projects get larger code seperation becomes a problem. Just working out the "blast radius" of a change can become extremely difficult. Also as code bases get larger the amount of mental effort it takes to comprehend the codebase increases.

Different languages have different ways to deal with this but a common approach is to split your code up into chunks of code with public interfaces. In this way developers can effectively "black box" the sections of code they are not immediately dealing with.

While most language have some sort of "workspace" system (e.g .net has solutions) the closest js comes is through the use of npm workspaces and monorepo tooling.

## Hot reloading

Hot reloading is not having to rebuild/rerun your app every time you make a change. Instead you just save your file and your change gets reflected in your running app.

## Requirements

We want a system that allows us to:

- Seperate our code into apps and libraries
- Allow changing app + library code and have our change reflected without a manual build/restart step
- Lets us use typescript custom paths in libraries
- Tests can access library code
- Any error traces must refer back to the original typescript code
- The final production build should not contain packages who sole purpose is to allow building


