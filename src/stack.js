n.detach = n.stack = function(node, func) {
  n.replace(node, func(n.clone(node)));
};
