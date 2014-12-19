// Attributes
f.getAttr = adapt(function(attr, node) {
  return f.node(node).getAttribute(attr);
});

f.setAttr = adapt(function(attr, value, node) {
  node = f.node(node);
  node.setAttribute(attr, get(value, node));
  return node;
});

f.removeAttr = adapt(function(attr, node) {
  node = f.node(node);
  node.removeAttribute(attr);
  return node;
});
