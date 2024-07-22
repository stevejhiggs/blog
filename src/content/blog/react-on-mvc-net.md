---
title: "React on mvc.net"
pubDate: "2015-02-21T22:12:03.284Z"
description: ""
cover: "/images/blog/lipstick.webp"
category: "dotnet"
---

I've been playing around with react.js and flux a fair bit and I'd thought I'd take a look and see how the support in the .net world is coming on. For me there are two pieces.

### Client side support

The will always be possible but it would be nice to see a solution integrated the creation of the client side into .net easy. This involved the transformation of the jsx files into the relevent js files.

### Server side support

One of reacts nicest features is the fact that it can be ran on the server then hooked in afterwards on the client side. This means that you don't get the strange pauses, blinking content and seo concerns that you can see in angular apps (note: I'm not against angular, it's horses for courses).

## Reactjs.net

The best support I have found is the project at http://reactjs.net/ this has the following features:

- simple transformation of jsx to js
- bundle support for transformation of jsx to js at runtime
- server side support

The last point is especially impressive. ReactJs.net has acheived this by spooling up a browser runtime in the background and using it to render the views on the server side.

### Performance testing

Serving a simple "hello world" style page:

- no react: 5300 rps, 145mb memory
- client side rendering with reactjs.net: 5300rps, 145mb memory
- server side rendering with reactjs.net: 2300rps, 217mb memory

As expected client side is effectively free but there is a hit with server side rendering. The hit is also proportional to how many times we add a react component to the page. so:

```jsx
@Html.React("CommentBox", new{ })
```

runs at 2300rps but

```jsx
@Html.React("CommentBox", new{ })
@Html.React("CommentBox", new{ })
@Html.React("CommentBox", new{ })
@Html.React("CommentBox", new{ })
```

runs at 1000rps

What I've done here is pretty odd as often you would have one main react component that had child components and the overhead does not occur there. If, instead of an spa style web app you were just wanting to act a sprinkling of react components into your pages then you could start to see significant reductions in speed. I suspect that the server side rendering engine gets compleatly re-ran on every call to html.react, hopefully there may be a way to negate this.

## tl;dr

ReactJs.net gives you great support for client side react. The overhead of server side react maybe too high for heavy use at the moment.
