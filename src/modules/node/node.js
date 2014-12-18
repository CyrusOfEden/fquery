query.node = function(selector) {
  if (selector.wrapped) return selector;

  return query.wrap(
    selector instanceof Element ? selector : document.querySelector(selector)
  );
};

// State
query.isEmpty = function(node) {
  return !!query.getText(node);
};

query.isMatch = _.curry(function(node1, node2) {
  return node1 === node2;
});