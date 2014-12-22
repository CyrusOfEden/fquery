// Returns a property of an `Element`.
// For example, the `checked` property on checkboxes.
/**
 * @param {String} prop - the name of the property to get
 * @param {Element} node - the node
 * @returns {String} the value of the property
 */
n.getProp = function(prop, node) {
  return (node[prop] || '').trim();
};

// Sets the property of an `Element`.
/**
 * @param {String} prop - the name of the property to set
 * @param {Any} value - the property's new value
 * @param {Element} node - the node
 * @returns {Element} the node
 */
n.setProp = function(prop, value, node) {
  node[prop] = get(value, node);
  return node;
};

// Removes a property of an `Element`.
/**
 * @param {String} prop - the name of the property to remove
 * @param {Element} node - the node
 * @returns {Element} the node
 */
n.removeProp = function(prop, node) {
  delete node[prop];
  return node;
};
