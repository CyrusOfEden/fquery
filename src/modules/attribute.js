// Attributes
f.getAttr = adapt(function(attr, node) {
  return (f.n(node).getAttribute(attr) || '').trim();
});

f.setAttr = adapt(function(attr, value, node) {
  node = f.n(node);
  node.setAttribute(attr, get(value, node));
  return node;
});

f.removeAttr = adapt(function(attr, node) {
  node = f.n(node);
  node.removeAttribute(attr);
  return node;
});
