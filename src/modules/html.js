// HTML
f.getHTML = adapt(function(node) {
  return f.n(node).innerHTML.trim();
});

f.setHTML = adapt(function(value, node) {
  node = f.n(node);
  node.innerHTML = get(value, node);
  return node;
});

f.getOuterHTML = adapt(function(node) {
  return f.n(node).outerHTML;
});

f.setOuterHTML = adapt(function(value, node) {
  node = f.n(node);
  node.outerHTML = get(value, node);
  return node;
});
