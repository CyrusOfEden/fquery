/**
 * Get the computed styling of a node.
 *
 * @param {String} prop - the CSS property to fetch
 * @param {Element} node - the node
 * @returns {Any} the value of the node's CSS property
 */
n.getStyle = function(prop, node) {
  return getComputedStyle(node)[prop];
};

/**
 * Set the CSS style of a node.
 *
 * @param {String} prop - the property to modify
 * @param {Any} value - the value to set
 * @param {Element} node - the node
 * @returns {Element} the node
 */
n.setStyle = function(prop, value, node) {
  node.style[prop] = get(value, node);
  return node;
};
