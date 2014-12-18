// Text
query.getText = function(node) {
  return query.unwrap(query.node(node)).textContent;
};

query.setText = _.curry(function(text, node) {
  node = query.node(node);
  query.unwrap(node).textContent = text;
  return node;
});