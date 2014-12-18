query.createEvent = _.curry(function(name, data) {
  return { name: name, data: data };
});

query.watch = _.curry(function(event, callback, node) {
  node = query.node(node);
  query.unwrap(node).addEventListener(event, callback);
  return node;
});

query.unwatch = _.curry(function(event, callback, node) {
  node = query.node(node);
  query.unwrap(node).removeEventListener(event, callback);
  return node;
});

query.ready = _.partial(document.addEventListener)('DOMContentLoaded');
