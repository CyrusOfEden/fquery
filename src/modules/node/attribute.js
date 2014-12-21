// Attributes
n.getAttr = function(attr, node) {
  return (node.getAttribute(attr) || '').trim();
};

n.setAttr = function(attr, value, node) {
  node.setAttribute(attr, get(value, node));
  return node;
};

n.removeAttr = function(attr, node) {
  node.removeAttribute(attr);
  return node;
};
