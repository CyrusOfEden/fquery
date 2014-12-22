/**
 * Check to see if two nodes are identical.
 *
 * @param {Element} node - the node to match against
 * @param {Element} test - the node to test
 * @returns {Boolean} whether or not they are the same
 */
n.equal = function(node, test) {
  return node === test;
};

/**
 * Check to see if the value of an attribute matches a predicate.
 *
 * @param {String} attr - the attribute to check
 * @param {String} value - the predicate
 * @param {Element} node - the node
 * @returns {Boolean} whether the value of the attribute matches the predicate
 */
n.attrEqual = function(attr, value, node) {
  return n.getAttr(attr, node) === get(value, node);
};

/**
 * Check to see if the value of an attribute passes a `RegExp` test.
 *
 * @param {String} attr - the attribute to check
 * @param {RegExp} regex - the RegExp to test
 * @param {Element} node - the node
 * @returns {Boolean} whether the value of the attribute matches the predicate
 */
n.attrMatch = function(attr, regex, node) {
  return regex.test(n.getAttr(attr, node).toString());
};

/**
 * Check to see if the value of a property matches a predicate.
 *
 * @param {String} attr - the property to check
 * @param {String} value - the predicate
 * @param {Element} node - the node
 * @returns {Boolean} whether the value of the property matches the predicate
 */
n.propEqual = function(attr, value, node) {
  return n.getProp(attr, node) === get(value, node);
};

/**
 * Check to see if the value of a property passes a `RegExp` test.
 *
 * @param {String} attr - the property to check
 * @param {RegExp} regex - the RegExp to test
 * @param {Element} node - the node
 * @returns {Boolean} whether the value of the property matches the predicate
 */
n.propMatch = function(attr, regex, node) {
  return regex.test(n.getProp(attr, node).toString());
};

/**
 * Check to see if the value of a data-attribute matches a predicate.
 *
 * @param {String} attr - the data-attribute to check
 * @param {String} value - the predicate
 * @param {Element} node - the node
 * @returns {Boolean} whether the value of the data-attribute matches the predicate
 */
n.dataEqual = function(attr, value, node) {
  return n.getData(attr, node) === get(value, node);
};

/**
 * Check to see if the value of a data-attribute passes a `RegExp` test.
 *
 * @param {String} attr - the data-attribute to check
 * @param {RegExp} regex - the RegExp to test
 * @param {Element} node - the node
 * @returns {Boolean} whether the value of the data-attribute matches the predicate
 */
n.dataMatch = function(attr, regex, node) {
  return regex.test(n.getData(attr, node).toString());
};

/**
 * Check to see if the text content matches a predicate.
 *
 * @param {String} value - the text-content to check
 * @param {Element} node - the node
 * @returns {Boolean} whether the text content matches the predicate
 */
n.textEqual = function(value, node) {
  return n.getText(node) === get(value, node);
};

/**
 * Check to see if the text content passes a `RegExp` test.
 *
 * @param {RegExp} regex - the RegExp to test
 * @param {Element} node - the node
 * @returns {Boolean} whether the text content matches the predicate
 */
n.textMatch = function(regex, node) {
  return regex.test(n.getText(node))
};

/**
 * Check to see if the text content matches a predicate.
 *
 * @param {Any} tag - the tag predicate
 * @param {Element} node - the node
 * @returns {Boolean} whether the node's tag matches the predicate
 */
n.tagMatch = function(tag, node) {
  return get(tag, node) === node.tagName;
};
