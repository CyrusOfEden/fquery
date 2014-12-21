// Traversal
n.siblings = function(node) {
  var siblings = [];
  for (var n = node.parentNode.firstChild; n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== node) {
      siblings.push(n);
    }
  }
  return siblings;
};

n.children = function(node) {
  return n.siblings(node.firstChild);
};

n.parent = function(node) {
  var parent = node.parentNode;
  return parent && parent.nodeType !== 11 ? parent : null;
};

n.find = function(s, node) {
  return node.querySelectorAll(s);
};
