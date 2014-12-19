// HTML
f.getHTML = function(node) {
  return f.node(node).innerHTML;
};

f.setHTML = _.curry(function(value, node) {
  node = f.node(node);
  node.innerHTML = get(value, node);
  return node;
});

f.getOuterHTML = function(node) {
  return f.node(node).outerHTML;
};

f.setOuterHTML = _.curry(function(value, node) {
  node = f.node(node);
  node.outerHTML = get(value, node);
  return node;
});
