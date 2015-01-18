(function() {
  'use strict';

  var styles = {
    pass: 'color: green',
    fail: 'color: red'
  };

  var name = "Tests completed in",
      pass = [],
      fail = [];

  document.addEventListener('DOMContentLoaded', function() {
    console.time(name);

function bench(name, count, func) {
  console.time(name);
  while (count--) func();
  console.timeEnd(name);
}

_.extend(window, { bench: bench });

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

suite("Attributes", function() {
  var elem = n.q('.google-link');

  suite("getAttr", function() {
    test("get an attribute", function() {
      assert.equal(n.getAttr('href', elem), 'http://google.ca');
    });
  });

  suite("setAttr", function() {
    test("set an attribute", function() {
      var altText = "A link to Google";
      n.setAttr('alt', altText, elem);
      assert.equal(n.getAttr('alt', elem), altText);
    });
  });

  suite("removeAttr", function() {
    test("remove an attribute", function() {
      n.removeAttr('alt', elem);
      assert.falsy(n.getAttr('alt', elem));
    });
  });
});

suite("Class", function() {
  var elem = n.q('#class');

  suite('addClass', function() {
    test('add a class', function() {
      var tempClasses = ['temp'];
      n.addClass(tempClasses, elem);
      assert.truthy(n.hasClass(tempClasses, elem));
    });
    test('add multiple classes', function() {
      var tempClasses = ['a', 'b', 'c'];
      n.addClass(tempClasses, elem);
      assert.truthy(n.hasClass(tempClasses, elem));
    });
  });

  suite('removeClass', function() {
    test('remove a class', function() {
      var tempClasses = ['temp'];
      n.removeClass(tempClasses, elem);
      assert.falsy(n.hasClass(tempClasses, elem));
    });
    test('remove multiple classes', function() {
      var tempClasses = ['a', 'b', 'c'];
      n.removeClass(tempClasses, elem);
      assert.falsy(n.hasClass(tempClasses, elem));
    });
  });

  suite('toggleClass', function() {
    test('toggling classes', function() {
      var tempClasses = ['a', 'b', 'c'];
      n.addClass(tempClasses.slice(1), elem);
      n.toggleClass(tempClasses, elem);
      assert.truthy(n.hasClass([tempClasses[0]], elem));
      assert.falsy(n.hasClass(tempClasses.slice(1), elem));
    });
  });

  suite('hasClass', function() {
    test("check classes", function() {
      var tempClasses = ['a'];
      n.addClass(tempClasses, elem);
      assert.truthy(n.hasClass(tempClasses, elem));
    });
  });

  suite('getClass', function() {
    test("get class list", function() {
      var tempClasses = ['a'];
      n.removeClass(tempClasses, elem);
      assert.equal(n.getClass(elem), []);
    });
  });
});
suite("CSS", function() {
  var elem = n.q('#css');

  suite('setStyle / getStyle', function() {
    test('set a style / get a style', function() {
      var color = n.getStyle('color', n.q('.google-link'));
      n.setStyle('backgroundColor', color, elem);
      assert.equal(color, n.getStyle('backgroundColor', elem));
    });
  });
});
suite("Data", function() {
  var elem = n.q('.google-link');

  suite("setData / getData", function() {
    test("set data-attr / get data-attr", function() {
      var prop = 'clicks-count';
      n.setData(prop, 0, elem);
      n.setData(prop, 1, elem);
      assert.equal('1', n.getData(prop, elem));
    });
  });

  suite("removeData", function() {
    test("remove data-attr", function() {
      var prop = 'clicks-count';
      n.removeData(prop, elem);
      assert.falsy(n.getData(prop, elem));
    });
  });
});

suite("Event", function() {
  var elem = n.q('.google-link');

  suite("Watch, trigger, unwatch", function() {
    test("Watching an event, triggering it, and unwatching it", function() {
      var prop = 'click-count',
          trackClicks, unwatch;
      n.setData(prop, 0, elem);
      trackClicks = n.watch('click', function(event, node) {
        event.preventDefault();
        console.log("CLICKED");
        n.setData(prop, function(node) {
          return _.parseInt(n.getData(prop, node)) + 1;
        }, node);
        return false;
      });
      unwatch = trackClicks(elem);
      n.trigger('click', elem);
      unwatch();
      assert.equal('1', n.getData(prop, elem));
    });
  });
});

    console.log("\n");
    console.timeEnd(name);

    var style = styles[fail.length === 0 ? 'pass' : 'fail'];

    console.log("%c" + pass.length + " passes, " + fail.length + " failures.", style);
    console.log("%c" + fail.join(', '), style);
  });

})();