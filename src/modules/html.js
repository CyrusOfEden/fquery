// HTML
f.getHTML = adapt(function(node) {
  return node.innerHTML.trim();
});

f.setHTML = adapt(function(value, node) {
  node.innerHTML = get(value, node);
  return node;
});

f.getOuterHTML = adapt(function(node) {
  return node.outerHTML;
});

f.setOuterHTML = adapt(function(value, node) {
  node.outerHTML = get(value, node);
  return node;
});
