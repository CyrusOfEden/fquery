query.buildEventCallback = _.curry(function(callback, node, event) {
  return callback(node, event);
});

query.watch = _.curry(function(event, callback, node) {
  node = query.node(node);
  query.unwrap(node).addEventListener(event, query.buildEventCallback(callback, node));
  return node;
});

query.unwatch = _.curry(function(event, callback, node) {
  node = query.node(node);
  query.unwrap(node).removeEventListener(event, query.buildEventCallback(callback, node));
  return node;
});

query.ready = _.partial(document.addEventListener)('DOMContentLoaded');
