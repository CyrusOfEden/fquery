// Class
_.forEach(['add', 'remove', 'toggle'], function(func) {
  query[func + 'Class'] = _.curry(function(klasses, node) {
    node = query.node(node);
    var element = query.unwrap(node);
    _.forEach(query.array(klasses), function(klass) {
      element.classList[func](klass);
    });
    return node;
  });
});

query.hasClass = _.curry(function(klasses, node) {
  node = query.node(node);
  var element = query.unwrap(node);
  return _.all(query.array(klasses), function(klass) {
    return element.classList.contains(klass);
  });
});
