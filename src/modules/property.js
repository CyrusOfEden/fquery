// Properties
f.getProp = adapt(function(prop, node) {
  return (node[prop] || '').trim();
});

f.setProp = adapt(function(prop, value, node) {
  node[prop] = get(value, node);
  return node;
});

f.removeProp = adapt(function(prop, node) {
  delete node[prop];
  return node;
});
