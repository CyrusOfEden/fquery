suite("Event", function() {
  var elem = n.q('.google-link');

  suite("Watch, trigger, unwatch", function() {
    test("Watching an event, triggering it, and unwatching it", function() {
      var prop = 'click-count',
          trackClicks, unwatch;
      n.setData(prop, 0, elem);
      trackClicks = n.watch('click', function(event, node) {
        event.preventDefault();
        n.setData(prop, function(node) {
          return _.parseInt(n.getData(prop, node)) + 1;
        }, node);
        return false;
      });
      unwatch = trackClicks(elem);
      n.trigger('click', elem);
      unwatch();
      assert.equal('1', n.getData(prop, elem));
    });
  });
});