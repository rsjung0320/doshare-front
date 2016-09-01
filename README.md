[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Build Status](https://travis-ci.org/rsjung0320/doshare-front.svg?branch=master)](https://travis-ci.org/rsjung0320/doshare-front)

# app

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Generators

Available generators:

* [angular](#app) (aka [angular:app](#app))
* [angular:controller](#controller)
* [angular:directive](#directive)
* [angular:filter](#filter)
* [angular:route](#route)
* [angular:service](#service)
* [angular:provider](#service)
* [angular:factory](#service)
* [angular:value](#service)
* [angular:constant](#service)
* [angular:decorator](#decorator)
* [angular:view](#view)

### App
Sets up a new AngularJS app, generating all the boilerplate you need to get started. The app generator also optionally installs Bootstrap and additional AngularJS modules, such as angular-resource (installed by default).

Example:
```bash
yo angular
```

### Route
Generates a controller and view, and configures a route in `app/scripts/app.js` connecting them.

Example:
```bash
yo angular:route myroute
```

Produces `app/scripts/controllers/myroute.js`:
```javascript
angular.module('myMod').controller('MyrouteCtrl', function ($scope) {
  // ...
});
```

Produces `app/views/myroute.html`:
```html
<p>This is the myroute view</p>
```

**Explicitly provide route URI**

Example:
```bash
yo angular:route myRoute --uri=my/route
```

Produces controller and view as above and adds a route to `app/scripts/app.js`
with URI `my/route`

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Preinstall
`npm install karma grunt-karma karma-phantomjs-launcher karma-jasmine jasmine-core --save-dev`

Running `grunt test` will run the unit tests with karma.
