n.equal = function(node, test) {
  return n.n(node) === n.n(test);
};

n.attrEqual = function(attr, value, node) {
  return n.getAttr(attr, node) === value;
};

n.attrMatch = function(attr, regex, node) {
  return regex.test(n.getAttr(attr, node).toString());
};

n.dataEqual = function(attr, value, node) {
  return n.getData(attr, node) === value;
};

n.dataMatch = function(attr, regex, node) {
  return regex.test(n.getData(attr, node).toString());
};

n.textEqual = function(value, node) {
  return n.getText(node) === value;
};

n.textMatch = function(regex, node) {
  return regex.test(n.getText(node))
};

n.tagMatch = function(tag, node) {
  return tag === node.tagName;
};
