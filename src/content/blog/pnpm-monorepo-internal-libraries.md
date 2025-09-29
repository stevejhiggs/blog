---
title: "A backend monorepo with buildless packages: Pnpm"
pubDate: "2025-09-27T10:52:03.284Z"
description: "Structuring a TypeScript backend monorepo using pnpm, with workspace setup, hot reloading, and source maps."
cover: "/images/blog/octopackage.webp"
category: "monorepo"
---

I've been trying to get buildless typescript packages working within a monorepo for a while, and while [it was pretty simple to get it working with bun](https://www.shiggsatwork.co.uk/blog/node-monorepo-internal-libraries/) pnpm and normal node has always proved tricky. Getting it working in local dev mode and tests was always easy but the final build process always broke.

There are ways around it using build vs dev package exports but this still involves setting up your build in multiple places. I just want the library to be a collection of exported typescript files.

Just to recap our requirements:

We want a system that allows us to:

- Seperate our code into apps and libraries
- Code is written in typescript
- Allow changing app + library code and have our change reflected without a manual build/restart step
- Allow libraries to use custom tsconfig paths
- Tests can access library code without special provisions
- Any error traces must refer back to the original typescript code
- The final production build should not contain packages who sole purpose is to allow building

You can [see the source code here](https://github.com/stevejhiggs/node-monorepo/tree/main/pnpm)

## tsdown is the solution

In order to fix this we perform a bundle as part of the build process. The problem is that traditionally bundlers have not supported this particular configuration (I want minimal node service) that well. I've tried various tools but always ran into random issues.

Trying out the latest version of tsdown all my problems appear to be resolved though with a few small tweaks to the default config:

```
// tsdown.config.ts

import { defineConfig } from "tsdown/config";

export default defineConfig({
  entry: "index.ts",
  platform: "node",
  sourcemap: true,
  // make sure that internal packages (@repo/*) are bundled into the output
  noExternal: [/^@repo\//],
})
```

By default tsdown will not bundle in local packages, if our packages are built this is probably the behaviour you want. In our case though we actually want our internal packages to be bundled so that node can just run the final build without any sort of typescript parsing. As all our internal packages start with `@repo/` we can just use `noExternal` to tell tsDown not to treat them as an external package.

If you had a mixture of built and buildless packages you can always list them here individually or use different prefixes for each type.

## Getting sourcemaps working

When I first ran this errors were still not pointing back at the original source. However, adding `--enable-source-maps` to the node command running the final output fixed this entirely. E.g:

```
node --enable-source-maps dist/index.js
```

## What doesn't work?

The only requirement I can't do is:

- Allow libraries to use custom tsconfig paths

as this is just not supported by typescript at all. On the plus side the code depth of a library should be fairly shallow so there is less need to use path aliases.
