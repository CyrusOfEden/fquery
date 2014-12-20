// Text
f.getText = adapt(function(node) {
  return (node.textContent || '').trim();
});

f.setText = adapt(function(value, node) {
  node.textContent = get(value, node);
  return node;
});
