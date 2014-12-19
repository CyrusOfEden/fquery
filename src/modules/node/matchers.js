f.equal = f.curry(function(node, test) {
  return f.node(node) === f.node(test);
});

f.attrEqual = f.curry(function(attr, value, node) {
  return f.getAttr(attr, node) === value;
});

f.attrMatch = f.curry(function(attr, regex, node) {
  return f.getAttr(attr, node).toString().match(regex);
});

f.dataEqual = f.curry(function(attr, value, node) {
  return f.getData(attr, node) === value;
});

f.dataMatch = f.curry(function(attr, regex, node) {
  return f.getData(attr, node).toString().match(regex);
});

f.textEqual = f.curry(function(value, node) {
  return f.getText(node) === value;
});

f.textMatch = f.curry(function(regex, node) {
  return f.getText(node).match(regex);
});
