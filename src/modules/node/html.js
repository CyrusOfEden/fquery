// HTML
n.getHTML = function(node) {
  return node.innerHTML.trim();
};

n.setHTML = function(value, node) {
  node.innerHTML = get(value, node);
  return node;
};

n.getOuterHTML = function(node) {
  return node.outerHTML;
};

n.setOuterHTML = function(value, node) {
  node.outerHTML = get(value, node);
  return node;
};
