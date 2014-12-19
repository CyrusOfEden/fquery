f.remove = function(node) {
  node = f.node(node);
  node.parentNode.removeChild(node);
  return node;
};

f.insertAfter = _.curry(function(value, node) {
  node = f.node(node);
  node.insertAdjacentHTML('afterend', get(value, node));
  return node;
});

f.insertBefore = _.curry(function(value, node) {
  node = f.node(node);
  node.insertAdjacentHTML('beforebegin', get(value, node));
  return node;
});

f.append = _.curry(function(value, node) {
  node = f.node(node);
  node.insertAdjacentHTML('afterbegin', get(value, node));
  return node;
});

f.prepend = _.curry(function(value, node) {
  node = f.node(node);
  node.insertAdjacentHTML('beforend', get(value, node));
  return node;
});
