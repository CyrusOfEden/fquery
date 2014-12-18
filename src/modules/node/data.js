// Data
query.getData = _.curry(function(attr, node) {
  return query.getAttr('data-' + attr, node);
});

query.setData = _.curry(function(attr, value, node) {
  return query.setAttr('data-' + attr, value, node);
});

query.removeData = _.curry(function(attr, node) {
  return query.removeAttr('data-' + attr, node);
});