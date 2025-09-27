---
title: "Learning python"
pubDate: "2024-08-11T22:12:03.284Z"
description: "Reflections and tips on learning Python from a NodeJs developer's perspective."
cover: "/images/blog/python.webp"
category: "AI"
---

As a relative newcomer to the AI space I was very aware that a significant proportion of the code that exists is written in Python and that as such I needed to to set aside some time to learn.

Learning the basics of a new language doesn't really hold any concerns any more as, after you've learned a few, the process of learning another new language gets simpler and simpler (I'm told this is also true for spoken languages, alas I only speak the one). Mastering the ins and outs of a langauge tends to require building real things in it for quite some time but while all programming languages have differences you mostly find that the basic concepts remain the same and it's a matter of mapping the way of doing things in a language you do know to a language you don't while learning the unique advantages each language has.

There is a catch here though, it's important to learn to write in your new language in a way that is idiomatic for that language, it's not great to attempt to force your newly created Go project into a Java shaped box (I can always tell when a nodejs dev was recently a c# dev when there is an unneeded inversion of control layer stuck in the middle of it).

## Learning how you learn

One thing that will always speed up your ability to learn is knowing how you learn best. Some people prefer to read textbooks, some videos, some start with a specific goal and some meander through the space. Personally I know I learn best when I have a fixed goal I'm trying to achieve and to have that goal be sufficiently complex that I can learn how to structure something properly.

## Building something you know

Rather than building something entirely original I find it helps when learning a new language to re-build something you know quite well. In this way you are focussing on applying the language to the problem rather than working out the conceptual solution to the problem.

As such in my case I'm building:

- An api with a number of small endpoints - done
- A small datastore via Redis - done
- Lintable - done
- Runtime checks on request structures - done
- Structured logging
- Testing - semi-done
- Deployable via Docker
- Structured like it had many endpoints - done

> You can see my work in progress at: https://github.com/stevejhiggs/python-fastapi-experiment

## Articles I've found useful

## Things I like so far

### Batteries included

I'm using FastApi as the base for the api and its a very nice little framework. It has a number of installation modes but in "standard" mode it seems to come with pretty much everything you need to make a high-quality, production grade api.

### Optional typing

This is all new since the last time I looked at Python and as someone who currently spends an lot of his day-to-day in typescript this is a very easy and welcome transition. Typing seems to have been well embraced by the wider Python community and most of the packages I use seem to have types.

### Good VsCode integration

Install the "python" extension and that's pretty much it. You get debugging, language server, test running all in one place.....nice.

### PDM restores sanity

I was tearing my (non-existent) hair out with the state of package and virtualenv management (see below) when I found [PDM](https://pdm-project.org/). This gave me:

- a package file + lockfile approach to packages with the ability to detect and apply available upgrades
- development dependancy support. Things you want a dev to be able to use but don't want to be part of the final image
- Task runner support. E.g `pdm run dev` to start my server in dev mode
- Virtualenv support built in

Thanks to this getting the project running in a virtualenv with the right packages is a matter of running:

```bash
pdm install
pdm dev
```

Rather than the multi-tool monstrosity I had before. With a small amount of config tweaking I also made it so that vsCode automatically uses the correct virtualenv.

## Things I don't like so far

### Package / Python version management

I originally followed a set of resonably recent guides on getting a python development environment set up. I was aware of the fact that packages in python are effectively global to the version of python you are running. As such you use a virtualenv which sets up an isolated version of python and the "pip" package manager. You then use pip to install packages. If you want to save what packages you are using you tell pip to dump its state out to a file using `pip freeze > requirements.txt`.

The requirements.txt file would be the equivalent of a lockfile in other languages. It contains version information not only for your packages but for all sub-dependacies of those packages. I imagine this makes upgrades all sorts of fun.

I had a reasonably working setup based on:

- `pyenv + python-version.txt` - manage different versions of python on a per project basis
- `pyenv-virtualenv` - setup virtualenvs for a project
- `pip` - package management

This worked but going from a git checkout to a running project kindof sucked:

- checkout files
- create virtualenv with correct version of python + correct virtualenv name
- go into directory, hopefully your virtualenv name in python version matches the one you set up
- run `pip -r requirements.txt`
- open vscode, wonder why it shows all your packages as missing, realise you need to manually set the virtualenv

All of this set off "This can't be what people actually do, right?" alarm bells in my head and set me off to go find [PDM](https://pdm-project.org/). Maybe I was using it wrong?

### Getting testing running was much harder than it should be

I'm using pytest for testing and while writing tests themselves was simple, getting the tests consistently running when I ran `pdm pytest` was incredibly painful due to subtle differences in how python resolves files when ran directly and how the pytest executable resolves files. Eventually figured it out with some semi-magical config settings but unfortunately most of the advice online amounted to "I randomly poked and moved files around until it worked and now I don't touch it".

Well that and I spent a number of hours wondering why my test was not running then realised I hadn't actually written one :)

## Overall

So far I'm enjoying my experiences with Python. I would in no way claim what I'm going here is right or idiomatic Python but so far it seems to look like other peoples code and I can now understand their github repo's which is a good sign.