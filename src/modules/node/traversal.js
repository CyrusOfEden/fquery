query.siblings = function(node) {
  node = query.node(node);
  return d.reject(d.equal(node), query.unwrap(node).parentNode.children);
};

query.children = function(node) {
  node = query.node(node);
  return d.map(d.getProp('children'), query.unwrap(node).children);
};

query.parent = function(node) {
  return query.list(query.unwrap(query.node(node)).children);
};
