// Data
f.getData = adapt(function(attr, node) {
  return f.getAttr('data-' + attr, node).trim();
});

f.setData = adapt(function(attr, value, node) {
  return f.setAttr('data-' + attr, get(value, node), node);
});

f.removeData = adapt(function(attr, node) {
  return f.removeAttr('data-' + attr, node);
});
