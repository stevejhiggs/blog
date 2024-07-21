---
title: "Moving this blog to Gatsby"
pubDate: "2020-10-03T22:12:03.284Z"
description: ""
cover: "/images/blog/flapper.webp"
category: "gatsby"
---

Previously this blog ran on top of [ghost](https://ghost.org/). At the time I set this up this was a great fit. Ghost let me write my posts in markdown and basically got out of the way of me creating.

Ghost is still a great product but I don't think I'm it's target user anymore. It's feature set is now far more than I currently need or would ever use. You can also tell this by it's pricing structure which is geared towards teams, and I had a special grandfathered account that was a lot cheaper than you could get if you signed up now.

So I went looking for a solution that filled my needs which were:

- Able to write posts simply in markdown
- Able to interate quickly
- No fixed pricing, just costs that scale with the number of visits
- Draft post vs published post support
- Https and custom domain support

After thinking a bit I also came up with the following nice to haves:

- Support for also hosting client-side experiments
- Simple image hosting / upload

## Static hosting with Gatsby

[Gatsby](https://www.gatsbyjs.com/) is a static site generator based on [react](https://reactjs.org/). This means that you can create pages locally, connect Gatsby to some content and Gatsby will, at compile time, create static pages that do not require any kind of server. This may be as simple as just rendering out the pages you create but can also involve creating many pages using a template.

For example, lets say I wanted to create my shop using gatsby. Rather than hosting a full cms for managing my product pages I can just create a product page template and connect gatesby to a source of product data. At compile time Gatsby will then create a page for each product using the template and the data you have provided.

## Gatsby data sources

Gatsby has a rich plugin system that can be used to provide [data sources](https://www.gatsbyjs.com/docs/content-and-data/). But they all get exposed via gatsby's internal graphql api. This means that regardless of the source they are accessed in your page in the same way.

One of the options for sources is markdown files. This fits our usecase perfectly.

This blog then can be implemented as:

- A directory containing directories that represent a blog article. Each directory will contain a markdown file and associated images.
- A template file used to render out each blog article
- A homepage that shows a list of all available blog articles

## Gatsby starter

Gatsby has a number of [pre-built starters](https://www.gatsbyjs.com/starters/?v=2) including a number of blog starters that would fit my requirements. But in this case I used the [Gatsby starter blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog/). I then did some customisations on top of it:

- Customised the site details
- Ported to typescript
- Update packages and linted
- Some tweaks to the styling

I then copied accross the articles from my ghost blog. This was pretty easy as they were already markdown. I needed to tweak the image links slightly though.

As this blog is just a set of files now you can see all the code [on github](https://github.com/stevejhiggs/blog)

## Hosting

Looking around at hosting this sort of static site. The place everyone recommends is [netlify](https://www.netlify.com/) and I can see why, it's awesome. Most PAAS offerings could do with going a taking notes. Features include:

- ci/cd
- preview for every PR
- built in support for lambda functions
- server side analytics
- Form handling
- A/B testing
- Auth

And for a simple low traffic blog like mine this is effectively free.

Getting it set up was simply a case of me connecting netlify to my github account....boom! Done.

## So does this meet my criteria?

- Able to write posts simply in markdown - yep, I just create a new folder for the post and a new markdown file.
- Able to interate quickly - when I'm writing the post everything is running on my machine and with hot-reloading the page refreshes as soon as I save.
- No fixed pricing, just costs that scale with the number of visits - yep, in fact with the generous netlify free tier there are no costs at all right now.
- Draft post vs published post support - This is handled via github. Posts are just files like everything else.
- Https and custom domain support - https just works out of the box for netlify. Assigning accross a custom domain just takes a few clicks.

As for my wishlist:

- Support for also hosting client-side experiments - I can create abitrary react pages. It's also possible to inject react components into markdown but that will need a little work on my part
- Simple image hosting / upload - Images are just files in the repo and Gatsby auto-optimises them for me.
