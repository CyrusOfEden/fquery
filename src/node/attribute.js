/**
 * Returns an attribute of an `Element`.
 * For example, the `type` attribute on `input` elements.
 *
 * @param {String} attr - the attribute to get
 * @param {Element} node - the element to modify
 * @returns {String} the value of the attribute
 */
n.getAttr = function(attr, node) {
  return node.getAttribute(attr);
};

/**
 * Set the attribute of an `Element`.
 *
 * @param {String} attr - the attribute to set
 * @param {Any} value - attr's new value
 * @param {Element} node - the element to modify
 * @returns {Element} the node
 */
n.setAttr = function(attr, value, node) {
  node.setAttribute(attr, get(value, node));
  return node;
};

/**
 * Remove an attribute of an `Element`.
 *
 * @param {String} attr - the attribute to remove
 * @param {Element} node - the element to modify
 * @returns {Element} the node
 */
n.removeAttr = function(attr, node) {
  node.removeAttribute(attr);
  return node;
};
