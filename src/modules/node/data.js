// Data
f.getData = f.curry(function(attr, node) {
  return f.getAttr('data-' + attr, node);
});

f.setData = f.curry(function(attr, value, node) {
  return f.setAttr('data-' + attr, get(value, node), node);
});

f.removeData = f.curry(function(attr, node) {
  return f.removeAttr('data-' + attr, node);
});
