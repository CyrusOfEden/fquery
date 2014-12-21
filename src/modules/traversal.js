// Traversal
f.siblings = adapt(function(node) {
  var siblings = [];
  for (var n = node.parentNode.firstChild; n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== node) {
      siblings.push(n);
    }
  }
  return siblings;
});

f.children = adapt(function(node) {
  return f.siblings(node.firstChild);
});

f.parent = adapt(function(node) {
  var parent = node.parentNode;
  return parent && parent.nodeType !== 11 ? parent : null;
});

f.find = adapt(function(s, node) {
  return node.querySelectorAll(s);
});
