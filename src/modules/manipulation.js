f.remove = adapt(function(node) {
  node.parentNode.removeChild(node);
  return node;
});

f.insertAfter = adapt(function(value, node) {
  node.insertAdjacentHTML('afterend', get(value, node));
  return node;
});

f.insertBefore = adapt(function(value, node) {
  node.insertAdjacentHTML('beforebegin', get(value, node));
  return node;
});

f.append = adapt(function(value, node) {
  node.insertAdjacentHTML('afterbegin', get(value, node));
  return node;
});

f.prepend = adapt(function(value, node) {
  node.insertAdjacentHTML('beforend', get(value, node));
  return node;
});
