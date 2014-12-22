/**
 * Create a callback function for an event listener.
 *
 * @private
 * @param {Function} func - the callback function
 * @param {Element} node - the node
 * @returns {Function} the callback function
 */
function buildCallback(func, node) {
  return function(event) {
    return func(event, node);
  }
}

/**
 * Add an event listener to a node.
 *
 * @param {String} name - the name of the event
 * @param {Function} func - the callback function
 * @param {Element} node - the node
 * @returns {Function} an unwatcher function
 */
n.watch = function(name, func, node) {
  func = buildCallback(func, node);
  node.addEventListener(name, func);
  return function() {
    return node.removeEventListener(name, func);
  }
};

/**
 * Trigger an event on a node.
 *
 * @param {String} name - the name of the event
 * @param {Element} node - the node
 * @returns {Element} the ndoe
 */
n.trigger = function(name, node) {
  var event = document.createEvent('HTMLEvents');
  event.initEvent(name, true, false);
  node.dispatchEvent(event);
  return node;
};
