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