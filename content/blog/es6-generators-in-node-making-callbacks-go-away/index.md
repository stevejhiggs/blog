---
title: "es6 generators in node: making callbacks go away"
date: "2014-04-21T22:12:03.284Z"
description: "No one likes the xmas tree of death"
---

I am currently getting up to speed with nodejs. One thing that was immediately apparent was that callback nesting lead to code that was difficult to follow.

Lets take the following example, a node script that reads from a file, upper cases it and then dumps the output to another file (note: if you actually want to do this then use a stream as this contrived method is just for explanitory purposes). A simple implementation is as follows:

    var fs = require('fs');
    var srcFilePath = process.argv[2];
    var dstFilePath = process.argv[3];

    fs.readFile(srcFilePath, function(err, data) {
    	try {
    		if (err) throw err;

    		var fileStr = data.toString().toUpperCase();

    		fs.writeFile(dstFilePath, fileStr, 	function(err) {
    			if (err) throw err;
    			console.log('all done:' + fileStr);
    		});
    	}
    	catch(err) {
    		console.log('error!: ' + err);
    	}
    });

A simple read, uppercase, write flow but the async nature of the calls means we must use nested callbacks to acheive the flow we require.

#promises
By using promises we can tidy this up slightly, here I have used q to wrap the calls to node in promises (nfcall) and then we can chain promises together to provide the flow:

    var q = require('q');
    var fs = require('fs');

    var srcFilePath = process.argv[2];
    var dstFilePath = process.argv[3];

    var fileStr = '';

    q.nfcall(fs.readFile, srcFilePath, 'utf-8')
    	.then(function(data) {
    		fileStr = data.toUpperCase();
    		return q.nfcall(fs.writeFile, dstFilePath,fileStr);
    	})
    	.then(function() {
    		console.log('all done: ' + fileStr);
    	})
    	.catch(function (err) {
    		 console.log('error!: ' + err);
    	})
    	.done();

Now this reads a little better but its still a little wordy and nested.

#es6 generators
Generators in es6 look something like this:

    function* incremental() {
    	var n = 1;
    	while (true){
    		yield n++;
    	}
    }

This will return an object that has a next call, calling this will return the value of the next yield. So you can think of the yield as a bookmarked return statement.

So, calling:

    var num = numbers.next()

will return:
{ value: 0, done:false}

calling it again returns:

    { value: 1, done:false}

For those coming from the c# world es6 generators and yield work in pretty much the same way they do in c#.

So, how does this help us? Well we can use a generator to yield promises and provided we have something that understands generators and promises we can have it automatically iterate through the promises. Luckily q can do this:

    var q = require('q');
    var fs = require('fs');

    var srcFilePath = process.argv[2];
    var dstFilePath = process.argv[3];

    q.spawn(function *() {
    	try
    	{
    		var fileStr = yield q.nfcall(fs.readFile, srcFilePath, fileStr);
    		fileStr = fileStr.toString().toUpperCase();
    		yield q.nfcall(fs.writeFile, dstFilePath, fileStr);
    		console.log('all done: ' + fileStr);
    	}
    	catch(err)
    	{
    		console.log('error! ' + err);
    	}
    });

The yields tidy up the flow nicely and give us something that is easy to follow. Executing multiple promises in parrellel is also a simple matter of:

    yield [promiseA,promiseB,promiseC];

#Using co

Rather than using q I prefer to use co (https://github.com/visionmedia/co) which is designed to help with generators and allows for a slightly more features such as nested generators. Co also is what's used in koajs (http://koajs.com) which is a framework based around generators written by the folks who wrote expressjs.

The above example written in co would be:

    var co = require('co');
    var thunkify = require('thunkify')''
    var fs = require('fs');

    var thunkReadFile = thunkify(fs.readFile);
    var thunkWriteFile = thunkify(fs.writeFile);

    var srcFilePath = process.argv[2];
    var dstFilePath = process.argv[3];

    co(function *() {
    	try
    	{
    		var fileStr = yield thunkReadFile(srcFilePath, fileStr);
    		fileStr = fileStr.toString().toUpperCase();
    		yield thunkWriteFile(dstFilePath, fileStr);
    		console.log('all done: ' + fileStr);
    	}
    	catch(err)
    	{
    		console.log('error! ' + err);
    	}
    });

#The downside of generators
##node 0.11 or higher
It's not all magical ponies, using generators in node requires the use of 0.11 or higher (fingers crossed for the 0.12 release to be soon) and even then you will need to pass the --harmony-generators flag to node to allow node to use generators.
##speed
There is some overhead with using generators but to qoute co's intro page: "On my machine 30,000 sequential stat()s takes an avg of 570ms, while the same number of sequential stat()s with co() takes 610ms, aka the overhead introduced by generators is extremely negligable."
##memory
A generator has to bookmark state and as such that state will consume memory, not much memory but memory that traditional callbacks would not have needed.

Like all things generators are not a magical silver bullet but just another possibility in an array of options each with their own tradeoffs. I probably would not use a generator for a simple single level callback but as soon as you start dealing with multiple level or parallel callbacks generators can be invaluable.
