query.buildEventCallback = _.curry(function(callback, node, event) {
  return callback(node, event);
});

query.watch = _.curry(function(eventNmae, callback, node) {
  node = query.node(node);
  callback = query.buildEventCallback(callback, node);
  query.unwrap(node).addEventListener(eventName, callback);
  return function() {
    return query.unwrap(node).removeEventListener(eventName, callback);
  };
});

query.trigger = _.curry(function(eventName, node) {
  node = query.node(node);
  var event = document.createEvent('HTMLEvents');
  event.initEvent(eventName, true, false);
  query.unwrap(node).dispatchEvent(event);
  return node;
});

query.ready = _.curry(document.addEventListener)('DOMContentLoaded');
