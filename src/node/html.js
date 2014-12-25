/**
 * Get the innerHTML of a node.
 *
 * @param {Element} node - the node
 * @returns {String} the innerHTML of the node
 */
n.getInnerHTML = function(node) {
  return node.innerHTML.trim();
};

/**
 * Set the innerHTML of a node.
 *
 * @param {Any} value - the new value of the innerHTML
 * @param {Element} node - the node
 * @returns {Element} the node
 */
n.setInnerHTML = function(value, node) {
  node.innerHTML = get(value, node);
  return node;
};

/**
 * Get the outerHTML of a node.
 *
 * @param {Element} node - the node
 * @returns {String} the outerHTML of the node
 */
n.getOuterHTML = function(node) {
  return node.outerHTML;
};

/**
 * Set the outerHTML of a node.
 *
 * @param {Any} value - the new value of the outerHTML
 * @param {Element} node - the node
 * @returns {Element} the node
 */
n.setOuterHTML = function(value, node) {
  node.outerHTML = get(value, node);
  return node;
};
