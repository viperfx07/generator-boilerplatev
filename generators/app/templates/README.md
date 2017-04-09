#BoilerplateV 
An extensive HTML5 framework for building robust web sites utilising [Pug](https://pugjs.org), SCSS/PostCSS with [Gulp](http://gulpjs.com). The boilerplate is based on [Yeogurt Generator](https://github.com/larsonjj/generator-yeogurt). The difference is, instead of Browserify, it uses Webpack. By default, it uses Foundation. For Boostrap lovers, you can checkout the [**boilerplatev-bootstrap**](https://github.com/viperfx07/boilerplatev-bootstrap).

>Notes:
>
>- gulp-sass though using node-sass options, can't make a sourcemap without gulp-sourcemaps
>- for browsersync, because using node-gyp, see INSTALLATION part on https://github.com/nodejs/node-gyp
>   P.S On my home machine (Win10), it works fine without installing the requirements
>- To install latest and save to dev a module => yarn add <module>@latest --dev

##Requirements
1. Node = use the latest version
2. Python (this is required by imagemin, but without it, it works just fine)
3. Yarn (alternative of npm but faster, so it's recommended to use)
4. Gulp (run **npm i -g gulp** if you don't have it)

##Getting Started
1. npm install -g **yarn** (if you have no **yarn** installed)
2. yarn 
3. gulp (please see futher notes for production codes)

```
├── gulp/                      # Folder for gulp tasks
├── www/                     # Folder for production www output
├── tmp/                       # Folder for temporary development output
├── src
|   ├── _data                  # JSON/YAML files that add data to templates
|   ├── _img		           # Images
|   ├── _layouts               # Layout structure for app
|   |   └── global.pug
|   ├── _modules               # Reusable modules (curretly not implemented)
|   |   └── link
|   |       ├── __tests__
|   |       |   └── link.spec.js
|   |       ├── link.pug
|   |       ├── link.js
|   |       └── link.scss
|   ├── _partials             # Reusable jade partials
|   ├── _mixins               # Pug mixins
|   ├── _css                  # Global css, mixins, variables, etc
|   |   └── main.scss         # Main stylesheet (import everything to this file)
|   ├── _js					  # Global js, base classes, etc
|   |   └── main.js           # Main bootstrap file
|   ├── _fonts                # Fonts (including icon font)
|   ├── index.pug             # Homepage template
|   ├── favicon.ico
|   └── robots.txt
├── gulpfile.babel.js         # Gulp task configuration
└── package.json              # Dependencies and site/folder configuration
```

Congratulations! You should now have successfully created a Yeogurt project and are ready to start building out your site/app.

Now you can run the following gulp tasks:

- `gulp` for testing and building a development version of your site.
- `gulp --production` same as `gulp` but builds a production version of your site.
- `gulp test` for linting your scripts and running unit tests.

You can learn more about what tasks are available in the [gulp tasks](#gulp-workflow) section.

##HTML
It will be generated using Pug(was Pug)

##CSS
It will be generated using SCSS with the concept of BEM (Block Element Modifier) with ITCSS (Inverted Triangle CSS)

###Framework
[Bootstrap](http://getbootstrap.com/).

Reason:

- It can generate the breakpoint-wis classes for you with a single variable change
- Smaller footprints
- A11y (Accessibility) Friendly
- [Other features](http://foundation.zurb.com/sites.html)

The most important files for Foundation in this boilerplate are **_settings.foundation.scss** and **_generic.foundation.scss**. For you who uses Bootstrap feature branch, they are **_settings.bootstrap.scss** and **_generic.bootstrap.scss**

###ITCSS 
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

### BEM
(ref: http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

**Important note:**
*Just because something happens to live inside a block it doesn’t always mean is is actually a BEM element*

### Icons

I'm using gulp-iconfont to generate fonts. The SCSS file is generated from the src\_icons\icons_template.scss, which results in 03\_generic/\_generic.icons.scss. 

The icons scss follows the Font-Awesome standard, so use it like when you use Font-Awesome, but instead of using .fa, you need to use .g-icon. 

Although the template is similar to **FontAwesome**,  don't use it like .fa.fa-[icon-name], instead just use like **.g-icon-[icon-name]** e.g. .g-icon-facebook (don't need .icon.icon-facebook). 

**Notes** 
"icon" as a class. **Adblock Plus** apparently has a CSS rule to hide icon-[social-icons] elements. This happens for other classes like .footer-[social] as well

### Sprites

I'm using [postcss-sprites](https://github.com/2createStudio/postcss-sprites) plugin to generate a sprite. All you need to do is to put all the images that you want to generate as a sprite in src/_img/sprite/ folder and it will be generated as **sprite.png**. If you want to use it, you can use the sprite mixin **m-sprite(filename)**.

### PostCSS plugins
1. [Autoprefixer](https://github.com/postcss/autoprefixer) - Parse CSS and add vendor prefixes to rules by Can I Use 
2. [Rucksack](http://simplaio.github.io/rucksack/) - A little bag of CSS superpowers
3. [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) - Convert pixel units to rem (root em) units using PostCSS
4. [postcss-import](https://github.com/postcss/postcss-import) - PostCSS plugin to inline @import rules content
5. [postcss-sprites](https://github.com/2createStudio/postcss-sprites) - Generate sprites from stylesheets.

### Tools/Mixins/Functions
**Important**:
Foundation mixins found [here](http://foundation.zurb.com/sites/docs/sass-mixins.html) (if using Foundation).

Notes:
It hasn't had any setup the task to generate more than 1 sprite. Please see [here](https://github.com/2createStudio/postcss-sprites) for reference.

##JS: Vanilla JS + jQuery


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
