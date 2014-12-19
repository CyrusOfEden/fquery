// Properties
f.getProp = _.curry(function(prop, node) {
  return f.node(node)[prop];
});

f.setProp = _.curry(function(prop, value, node) {
  node = f.node(node);
  node[prop] = get(value, node);
  return node;
});

f.removeProp = _.curry(function(prop, node) {
  node = f.node(node);
  delete node[prop];
  return node;
});
