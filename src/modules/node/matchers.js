query.equal = _.curry(function(node, test) {
  return query.unwrap(query.node(node)) === query.unwrap(query.node(test));
});

query.attrEqual = _.curry(function(attr, value, node) {
  return query.getAttr(attr, node) === value;
});

query.attrMatch = _.curry(function(attr, regex, node) {
  return query.getAttr(attr, node).toString().match(regex);
});

query.dataEqual = _.curry(function(attr, value, node) {
  return query.getData(attr, node) === value;
});

query.dataMatch = _.curry(function(attr, regex, node) {
  return query.getData(attr, node).toString().match(regex);
});

query.textEqual = _.curry(function(value, node) {
  return query.getText(node) === value;
});

query.textMatch = _.curry(function(regex, node) {
  return query.getText(node).match(regex0;
});
