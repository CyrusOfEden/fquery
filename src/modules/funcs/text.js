// Text
f.getText = adapt(function(node) {
  return f.node(node).textContent;
});

f.setText = adapt(function(value, node) {
  node = f.node(node);
  node.textContent = get(value, node);
  return node;
});
