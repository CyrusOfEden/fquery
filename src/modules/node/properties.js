// Properties
query.getProp = _.curry(function(prop, node) {
  return query.unwrap(query.node(node))[prop];
});

query.setProp = _.curry(function(prop, value, node) {
  node = query.node(node);
  query.unwrap(node)[prop] = value;
  return node;
});

query.removeProp = _.curry(function(prop, node) {
  node = query.node(node);
  delete query.unwrap(node)[prop];
  return node;
});
