// Gets the value of an input.
/**
 * @param {Element} node - the node
 * @returns {Any} the value of the property
 */
n.getValue = function(node) {
  return n.getProp('value', node);
};

// Sets the value of an input.
/**
 * @param {Any} value - the property's new value
 * @param {Element} node - the node
 * @returns {Element} the node
 */
n.setValue = function(value, node) {
  return n.setProp('value', get(value, node), node);
};
