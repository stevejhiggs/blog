---
title: ".net vNext : that's some nice tools you've got there, we'll have them"
date: "2014-05-30T22:12:03.284Z"
description: "The future of .net is copying the best from elsewhere"
---

(intentionally contentious title)

I've been looking over the next version of .net and I thought I'd write down some thoughts on the (pretty massive) changes.

## Opensource all the things

Roslyn, the compiler for .net vNext is already opensource and roslyn will be an alternate compiler in upcoming versions of mono and k and asp.net vnext are being developed out in the open on github (they take pull requests and everything).

## Cloud optimised runtime

This would be better called the "legacy free runtime" but I guess they wanted to save someones feelings :)

The cloud optimised runtime strips out a lot of the legacy cruft that has built up in .net and gives you a stripped down (11meg) version of .net designed for owin based web applications. As of right now the focus appears to be on web apps but I would think that there will be releases of specialised runtimes for other purposes.

## Run everywhere

Roslyn will be used by mono, the cloud runtime reduces the amount mono has to support and mono is now part of the .net devs own testing matrix. There is obviously a strong movement towards making .net the kind of first-class cross platform citizen mono has always hinted at but never been quite able to deliver.

## Project changes in .net vNext

- no project files
- no solution files
- pluggable config system
- no build step in dev, roslyn compiles everything on the fly
- dependancies and references stored in a package.json

This cleans up a lot of xml cruft, well it replaces it with json, but it's a lot less json (existing .config files and even ini files are also supported out of the box). Not needing proj/sln files is great and allows real dev without visual studio.

## Project k

A lot of the new tooling is wrapped up in project k. K allows the following features:

- a self contained .net runtime to be contained entirely within the apps folder
- multiple runtimes to be present (including mono)
- package creation and restoration
- build management
- run against custom builds of .net

## Soooo, what does the node/js community do?

A big driver for the creation of tooling for .net vNext appears to have been looking at the tooling available for other dev platforms and building similar things for .net. I'm fine with that, many of the problems facing .net devs are the same problems other devs face so it makes sense to use similar tooling. For a lot of tools, find the relevent node tool and replace the "n" in its name with a "k"

### Nvm -> kvm

In the node world nvm allows you to choose which version of node you are currently using. You can list installed versions and choose via the command line. Kvm does exactly the same thing for .net. Kvm is a little funkier though as it allows you to choose which .net version you are using on an app by app basis.

### Npm -> kpm

This is the k package manager and it works with the package.json file to download nuget packages for your project. Weather it also makes uploading versions of packages as simple as npm has yet to be seen.

### Grunt/gulp -> k

You can define commands in your package.json that can be ran via the k command line tool. E.g you may have a jshint task that runs jshint against all your js files. You could run this via:

    k jshint

in your projects directory.

K is one of those things that I think may be a step too far. The amount of grunt/gulp tasks that exist and would need recoding to work with k are quite large and it makes sense to me just to use grunt/gulp. That said I can see the attraction of .net native tasks for .net users who don't want to mess around with ruby or node. I wish they had not reused the package.json file though.

Still, nothing to stop you from using grunt/gulp in exactly the way you always have :)

## The k gulf

These new features are all great but exisisting systems will all still work the way .net apps have always worked, you won't be able to use things like the cloud optimised runtime and Kvm though. Due to this .net is effectively going to get split into two. This is especially true of the web app world which will be split into:

- Cloud optimised runtime owin apps
  - self contined
  - web server agnostic
  - os agnostic
  - modern frameworks only
- "Legacy" system.web apps
  - mostly bound to windows/iis
  - needs framework installed machine wide
  - high per-request memory usage
  - modern framework users who have not ported
  - webforms

I think this is a good thing. We have a natural line in the cloud optimised runtime, it has enough benifits that devs will want to move and should bring a level of simplicity to .net development and deployment that has been sorely missing since it's inception.
