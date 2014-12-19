// Properties
f.getProp = adapt(function(prop, node) {
  return f.node(node)[prop];
});

f.setProp = adapt(function(prop, value, node) {
  node = f.node(node);
  node[prop] = get(value, node);
  return node;
});

f.removeProp = adapt(function(prop, node) {
  node = f.node(node);
  delete node[prop];
  return node;
});
