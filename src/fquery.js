;(function() {
  'use strict';

  // Used as a reference to the global object
  var root = window || this;

  function runInContext() {
    var f = {};

<%= contents %>

    return f;
  }

  var f = runInContext();

  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose fQuery to the global object even when an AMD loader is present in
    // case fQuery is loaded with a RequireJS shim config.
    // See http://requirejs.org/docs/api.html#config-shim
    root.f = f;

    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define(function() {
      return f;
    });
  } else {
    // in a browser or Rhino
    root.f = f;
  }

}).call(this);
