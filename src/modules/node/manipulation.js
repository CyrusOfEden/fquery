query.remove = function(node) {
  node = query.node(node);
  query.unwrap(node).parentNode.removeChild(query.unwrap(node));
  return node;
};

query.after = _.curry(function(htmlString, node) {
  node = query.node(node);
  query.unwrap(node).insertAdjacentHTML('afterend', htmlString);
  return node;
});

query.before = _.curry(function(htmlString, node) {
  node = query.node(node);
  query.unwrap(node).insertAdjacentHTML('beforebegin', htmlString);
  return node;
});

query.append = _.curry(function(htmlString, node) {
  node = query.node(node);
  query.unwrap(node).insertAdjacentHTML('afterbegin', htmlString);
  return node;
});

query.prepend = _.curry(function(htmlString, node) {
  node = query.node(node);
  query.unwrap(node).insertAdjacentHTML('beforend', htmlString);
  return node;
});