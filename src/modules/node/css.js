f.getStyle = f.curry(function(property, node) {
  return getComputedStyle(f.node(node))[property];
});

f.setStyle = f.curry(function(property, value, node) {
  node = f.node(node);
  node.style[property] = get(value, node);
  return node;
});

f.hide = _f.setStyle('display', 'none');
f.show = f.setStyle('display', '');
