f.siblings = adapt(function(node) {
  node = f.node(node);
  return f.reject(
    f.equal(node),
    f.list(node.parentNode.children)
  );
});

f.children = adapt(function(node) {
  return f.list(f.node(node).children);
});

f.parent = adapt(function(node) {
  return f.node(f.node(node).parentNode);
});
