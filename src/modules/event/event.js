query.buildEventCallback = _.curry(function(callback, node, event) {
  return callback(node, event);
});

query.watch = _.curry(function(event, callback, node) {
  node = query.node(node);
  callback = query.buildEventCallback(callback, node);
  query.unwrap(node).addEventListener(event, callback);
  return function() {
    return query.unwrap(node).removeEventListener(event, callback);
  };
});

query.ready = _.partial(document.addEventListener)('DOMContentLoaded');
