query.getStyle = _.curry(function(property, node) {
  return getComputedStyle(query.unwrap(query.node(node)))[property];
});

query.setStyle = _.curry(function(property, value, node) {
  node = query.node(node);
  query.unwrap(node).style[property] = value;
  return node;
});

query.hide = function(node) {
  return query.setStyle('display', 'none', query.node(node));
};

query.show = function(node) {
  return query.setStyle('display', '', query.node(node));
};