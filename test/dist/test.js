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
  var elem = n.q('.google-link'),
      $elem = $('.google-link');

  suite("getAttr", function() {
    test("get an attribute", function() {
      assert.equal(n.getAttr('href', elem), $elem.attr('href'));
    });
  });

  suite("setAttr", function() {
    test("set an attribute", function() {
      var altText = "A link to Google";
      n.setAttr('alt', altText, elem);
      assert.equal($elem.attr('alt'), altText);
    });
  });

  suite("removeAttr", function() {
    test("remove an attribute", function() {
      n.removeAttr('alt', elem);
      assert.falsy($elem.attr('alt'));
    });
  });
});

suite("Class", function() {
  var elem = n.q('#class'),
      $elem = $('#class');

  suite('addClass', function() {
    test('add a class', function() {
      n.addClass(['temp'], elem);
      assert.truthy($elem.hasClass('temp'));
    });
    test('add multiple classes', function() {
      n.addClass(['a', 'b', 'c'], elem);
      assert.truthy($elem.hasClass('a'));
      assert.truthy($elem.hasClass('b'));
      assert.truthy($elem.hasClass('c'));
    });
  });

  suite('removeClass', function() {
    test('remove a class', function() {
      n.removeClass(['temp'], elem);
      assert.falsy($elem.hasClass('temp'));
    });
    test('remove multiple classes', function() {
      n.removeClass(['a', 'b', 'c'], elem);
      assert.falsy($elem.hasClass('a'));
      assert.falsy($elem.hasClass('b'));
      assert.falsy($elem.hasClass('c'));
    });
  });

  suite('toggleClass', function() {
    test('toggling classes', function() {
      var tempClasses = ['a', 'b', 'c'];
      $elem.addClass('a');
      $elem.addClass('b');
      n.toggleClass(tempClasses, elem);
      assert.truthy($elem.hasClass('c'));
      assert.falsy($elem.hasClass('b'));
      assert.falsy($elem.hasClass('a'));
    });
  });

  suite('hasClass', function() {
    test("check classes", function() {
      $elem.addClass('a');
      assert.truthy(n.hasClass(['a'], elem));
    });
  });

  suite('getClass', function() {
    test("get class list", function() {
      $elem.removeClass('a');
      $elem.removeClass('c');
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
suite("HTML", function() {
  var elem = n.q('#html p'),
      $elem = $('#html p'),
      content;

  suite("innerHTML", function() {
    test("get innerHTML of an element", function() {
      content = n.getInnerHTML(elem);
      assert.equal(content, $elem.html());
    });
    test("set innerHTML of an element", function() {
      var html = "<strong>One flew over the cuckoo's nest</strong>";
      n.setInnerHTML(html, elem);
      assert.equal(html, $elem.html());
    });
  });

  suite("outerHTML", function() {
    test("get outerHTML of an element", function() {
      assert.equal(n.getOuterHTML(elem), elem.outerHTML);
    });
    test("set outerHTML of an element", function() {
      var html = '<p>' + content + '</p>';
      n.setOuterHTML(html, elem);
      assert.equal(n.getOuterHTML(elem), elem.outerHTML);
    });
  });
});


    console.log("\n");
    console.timeEnd(name);

    var style = styles[fail.length ? 'fail' : 'pass'];

    console.log("%c" + pass.length + " passes, " + fail.length + " failures.", style);
    console.log("%c" + fail.join(', '), style);
  });

})();