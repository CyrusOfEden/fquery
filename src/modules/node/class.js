// Class
_.forEach(['add', 'remove', 'toggle'], function(func) {
  n[func + 'Class'] = function(klasses, node) {
    _.forEach(array(klasses), function(klass) {
      node.classList[func](klass);
    });
    return node;
  };
});

n.hasClass = function(klasses, node) {
  return node.classList.contains(klass);
};

n.getClass = function(klasses, node) {
  return _.toArray(node.classList);
};
