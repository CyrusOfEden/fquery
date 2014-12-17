(function() {

  // Used as a reference to the global object
  var root = (objectTypes[typeof window] && window) || this;

  // Detect free variable `exports`
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Detect free variable `module`
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  // Detect the popular CommonJS extension `module.exports`
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  // Detect free variable `global` from Node.js or Browserified code and use it as `root`
  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
  }

  function runInContext() {
    var d = {};

    <%= contents %>

    return d;
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
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else if (freeExports && freeModule) {
    // in Node.js or RingoJS
    if (moduleExports) {
      (freeModule.exports = d).d = d;
    }
    // in Narwhal or Rhino -require
    else {
      freeExports.d = d;
    }
  }
  else {
    // in a browser or Rhino
    root.d = d;
  }

}).call(this);
