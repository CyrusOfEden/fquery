// Class
_.forEach(['add', 'remove', 'toggle'], function(func) {
  f[func + 'Class'] = adapt(function(klasses, node) {
    node = f.n(node);
    _.forEach(array(classes), function(klass) {
      node.classList[func](klass);
    });
    return node;
  });
});

f.hasClass = adapt(function(klasses, node) {
  node = f.n(node);
  return _.all(f.array(klasses), function(klass) {
    return node.classList.contains(klass);
  });
});

f.getClass = adapt(function(klasses, node) {
  return _.toArray(f.n(node).classList);
});
