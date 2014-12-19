f.equal = _.curry(function(node, test) {
  return f.node(node) === f.node(test);
});

f.attrEqual = _.curry(function(attr, value, node) {
  return f.getAttr(attr, node) === value;
});

f.attrMatch = _.curry(function(attr, regex, node) {
  return f.getAttr(attr, node).toString().match(regex);
});

f.dataEqual = _.curry(function(attr, value, node) {
  return f.getData(attr, node) === value;
});

f.dataMatch = _.curry(function(attr, regex, node) {
  return f.getData(attr, node).toString().match(regex);
});

f.textEqual = _.curry(function(value, node) {
  return f.getText(node) === value;
});

f.textMatch = _.curry(function(regex, node) {
  return f.getText(node).match(regex);
});
