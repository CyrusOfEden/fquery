// Properties
f.getProp = adapt(function(prop, node) {
  return (f.n(node)[prop] || '').trim();
});

f.setProp = adapt(function(prop, value, node) {
  node = f.n(node);
  node[prop] = get(value, node);
  return node;
});

f.removeProp = adapt(function(prop, node) {
  node = f.n(node);
  delete node[prop];
  return node;
});
