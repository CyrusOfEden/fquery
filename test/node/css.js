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