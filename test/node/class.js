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