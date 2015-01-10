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
