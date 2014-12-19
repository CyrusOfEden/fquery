;(function() {
  'use strict';

  // Used to determine if values are of the language type Object
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  // Used as a reference to the global object
  var root = window || this;

  function runInContext() {
    var query = {};

<%= contents %>

    return query;
  }

  var d = runInContext();

  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lo-Dash to the global object even when an AMD loader is present in
    // case Lo-Dash is loaded with a RequireJS shim config.
    // See http://requirejs.org/docs/api.html#config-shim
    root.d = d;

    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define(function() {
      return d;
    });
  } else {
    // in a browser or Rhino
    root.d = d;
  }

}).call(this);
