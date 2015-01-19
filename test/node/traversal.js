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
