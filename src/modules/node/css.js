f.getStyle = _.curry(function(property, node) {
  return getComputedStyle(f.node(node))[property];
});

f.setStyle = _.curry(function(property, value, node) {
  node = f.node(node);
  node.style[property] = get(value, node);
  return node;
});

f.hide = _f.setStyle('display', 'none');
f.show = f.setStyle('display', '');
