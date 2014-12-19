f.getStyle = adapt(function(property, node) {
  return getComputedStyle(f.node(node))[property];
});

f.setStyle = adapt(function(property, value, node) {
  node = f.node(node);
  node.style[property] = get(value, node);
  return node;
});

f.hide = f.setStyle('display', 'none');
f.show = f.setStyle('display', '');
