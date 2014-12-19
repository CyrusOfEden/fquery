// Data
f.getData = _.curry(function(attr, node) {
  return f.getAttr('data-' + attr, node);
});

f.setData = _.curry(function(attr, value, node) {
  return f.setAttr('data-' + attr, get(value, node), node);
});

f.removeData = _.curry(function(attr, node) {
  return f.removeAttr('data-' + attr, node);
});
