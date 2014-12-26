suite("Attributes", function() {
  var elem = n.q('.google-link');

  suite("getAttr", function() {
    test("get an attribute", function() {
      assert.equal(n.getAttr('href', elem), 'http://google.ca');
    });

    test("handle an empty attribute", function() {
      assert.falsy(n.getAttr('style', elem));
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
