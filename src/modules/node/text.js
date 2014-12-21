// Text
n.getText = function(node) {
  return (node.textContent || '').trim();
};

n.setText = function(value, node) {
  node.textContent = get(value, node);
  return node;
};
