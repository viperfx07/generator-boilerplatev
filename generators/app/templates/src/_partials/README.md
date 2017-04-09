# Modules/partials

This "Modules/partials" folder is designated for reusable pieces of code that are used within layouts and pages.

## Example

An example link module:

```
└── link
    ├── __tests__
    |   └── link.spec.js
    ├── link.jade
    ├── link.js
    └── link.scss
```

Each module should include a template, javascript file, stylesheet, and unit test file (if doing unit testing).
These files should use the same name, i.e `link`. If you don't need one of the files in a module, feel free to delete it.