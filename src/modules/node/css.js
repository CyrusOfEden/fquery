// CSS
n.getStyle = function(property, node) {
  return getComputedStyle(node)[property];
};

n.setStyle = function(property, value, node) {
  node.style[property] = get(value, node);
  return node;
};

// n.hide = n.setStyle('display', 'none');
// n.show = n.setStyle('display', '');
