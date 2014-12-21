n.remove = function(node) {
  node.parentNode.removeChild(node);
  return node;
};

n.insertAfter = function(value, node) {
  node.insertAdjacentHTML('afterend', get(value, node));
  return node;
};

n.insertBefore = function(value, node) {
  node.insertAdjacentHTML('beforebegin', get(value, node));
  return node;
};

n.append = function(value, node) {
  node.insertAdjacentHTML('afterbegin', get(value, node));
  return node;
};

n.prepend = function(value, node) {
  node.insertAdjacentHTML('beforend', get(value, node));
  return node;
};
