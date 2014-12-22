// Returns a data-attribute of an `Element`.
/**
 * @param {String} attr - the name of the data-attribute
 * @param {Element} node - the node
 * @returns {String} the value of the data-attribute
 */
n.getData = function(attr, node) {
  return n.getAttr('data-' + attr, node);
};

// Set the data-attribute of an `Element`.
/**
 * @param {String} attr - the data-attribute to set
 * @param {Any} value - attr's new value
 * @param {Element} node - the element to modify
 * @returns {Element} the node
 */
n.setData = function(attr, value, node) {
  return n.setAttr('data-' + attr, get(value, node), node);
};

// Remove an attribute of an `Element`.
/**
 * @param {String} attr - the data-attribute to remove
 * @param {Element} node - the element to modify
 * @returns {Element} the node
 */
n.removeData = function(attr, node) {
  return n.removeAttr('data-' + attr, node);
};
