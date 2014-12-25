// Get the computed styling of a node.
/**
 * @param {String} property - the CSS property
 * @param {Element} node - the node
 * @returns {Any} the value of the node's CSS property
 */
n.getStyle = function(property, node) {
  return getComputedStyle(node)[property];
};

// Set the CSS style of a node.
/**
 * @param {String} property - the CSS property
 * @param {Any} value - the new value of the CSS property
 * @param {Element} node - the node
 * @returns {Element} the node
 */
n.setStyle = function(property, value, node) {
  node.style[property] = get(value, node);
  return node;
};
