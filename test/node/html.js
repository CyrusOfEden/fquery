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
