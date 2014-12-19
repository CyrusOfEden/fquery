// Attributes
f.getAttr = _.curry(function(attr, node) {
  return f.node(node).getAttribute(attr);
});

f.setAttr = _.curry(function(attr, value, node) {
  node = f.node(node);
  node.setAttribute(attr, get(value, node));
  return node;
});

f.removeAttr = _.curry(function(attr, node) {
  node = f.node(node);
  node.removeAttribute(attr);
  return node;
});
