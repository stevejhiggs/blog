---
title: "A backend monorepo - part 1: Bun"
pubDate: "2024-11-30T10:52:03.284Z"
description: ""
cover: "/images/blog/monorepo-flame.webp"
category: "monorepo"
---

As projects get larger code seperation becomes a problem. Just working out the "blast radius" of a change can become extremely difficult. Also as code bases get larger the amount of mental effort it takes to comprehend the codebase increases.

Different languages have different ways to deal with this but a common approach is to split your code up into chunks of code with public interfaces. In this way developers can effectively "black box" the sections of code they are not immediately dealing with.

While most language have some sort of "workspace" system (e.g .net has solutions) the closest js comes is through the use of npm workspaces and monorepo tooling.

### What is hot reloading?

Hot reloading is not having to rebuild/rerun your app every time you make a change. Instead you just save your file and your change gets reflected in your running app.

## Requirements

We want a system that allows us to:

- Seperate our code into apps and libraries
- Code is written in typescript
- Allow changing app + library code and have our change reflected without a manual build/restart step
- Allow libraries to use custom tsconfig paths
- Tests can access library code without special provisions
- Any error traces must refer back to the original typescript code
- The final production build should not contain packages who sole purpose is to allow building

To follow along with the rest of this post I'd recommended [cloning this github repo](https://github.com/stevejhiggs/node-monorepo)

The repo is broken into two, one solution using bun and one using pnpm but both are structured the same:

- apps
  - test-app - the main app to run
- packages
  - my-library - some typescript code in a library that is consumed by the test-app

Both versions can be ran by running the `dev` npm script and can be built for production by running the `build` script.



## Solution 1 - Just use bun

If you can use bun, this is the easiest solution. Bun has built in workspace, hot reloading support and can use typescript natively. The basic bun setup is:

### Create the workspace file

In order for bun to know you are working with a workspace we need to add the following to the root "package.json":

```json
"workspaces": [
  "packages/**",
  "apps/**"
],
```

This tells bun what makes up the workspace. If you then run `bun install` to install packages you should just have a single bun.lock file in the root

### Running in development

Calling `bun run dev` in the test-app folder runs the following: `bun --hot ./index.ts` and will cause the app to run in hot reloading mode and consume the code in the library.

You can test this by making changes to any of the files in the app or the library, your changes will be instantly reflected in the console.

### Building and making sure source maps work

Running `bun run build` generates a single executable in `.dist` with everything embedded. In this way we dont have to worry about packages or even having the bun runtime available in the image...nice!

Unfortunately the other reason we use this mode is that otherwise sourcemaps don't get used :( Apparently this is something that will be looked at in the soon-to-come bun 1.2.

### Do tests work?

Yep, just run `bun test`. Accessing library files work great

### Tsconfig paths in libraries?

Yep, worked without any special configuration

## Sounds good!

The futures pretty bright for working with bun. There are still some wrinkles but its advancing quickly
and the shear amount of platform boilerplate that you can just delete to get this stuff working is incredibly impressive.

There are a few areas that need improving through:

- better sourcemap support
- an equivilent to [pnpms catalog support](https://github.com/oven-sh/bun/issues/4844) allowing package versions to be kept in line accross all parts of the monorepo

Next up **pnpm.....** why do I have the feeling this is not going to be anywhere near as simple?
