// Text
f.getText = function(node) {
  return f.node(node).textContent;
};

f.setText = _.curry(function(value, node) {
  node = f.node(node);
  node.textContent = get(value, node);
  return node;
});
