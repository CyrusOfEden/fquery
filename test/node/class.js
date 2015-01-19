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