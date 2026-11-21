---
title: "Building videoFn: The Video Editor I Always Wanted"
pubDate: "2026-11-21T10:00:00.000Z"
description: "How a small WebCodecs experiment turned into a local-first, agent-driven video editor that writes its own features, and why it's sold the old-fashioned way."
cover: "/images/blog/videofn.webp"
category: "AI"
---

![The videoFn robot reimagined as a vintage film-editing device on a workbench](/images/blog/videofn.webp)

[videoFn](https://videofn.com/) started as a selfish project. It's the video editor I always wanted, built for me and nobody else. Then I started letting other people try it, and they actually liked it…like really liked it.

I've always been into video and animation. It's why I spent three years as chief architect at Veed, helping build their video editing platform - but that was building an editor for everyone, not the thing I wanted. videoFn itself started as a small experiment around one simple question: can I take an animated HTML canvas and output it to video efficiently?

That sounds like it should be easy. You have a canvas, it's drawing frames, just dump it to a video file. Historically, though, the way people do this is pretty brutal. You spin up a browser in the background, screenshot every frame, and pipe that stream into FFmpeg. It works, but at scale it's awful, and locally it ties up your whole machine and requires complex setup.

I wanted a better way, and two things lined up for me. First, WebCodecs came along, giving JavaScript direct access to the browser's own video encoding pipeline. Second, I wanted a fast way to draw to the canvas, so I looked at using an existing 2D JavaScript game engine. The experiment was simple: could I hook a 2D game engine up to WebCodecs and export video entirely in the browser, with no FFmpeg, no installs, and no headless browser running in the background? Thanks to modern AI coding tools, I got a working prototype together pretty fast. Originally it wasn't even meant for video editing. I built it as the rendering engine for an interactive children's book.

## Kinetic text and opinionated AI

Even though it started as a book renderer, I've always loved making kinetic text videos set to music. The problem is they are miserable to edit. You change one cut early on, the music shifts, and suddenly every single part of the video after that is out of sync. Dealing with those ripple effects by hand is painful.

I realized I already had a rendering engine that could move text around. What if I put a preview window on it, hooked up an AI agent, and let the agent handle rippling my edits?

I've never been against AI video editing, I'd just never seen it done well. Too many products stick a text box onto a normal video editor and let you type out what you would have clicked in the UI anyway. It feels like an old 80s text adventure where you have to guess the magic verb to get anything done. That's not useful.

I wanted the AI to handle the actually hard parts: rippling edits, timing, alignment. More than that, I wanted it to have an opinion. Instead of blindly placing text on top of other text or putting invisible white letters on a white background, it should be able to spot problems and fix them itself.

Another big inspiration was pencil.dev (now pen.dev), which lets you collaborate with AI on graphic design. It was the first time I'd seen a bidirectional MCP server. You could work on a design inside the app, talk to it from your own agent, and go back and forth. I wanted that for video.

So the first version of videoFn didn't really have an editor UI at all. It was just a preview window you could talk to from your local Claude Code (or whatever agent you liked), with WebCodecs handling the export. Even back then, well before Opus 5, it worked way better than I expected.

## When it started writing its own features

Then I added shader support, mostly because I thought it would be cool. Shaders are small programs that run on your GPU and manipulate pixels, and I decided to treat them as assets just like video clips. That meant an agent could write a shader for things like color tinting or small visual effects.

At the time, I was testing the system by feeding it famous marketing videos and asking it to replicate their style so I could see which features I was still missing. One of those videos had a masking effect where a see-through hole in one clip showed another video playing behind it. videoFn has masking now, but it didn't have it yet back then.

When the output came back with that exact effect, I had no idea how it had done it. I remember showing my wife and just staring at it, completely baffled. Then I looked at what it had actually produced: the agent noticed the feature didn't exist, so it wrote a shader to build masking itself.

At that point I thought, holy shit, this thing can write its own features. Because agents know how to write shaders, giving the system the right extension points meant it could do things I never even thought it was capable of. That's been the best part of working on this project. Just the other week, the agent decided on its own to build a particle grid system so it could warp text in 3D, and I was left wondering where the hell that effect had come from.

That was when I started taking the project seriously. I expanded the rendering engine to use more of the 2D graphics engine, and I built out a real interactive editor around it. Talking to an agent works great, and it gets surprisingly good results, but sometimes you just want to grab something and drag it slightly to the left.

## Holding up against newer models

After several months of building it out feature by feature, version 1.3 was a solid little editor. Given the right prompts, it produced great videos and self-corrected its own mistakes. It did everything I originally set out to do with kinetic text.

Right around then, Opus 5 and Opus 5.5 arrived and started being able to produce videos directly. I'll admit I was a bit disheartened at first. I saw the same posts everyone else did, with great-looking videos coming straight out of Opus 5.5, and wondered if what I was building was still useful.

It took me a little while to see the difference. Those impressive raw-model videos take a lot of effort. They need the exact right prompt, a lot of time, and a huge number of tokens. Because videoFn acts as a custom harness for the agent, I was getting great videos back in two minutes using a tiny fraction of the tokens.

I also added local text-to-speech and other on-device models, which made it clear who this is actually for. It's not for professional video editors. A pro will always do a better job than videoFn, and I'm never going to argue with that. It's for people like me, who want a good-looking video without spending their time becoming a video editor.

## Local-first and old-school pricing

videoFn runs entirely locally under a bring-your-own-agent model. You plug in your own local Claude account, your ChatGPT account, or anything else that speaks MCP, like OpenCode. All the supporting models (text-to-speech, edge detection, background removal) run natively on your machine. Nothing gets sent to a videoFn server; your data only goes to whatever model you're already using.

That also means I have no ongoing server costs, just my own time building and supporting the app.

Over the last couple of years, software pricing has gotten pretty predatory. Monthly subscriptions everywhere, constant upsells, features people rely on disappearing, even books people bought vanishing from their accounts. I can't do anything about the rest of the industry, but I can decide how I sell my own software.

So videoFn uses the model we used to have. It's cheap, roughly the price of one or two cups of coffee, you buy it once, and it's yours for life. Install it on your Mac, your spare Mac, your kid's Mac, I don't mind. It doesn't spy on you, it doesn't track you, and whatever you make with it is up to you.

The obvious counter-argument is: why charge at all? Why not just open source it? Two reasons. First, working on this takes a lot of my fairly limited free time, and charging a small amount helps justify that. Second, people tend to value things they pay for more. Open source can attract a lot of entitlement, and I'm not a fan of that.

There's no bait-and-switch either. Everything in videoFn is unlocked to [try for free](https://videofn.com/). The only catch is a big, ugly watermark in the middle of your exported videos until you pay. You don't have to hand over a credit card just to see if it works.

## Version 1.4 and the creativity problem

Up through 1.3, videoFn was a good editor as long as you gave it a detailed prompt. Version 1.4 was a big shift because the focus moved to creativity. What happens when you give it an incredibly vague prompt, like "make a presentation out of this PDF"?

In 1.3, you'd get decent results, but they were frequently pretty dull and all looked fairly similar. That became the white whale: how do you get an agent to be creative with a vague prompt without making everything look the same? Most other AI video tools just have a list of templates, maybe picked at random, so you end up getting the same thing over and over again (oh, it's a talking head video with some text behind it…again).

I spent many weeks iterating on how to make the process more content-driven, more prompt-driven, and more investigative, without falling back on a hardcoded set of outcomes. It's going to be an area of constant research, but I think we've pretty much got there. Comparing a video made from the same vague prompt in 1.3 and 1.4 is a world of difference.

It's one of the things I'm proudest of. In a lot of ways, videoFn can now do what plenty of people pretend their Claude prompts can do. There's a weird catch to that, though: in a space with this much bullshit, building something that actually does what it promises makes people look at you like you're one of the bullshitters.

If you want to see whether it lives up to that, [give videoFn a try](https://videofn.com/).
