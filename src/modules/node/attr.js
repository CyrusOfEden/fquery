// Attributes
query.getAttr = _.curry(function(attr, node) {
  return query.unwrap(query.node(node)).getAttribute(attr);
});

query.setAttr = _.curry(function(attr, value, node) {
  node = query.node(node);
  query.unwrap(node).setAttribute(attr, value);
  return node;
});

query.removeAttr = _.curry(function(attr, node) {
  node = query.node(node);
  query.unwrap(node).removeAttribute(attr);
  return node;
});
