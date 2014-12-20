f.siblings = adapt(function(node) {
  node = f.n(node);
  var siblings = [];
  for (var n = node.parentNode.firstChild; n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== node) {
      siblings.push(n);
    }
  }
  return siblings;
});

f.children = adapt(function(node) {
  return f.siblings(f.n(node).firstChild);
});

f.parent = adapt(function(node) {
  var parent = f.n(node).parentNode;
  return parent && parent.nodeType !== 11 ? parent : null;
});
