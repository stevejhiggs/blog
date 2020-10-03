---
title: "Low impact real time monitoring using statsd"
date: "2012-06-15T22:12:03.284Z"
description: "All the metrics, none of the overhead"
---

Sometimes to improve things we need more information. I&rsquo;ve always liked to be able to peek into my running systems to see how various systems are operating. In a distributed or cloud based system this is even more important. If things are going slow how easily can you tell where?

The problem is that (like quantum physics) our attempt to measure something alters it. By this I mean that frequently the systems we want to watch are under high load and by adding extra logging we slow down the very thing we are trying to keep fast.

Enter Etsy's statsd.

Statsd is a simple stat logging system with a great idea, log your events via udp. This means that the source systems don&rsquo;t have to open a tcp connection, they can just spew udp packets at the statsd server. This has a couple of advantages:

- udp packets are much less intensive than a udp connection
- source systems don't have to know or care if the statsd server is up and functioning
- Statsd lets increment any nominated event whenever we want. The counters can also be set to indicate amounts over time.

##Test app
In this simple app I am going to log every time a certain page is accessed in a .net mvc3 app.

##The statsd server

Unfortunately statsd (or more specifically the graphite framework it sits in) does not seem to sit well under iis. So to set it up I followed these steps:

- set up ubuntu 10.04lts under virtualbox
- Follow the instructions at http://geek.michaelgrace.org/2011/09/how-to-install-graphite-on-ubuntu/ to install graphite. Visiting the ip of your ubuntu install should then show the graphite interface.

{<1>}![](https://shiggsatwork.co.uk/content/images/2014/Mar/f1jll3.png)

Install statsd using http://geek.michaelgrace.org/2011/09/installing-statsd-on-ubuntu-server-10-04/ - make sure you change the name of the graphite server in the statsd congfig file. In my case they were both on the same maching so I just changed it to localhost.

##The .net client

I grabbed the example statsd client from https://github.com/etsy/statsd/blob/master/examples/csharp_example.cs and placed it in my mvc project.

At first I tried a naive implementation:

    public ActionResult LoggedAccess(){
    	StatsdPipe pipe = new StatsdPipe("192.168.0.59", 8125);
    	pipe.Increment("logged page access");
    	return View();
    }

This worked but cut my requests per second in half. A little investigation showed that this initialisation of the statsd Pipe was the overhead. With the creation of a simple singleton:

    public sealed class StatsdSingleton {
    	const string host = "192.168.0.59";
        const int port = 8125;

        private static readonly Lazy<StatsdPipe> lazy = new Lazy<StatsdPipe>(() => new StatsdPipe(host, port));

        public static StatsdPipe Instance { get{ return lazy.Value; }}

        private StatsdSingleton(){ }
    }

and changing the controller to look like this:

    public ActionResult LoggedAccess()
    {

StatsdSingleton.Instance.Increment("logged page access");
return View();
}

requests went back up to approximately expected levels.

##The results

I ran apachebench against my test page a couple of times and my graphite interface then looked a little like this:

{<2>}![](https://shiggsatwork.co.uk/content/images/2014/Mar/rjfk06.png)

Benchmarking was troublesome as I was running both virtualbox and iis on the same machine but by setting processor affinity for the various processes I managed to get some semi-accurate results (I will re-run this using a seperate machine for virtualbox at some point)

- No logging - 2956 requests per second
- Logging - 2800 requests per second

That's pretty good in my book. I think with proper seperate machines the logged one would be closer to 2900.

##Other uses

One thing I'm going to experiment with is using statsd to monitor the size of various queues in a distributed system.
