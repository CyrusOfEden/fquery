function eventWatcher(func, node, event) {
  return function(event) {
    return func(event, node);
  }
}

n.watch = function(eventName, func, node) {
  func = eventWatcher(func, node);
  node.addEventListener(eventName, func);
  return function() {
    return node.removeEventListener(eventName, func);
  }
};

n.trigger = function(eventName, node) {
  var event = document.createEvent('HTMLEvents');
  event.initEvent(eventName, true, false);
  node.dispatchEvent(event);
  return node;
};

n.ready = function(func) {
  document.addEventListener('DOMContentLoaded', func);
};
