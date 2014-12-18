// HTML
query.getHTML = function(node) {
  return query.unwrap(query.node(node)).innerHTML;
};

query.setHTML = _.curry(function(text, node) {
  node = query.node(node);
  query.unwrap(node).innerHTML = text;
  return node;
});

query.getOuterHTML = function(node) {
  return query.unwrap(query.node(node)).outerHTML;
};

query.setOuterHTML = _.curry(function(text, node) {
  node = query.node(node);
  query.unwrap(node).outerHTML = text;
  return node;
});