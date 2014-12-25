/**
 * Get the text content of an `Element`.
 *
 * @param {Element} node - the node
 * @returns {Element} the text content of the node
 */
n.getText = function(node) {
  return (node.textContent || '').trim();
};

/**
 * Set the text content of an `Element`.
 *
 * @param {Any} value - the node's new text content
 * @param {Element} node - the node
 * @returns {Element} the node
 */
n.setText = function(value, node) {
  node.textContent = get(value, node);
  return node;
};
