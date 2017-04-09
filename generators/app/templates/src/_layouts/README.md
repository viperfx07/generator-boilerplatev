# Layouts

This "Layouts" folder is designated for all page layouts.

## Example

An example layout:

```jade
extend ./base

// Add extra stylesheets
block append stylesheets

block content
  //- Provides layout level markup
  .layout-wrapper.two-col
    block first
        //- Add first column content here
    block second
        //- Add second column content here

// Add extra scripts
block append scripts
```

> NOTE: The `append stylesheets` and `append scripts` blocks allow you to add on any layout-specific scripts or stylesheets.
> The `content` block is overriding the parent `base.jade` file's block by the same name since we are extending from it.
> The `first` and `second` blocks can contain default markup, but also allow you to extend from this layout and overwrite them.
> You can read more about extensions and blocks on the [Jade website](http://jade-lang.com/reference/)