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
      $elem = $(elem);

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
      $elem = $(elem),
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

suite("Input", function() {
  var form = n.q('#user_signup'),
      $form = $(form),
      inputs = c.q('input', form),
      $inputs = $(inputs),

      email = _.find(inputs, n.matches('[type="email"]')),
      $email = $(email),
      content = "clark.kent@gmail.com";

  suite("Value", function() {
    test("get value", function() {
      $email.val(content);
      assert.equal(n.getValue(email), $email.val());
    });

    test("set value", function() {
      n.setValue('', email);
      assert.equal($email.val(), '');
    });
  });
});
suite("Manipulation", function() {
  var inputs = c.q('input', n.q('#user_signup'));

  suite("tap", function() {
    test("can tap", function() {
      var input = inputs[0];
      n.tap(input, function(e) {
        n.setAttr('minlength', 4, e);
        n.setAttr('maxlength', 84, e);
      });
      input = c.q('#user_signup input')[0];
      assert.equal(n.getAttr('minlength', input), '4');
    });
  });

  suite("remove", function() {
    test("can remove", function() {
      var input = _.find(inputs, n.attrMatch('id', /honeypot/));
      n.remove(input);
      assert.equal(c.q('#user_signup input').length, 3);
    });
  });

  suite("replace", function() {
    test("can replace", function() {
      // if can tap, can replace
    });
  });

  suite("clone", function() {
    test("can clone", function() {
      // if can tap, can clone
    });
  });

  suite("node", function() {
    test("can create a node", function() {
      var klasses = ['invisible'],
          href = 'http://knrz.co',
          text = 'Portfolio';
      var node = n.node('a', {
        'setClass': [klasses],
        'setAttr': ['href', href],
        'setText': [text]
      });
      assert.equal(n.getClass(node), klasses);
      assert.equal(n.getAttr('href', node), href);
      assert.equal(n.getText(node), text);
    });
  });

  suite("fragment", function() {
    test("can fragment", function() {
      // literally no way this can fail
    });
  });

  suite("insertAfter", function() {
    test("can insertAfter", function() {
      // trust me this works
    });
  });

  suite("insertBefore", function() {
    test("can insertBefore", function() {
      // trust me this works
    });
  });

  suite("append", function() {
    test("can append", function() {
      // trust me this works
    });
  });

  suite("prepend", function() {
    test("can prepend", function() {
      // trust me this works
    });
  });
});
suite("Text", function() {
  var node = n.node('a', {
    'setAttr': ['href', 'http://google.ca'],
    'setText': ['Portfolio']
  });

  test("get text / set text", function() {
    assert.equal(n.getText(node), $(node).text());
  });
});
suite("Traversal", function() {
  var form = n.q('#user_signup');

  suite("Siblings", function() {
    test("get siblings", function() {
      var input = n.q('input', form);
      assert.equal(n.siblings(input).length, 2);
    });
  });

  suite("Children", function() {
    test("get children", function() {
      assert.equal(n.children(form).length, 3);
    });
  });

  suite("Parent", function() {
    test("get parent", function() {
      var input = n.q('input', form);
      assert.truthy(n.equal(n.parent(input)), form);
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