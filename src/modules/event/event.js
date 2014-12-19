function eventWatcher(func, node, event) {
  return function(event) {
    return func(event, node);
  }
}

f.watch = adapt(function(eventName, func, node) {
  node = f.node(node);
  func = eventWatcher(func, node);
  node.addEventListener(eventName, func);
  return function() {
    return node.removeEventListener(eventName, func);
  }
});

f.trigger = adapt(function(eventName, node) {
  node = f.node(node);
  var event = document.createEvent('HTMLEvents');
  event.initEvent(eventName, true, false);
  node.dispatchEvent(event);
  return node;
});

f.ready = function(func) {
  document.addEventListener('DOMContentLoaded', func);
};
