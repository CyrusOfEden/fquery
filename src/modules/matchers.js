f.equal = curry(function(node, test) {
  return f.n(node) === f.n(test);
});

f.attrEqual = curry(function(attr, value, node) {
  return f.getAttr(attr, node) === value;
});

f.attrMatch = curry(function(attr, regex, node) {
  return regex.test(f.getAttr(attr, node).toString());
});

f.dataEqual = curry(function(attr, value, node) {
  return f.getData(attr, node) === value;
});

f.dataMatch = curry(function(attr, regex, node) {
  return regex.test(f.getData(attr, node).toString());
});

f.textEqual = curry(function(value, node) {
  return f.getText(node) === value;
});

f.textMatch = curry(function(regex, node) {
  return regex.test(f.getText(node))
});
