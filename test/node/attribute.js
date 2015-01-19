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
