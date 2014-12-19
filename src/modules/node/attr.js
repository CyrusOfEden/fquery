// Attributes
f.getAttr = f.curry(function(attr, node) {
  return f.node(node).getAttribute(attr);
});

f.setAttr = f.curry(function(attr, value, node) {
  node = f.node(node);
  node.setAttribute(attr, get(value, node));
  return node;
});

f.removeAttr = f.curry(function(attr, node) {
  node = f.node(node);
  node.removeAttribute(attr);
  return node;
});
