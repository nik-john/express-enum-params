## Enumerable Route Params in Express

> Did you know you could constrain the values of route params in Express?

Express is almost endlessly flexible, which is why it is one of the world’s most popular Web Frameworks. Among the array of great features that express has, is the built-in routing mechanism.

Routing is the entry point to a Web application, and having a flexible routing mechanism of supreme importance. In express, setting up an application and designing a route is super-simple. The only requirement is to have NodeJS installed.

### Setup

First let’s do the groundwork.

```
mkdir myapp
cd myapp
npm init # Enter entry point: index.js when prompted. Ignore everything else
npm install express --save
```

### Hello world
Now, add let’s create our index.js file
```
const express = require('express');
const app = express();
app.get('/', function(req, res, next) {
  res.send('Hello world!');
});
app.listen(3001, function() {
  console.log('App is listening on port 30001');
});
```

Now, `http://localhost:3001/` should return ‘Hello world!’ on your browser

Note: I have used ES6 syntax here, but var will work just as well as const

Now that we have set up a basic Express app, and a home (/) route, let’s look at some more simple cases. You can pass in a URL parameter to Express using the (:) notation. Say your Hello World app has users in different locales around the world, so you’d want the locale to be appended to your URL for clarity. Let’s add a new route for this:
```
app.get('/:locale', function(req, res, next) {
  res.send('Hello '+ req.params.locale);
});
```
Now, http://localhost:3001/us will give you ‘Hello us!’. In fact, whatever you ass as your first URL parameter will be displayed as is, in your response.

But what if we want to restrict the values of our URL param?

This is a common use case, especially in scenarios like the one above. Say the Hello World app only supports two locales, us and uk. Now, this means that if the user enters /in, the page should not render the ‘Hello <locale>’ message. In other words, we want an enumerable URL parameter.
Fortunately, Express does its URL routing using a module called path-to-regexp. 
path-to-regexp turns an Express-style path string such as /foo/:bar into a regular expression.
Here’s an example of what this module does to a path
```
var keys = []
var re = pathToRegexp('/foo/:bar', keys)
// re = /^\/foo\/([^\/]+?)\/?$/i
// keys = [{ name: 'bar', prefix: '/', delimiter: '/', optional: false, repeat: false, pattern: '[^\\/]+?' }]
Therefore, it’s quite clear that you can use all kinds of Regular Expression madness on your Express Routes. Let’s use this concept to restrict the values that our locale param can take.
app.get('/:locale(us|uk)', function(req, res, next) {
  res.send('Hello '+ req.params.locale);
});`
``
Now, we see that the we get a valid response only for the locales us and us, because we have used the unary pipe (|) operator to enumerate valid values for the param.

