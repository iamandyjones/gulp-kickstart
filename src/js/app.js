/* global alert */
/* global window */
/* jshint node: true */
/* jshint -W097 */

"use strict";

// Require dependencies
var $ = require('jquery');

/* Application Module */
var c, s, APP = {

    settings: {

        /* The application settings and DOM elements */

    },

    css: {

        /* CSS classes */

    },

    Init: function () {

        /* Map settings */
        s = this.settings;
        c = this.css;

        /* Run init functions */
        APP.Test();

    },

    Test: function () {

      console.log('App is up and running');

    }

};

APP.Init();
