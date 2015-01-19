suite("Text", function() {
  var node = n.node('a', {
    'setAttr': ['href', 'http://google.ca'],
    'setText': ['Portfolio']
  });

  test("get text / set text", function() {
    assert.equal(n.getText(node), $(node).text());
  });
});