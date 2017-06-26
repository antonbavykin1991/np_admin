'use strict';
/* eslint-env node */

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'np-admin',
    podModulePrefix: 'np-admin/z-modules',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',

    firebase: {
      apiKey: "AIzaSyA0rUw-ZRnZusN0L3ScOXlrHhi09Hqz75I",
      authDomain: "npadmin-81ba8.firebaseapp.com",
      databaseURL: "https://npadmin-81ba8.firebaseio.com",
      projectId: "npadmin-81ba8",
      storageBucket: "npadmin-81ba8.appspot.com",
      messagingSenderId: "729728249213"
    },

    torii: {
      sessionServiceName: 'session'
    },

    authenticationRoute: 'auth',
    routeAfterAuthentication: 'index',

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
