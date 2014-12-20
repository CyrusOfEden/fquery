// Text
f.getText = adapt(function(node) {
  return (f.n(node).textContent || '').trim();
});

f.setText = adapt(function(value, node) {
  node = f.n(node);
  node.textContent = get(value, node);
  return node;
});
