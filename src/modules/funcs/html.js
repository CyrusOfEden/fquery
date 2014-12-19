// HTML
f.getHTML = adapt(function(node) {
  return f.node(node).innerHTML.trim();
});

f.setHTML = adapt(function(value, node) {
  node = f.node(node);
  node.innerHTML = get(value, node);
  return node;
});

f.getOuterHTML = adapt(function(node) {
  return f.node(node).outerHTML;
});

f.setOuterHTML = adapt(function(value, node) {
  node = f.node(node);
  node.outerHTML = get(value, node);
  return node;
});
