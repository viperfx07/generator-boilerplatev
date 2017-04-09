# Scripts

This "Scripts" folder is designated for all of your global stylesheet files.
The key file in this folder is `main.js` as it is designated as your bootstrapping file (intializes all your scripts) and is included in the `base.jade` file

By default, ES6/2015 features are enabled in your scripts by using [Babel](https://babeljs.io)

## Adding third-party script libraries
Odds are that you will need to add some third party libraries to your project at some point. 
To do so, it is strongly recommended that you install them using [NPM](http://npmjs.com/):

```
npm install [package name] --save
```

Once installed, you can access scripts within your JavaScript files like so:

```js
// Example using jquery

// ES5
var $ = require('jquery');

$(function() {
  console.log('Hello');
});

// ES6
import $ from 'jquery';

$(() => {
  console.log('Hello');
});
```