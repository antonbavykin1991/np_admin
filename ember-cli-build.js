'use strict';
/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const nodeSass = require('node-sass');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      nodeSass: nodeSass
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('vendor/bower_components/animate.css/animate.min.css');
  app.import('vendor/bower_components/material-design-iconic-font/dist/css/material-design-iconic-font.min.css');

  app.import('vendor/bower_components/material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.eot', {
    destDir: 'fonts'
  });

  app.import('vendor/bower_components/material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.svg', {
    destDir: 'fonts'
  });

  app.import('vendor/bower_components/material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.ttf', {
    destDir: 'fonts'
  });

  app.import('vendor/bower_components/material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.woff', {
    destDir: 'fonts'
  });

  app.import('vendor/bower_components/material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.woff2', {
    destDir: 'fonts'
  });

  app.import('vendor/bower_components/moment/min/moment.min.js');

  app.import('vendor/bower_components/sweetalert/dist/sweetalert.css');
  app.import('vendor/bower_components/sweetalert/dist/sweetalert.min.js');

  return app.toTree();
};
