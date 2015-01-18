function AssertionError(message) {
  this.name = "AssertionError";
  this.message = (message || '');
}

AssertionError.prototype = new Error();

function suite(name, func) {
  console.groupCollapsed(name);
  func();
  console.groupEnd(name);
}

function xsuite(name, func) {
  console.groupCollapsed(name);
  console.groupEnd(name);
}

function test(feature, func) {
  if (_.isFunction(feature)) {
    func = feature;
    feature = '';
  }
  try {
    func();
    pass.push(feature);
    console.log('%c' + feature, styles.pass);
  } catch (e) {
    fail.push(feature);
    console.log('%c' + feature, styles.fail);
    console.log('%c' + e.message, styles.fail);
  }
}

function xtest(feature, func) {
  if (_.isFunction(feature)) {
    func = feature;
    feature = '';
  }
  console.log(feature);
}

function equal(a, b) {
  return _.isEqual(a, b);
}

var assert = {
  equal: function(a, b) {
    if (!equal(a, b)) throw new AssertionError("Expected " + a + " to equal " + b);
  },
  notEqual: function(a, b) {
    if (equal(a, b)) throw new AssertionError("Expected " + a + " to not equal " + b);
  },
  truthy: function(a) {
    if (!a) throw new AssertionError("Expected '" + a + "'' to be truthy");
  },
  falsy: function(a) {
    if (a) throw new AssertionError("Expected '" + a + "' to be falsy");
  },
  include: function(a, b) {
    if (!_.include(b, a)) throw new AssertionError("Expected " + b + " to include " + a);
  },
  exclude: function(a, b) {
    if (_.include(b, a)) throw new AssertionError("Expected " + b + " to not include " + a);
  }
};
