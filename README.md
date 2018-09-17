# BoilerplateV Generator [![npm version](https://badge.fury.io/js/generator-boilerplatev.svg)](https://badge.fury.io/js/generator-boilerplatev)

A generator to scaffold out the front end boilerplate using BoilerplateV. BoilerplateV itself is an extensive HTML5 framework for building robust web sites utilising [Pug](https://pugjs.org), SCSS/PostCSS with [Gulp](http://gulpjs.com). The boilerplate is based on [Yeogurt Generator](https://github.com/larsonjj/generator-yeogurt). The differences are:
- Pre-selected HTML (Pug) and JS preprocessor (Webpack)
- ES6 by default
- Utilised with useful CSS utility classes (inspired by [Tachyons](http://tachyons.io/))
- and many more

# Table of Contents
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [HTML](#html)
- [CSS](#css)
- [JS: Vanilla JS + jQuery](#js-vanilla-js-jquery)
- [Gulp Workflow](#gulp-workflow)
- [Issues / Todo](#issues-todo)
- [Multiple Sites](#multiple-sites)

>Notes:
>
>- gulp-sass though using node-sass options, can't make a sourcemap without gulp-sourcemaps
>- for browsersync, because using node-gyp, see INSTALLATION part on https://github.com/nodejs/node-gyp
>   P.S On my home machine (Win10), it works fine without installing the requirements
>- To install latest and save to dev a module => yarn add <module>@latest --dev

# Requirements
1. Node >= v8.x
2. Python (this is required by imagemin, but without it, it works just fine)
3. Yarn (alternative of npm but faster, so it's recommended to use)
4. Gulp (run **npm i -g gulp** if you don't have it)

# Getting Started

This generator utilizes [Yeoman](http://yeoman.io/) and [Gulp](http://gulpjs.com/) to scaffold out projects, automate tasks, and manage front-end dependencies respectively. If this is your first time here, it is recommended you [read about these tools](http://yeoman.io/learning/index.html) before proceeding.

## Installation
There are a few dependencies that this project relies on:

> NOTE: For OSX users
> You may have some issues compiling code during installation of packages. Please install Xcode from App Store first. After Xcode is installed, 
open Xcode and go to ***Preferences -> Download -> Command Line Tools -> Install*** to install command line tools.

> NOTE: For Windows users
> You may have some issues compiling [BrowserSync](http://www.browsersync.io/) during installation of packages. Please go to [http://www.browsersync.io/docs/#windows-users](http://www.browsersync.io/docs/#windows-users) for more information on how to get all the needed dependencies.

### Node.js
Check to see if you already have Node installed. Do this by bringing up a terminal/command prompt and type `node -v`. If the response shows a version at or above `v8.x`, you are all set and can proceed to installing Yeoman, Gulp, and Bower. If you see an error and/or your version is too low, navigate to the [Node.js](http://nodejs.org/) website and install Node from there.

### Yeoman & Gulp
Once you have Node installed, make sure you have these tools by opening up a terminal/command prompt and entering following commands:

| Command  | Response
|---------- |:---------:
| `yo --version`  | at or above `v1.2.1`
| `gulp -v` | `gulp-cli` at or above `v0.3.9`

If you get any errors and/or you're version(s) are too low, you should run `npm install -g yo gulp`. 
This will install both tools and update them to their latest versions.

### BoilerplateV
Now that you have all the needed dependencies, you can install this generator with the following command: `npm install -g generator-boilerplatev`

That completes installation! So at this point you should have all the needed tools to start working BoilerplateV.

## Setup
When starting a new project, you will want to: open up a terminal/command prompt, make a new directory, and navigate into it.

```
mkdir my-new-project && cd $_
```

then, run the BoilerplateV generator.

```
yo boilerplatev
```

Follow all the prompts and choose what suits you most for the project you would like to create. When you finish with all of the prompts, your project scaffold will be created and all dependencies will be installed.

> NOTE: If you choose to `skip installation` option, no dependencies will have been installed and your gulp tasks will NOT work. 
You will need to run `yarn` in your project's root directory in order to get started running automated tasks

Once everything is installed, you will see a project structure like below:


```
├── gulp/                      	# Folder for gulp tasks
├── www/                     	# Folder for production www output
├── tmp/                       	# Folder for temporary development output
├── src
|   ├── _css                  	# Global css, mixins, variables, etc
|   |   └── main.scss         	# Main stylesheet (import everything to this file)
|   ├── _data                  	# JSON files that add data to templates
|   ├── _fonts                	# Fonts (including icon font)
|   ├── _icons                	# Icons (svg files) that will be generated as the icon font (default: g-icons.woff,svg,...etc)
|   ├── _img		           	# Images
|   ├── _js					  	# Global js, base classes, etc
|   |   └── main.js           	# Main bootstrap file
|   ├── _layouts               	# Layout structure for app
|   |   └── global.pug
|   ├── _mixins               	# Pug mixins
|   ├── _modules               	# Reusable modules (curretly not implemented)
|   |   └── link
|   |       ├── __tests__
|   |       |   └── link.spec.js
|   |       ├── link.pug
|   |       ├── link.js
|   |       └── link.scss
|   ├── _partials             	# Reusable jade partials
|   ├── index.pug             	# Homepage template
|   ├── favicon.ico
|   └── robots.txt
├── gulpfile.babel.js         	# Gulp task configuration
└── package.json             	# Dependencies and site/folder configuration
```

Congratulations! You should now have successfully created a BoilerplateV project and are ready to start building out your site/app.

Now you can run the following gulp tasks:

- `gulp` for testing and building a development version of your site.
- `gulp --production` same as `gulp` but builds a production version of your site.

You can learn more about what tasks are available in the [gulp tasks](#gulp-workflow) section.

## Configuration

In the `package.json` file, within the root of the generated project, you have the ability to configure some project settings:

### Site
| Setting | Description |
|---------|-------
| host    | Host URL of the development server (browserSync)
| port    | Port of the development server (browserSync)
| baseUrl | Root directory of your site

### Main Directories
| Setting | Description |
|---------|-------
| source      | Source folder for all development files)
| destination | Build folder where production version of site is generated
| temporary   | Temporary folder where development server files are generated

### Source Directories
Folders relative to the `source` configured directory

| Setting | Description |
|---------|-------
| [data](#data-files) | Data folder where JSON/YAML files are loaded into templates
| scripts  | Scripts folder where all `.js` files are located (main.js must be in root of this folder)
| styles   | Styles folder where all stylesheet files are located (main stylesheet must be in root of this folder)
| modules  | Modules folder where all reusable code should live)
| layouts  | Layouts folder where all layout templates should live)
| images   | Images folder where all `.png, jpeg, jpg, svg, gif` files should live


### Entry files
Files that should be searched for and created by build tasks.
File strings and [Globs](https://github.com/isaacs/node-glob) can be used to process desired file(s).
Ex: `main**.js` will process all files that start with `main` and end with `.js`

| Setting | Description |
|---------|-------
| js     | Tells webpack what file(s) to bundle and generate at your desired build target
| css  | Tells your stylesheet preprocessor (Sass) what file(s) to generate at your desired build target

# HTML
It will be generated using Pug (was Jade)

# CSS
It will be generated using SCSS with the concept of BEM (Block Element Modifier) with ITCSS (Inverted Triangle CSS)

## Framework
Default: [Bootstrap](http://getbootstrap.com/). The most important files for Bootstrap in this boilerplate are **_settings.bootstrap.scss** and **_generic.bootstrap.scss**

## ITCSS 
(ref: https://speakerdeck.com/dafed/managing-css-projects-with-itcss)

Managing CSS at scale is hard; and a lot harder than it should be. ITCSS is a simple, effective, and as-yet unpublished methodology to help manage, maintain, and scale CSS projects of all sizes. 
In this talk we’ll take a sneak peek at what ITCSS is and how it works to tame and control UI code as it grows.

The structure:

1. **Settings** - global variables, config switches, brand colours, etc.
2. **Tools** - Globally available tools, public mixins and helper functions.
3. **Generic** - Ground-zero styles (normalize.css, reset, box-sizing). Low specificity, far-reaching.
4. **Base** - Unclassed HTML elements (H1-H6, basic links, lists, etc). Last layer we see type selectors (e.g. a{}, blockqoute {}).
5. **Utilities** - generic utility, not an object. It's like win but without !important
6. **Objects** - Cosmetic-free design patterns, OOCSS, begin using classes exclusively, agnostically named (e.g. .ui-list {}).
7. **Components** - Designed components, chunks of UI, still only using classes, more explicitly named (e.g. .product-list {}).
8. **Theme** (optional).
9. **Win/Trumps** - Helpers and overrides. Usually carry !important.

**ITCSS** benefits:
* Manages source order
* Filters explicitness
* Tames the cascade
* Sanitizes inheritance

## BEM
(ref: http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

**Important note:**
*Just because something happens to live inside a block it doesn’t always mean is is actually a BEM element*

## Icons

I'm using gulp-iconfont to generate fonts. The SCSS file is generated from the src\_icons\icons_template.scss, which results in 03\_generic/\_generic.icons.scss. 

The icons scss follows the Font-Awesome standard, so use it like when you use Font-Awesome, but instead of using .fa, you need to use .g-icon. 

Although the template is similar to **FontAwesome**,  don't use it like .fa.fa-[icon-name], instead just use like **.g-icon-[icon-name]** e.g. .g-icon-facebook (don't need .icon.icon-facebook). 

**Notes** 
"icon" as a class. **Adblock Plus** apparently has a CSS rule to hide icon-[social-icons] elements. This happens for other classes like .footer-[social] as well

## Sprites

I'm using [postcss-sprites](https://github.com/2createStudio/postcss-sprites) plugin to generate a sprite. All you need to do is to put all the images that you want to generate as a sprite in src/_img/sprite/ folder and it will be generated as **sprite.png**. If you want to use it, you can use the sprite mixin **m-sprite(filename)**.

## PostCSS plugins
1. [Autoprefixer](https://github.com/postcss/autoprefixer) - Parse CSS and add vendor prefixes to rules by Can I Use 
2. [Rucksack](http://simplaio.github.io/rucksack/) - A little bag of CSS superpowers
3. [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) - Convert pixel units to rem (root em) units using PostCSS
4. [postcss-sprites](https://github.com/2createStudio/postcss-sprites) - Generate sprites from stylesheets.
5. [postcss-critical-split](https://github.com/mrnocreativity/postcss-critical-split) - A PostCSS plugin that takes existing CSS files and splits out the annotated critical styles into a seperate file.


### Tools/Mixins/Functions
**Important**:
Foundation mixins found [here](http://foundation.zurb.com/sites/docs/sass-mixins.html).

Notes:
It hasn't had any setup the task to generate more than 1 sprite. Please see [here](https://github.com/2createStudio/postcss-sprites) for reference.

## JS: Vanilla JS + jQuery

## Gulp Workflow

### `gulp --production=dev`
Builds and copies out files through compilation of preprocessors (Pug, Sass, etc), Javascript, and optimization of images to the destionation folder (set in `packages.json` under `CUSTOM CONFIGURATION`). _Run this to copy assets to __Assets__ folder in __DEVELOPMENT__ environment_

### `gulp --production`
Builds and copies out an optimized site through compilation of preprocessors (Pug, Sass, etc), minification of CSS and HTML, uglification of Javascript, and optimization of images.  _Run this to copy assets to __Assets__ folder in __PRODUCTION__ environment_

### `gulp`
Starts up a development server that watches files and automatically reloads them to the browser when a change is detected.

## Issues / Todo

1. (FIXED) Source map is not correct.
> This is fixed by changing the outputStyle of the sass to default.

2. Sometimes, browsersync doesn't reload, even though there's no error

3. postcss-import 9.1.0 had an issue with webpack 2.3.3 (https://github.com/webpack/webpack/issues/2411#issuecomment-247313388)


## Multiple Sites

1. **gulp/copy.js** has **copy_otherWWW** which is configured in package.json
This will allow the users to copy the tmp directory to single or multiple other directories (i.e sites directories).
To run this task, type `gulp copy_otherWWW`. But before making and copying js/css to multiple directories/sites, make sure you check the other two tips below. This will prevent duplication that gives you a headache and hard to manage codes.

2. **CSS-wise**, it's BEST to use **ONE main.css** for all of the sites and using theme for specific site.
For example, **siteA** has a theme class **theme--siteA**, while siteB has **theme--siteB** class in the body so that the users can just those classes

3. **JS-wise**, it's BEST to use **ONE main.js** for all of the sites and using **require** to import the specific-site script into the **main.js asynchronously**.
For example, if you look on **_src/js**, there's a folder called partials. Inside it, we can have files / folders depend how you want to structure it, and you can use require as per example to include them asyncly in **main.js**.
If the codes needed all the time, just use import.


