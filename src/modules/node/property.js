// Properties
n.getProp = function(prop, node) {
  return (node[prop] || '').trim();
};

n.setProp = function(prop, value, node) {
  node[prop] = get(value, node);
  return node;
};

n.removeProp = function(prop, node) {
  delete node[prop];
  return node;
};
