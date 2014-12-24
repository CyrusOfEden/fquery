/**
 * Get the position of an element relative to the d.
 *
 * @param {Element} node - the node
 * @returns {Object} the top and left offsets of the node
 */
n.offset = function(node) {
  var rect = node.getBoundingClientRect();
  return {
    top: rect.top + d.body.scrollTop,
    left: rect.left + d.body.scrollLeft
  };
};

/**
 * Get the position of an element relative to the offset parent.
 *
 * @param {Element} node - the node
 * @returns {Object} the top and left offsets of the node
 */
n.position = function(node) {
  return {
    top: node.offsetTop,
    left: node.offsetLeft
  };
};

/**
 * Get the offset height of an element.
 *
 * @param {Element} node - the node
 * @returns {Number} the height
 */
n.outerHeight = function(node) {
  return node.offsetHeight;
};

/**
 * Get the offset width of an element.
 *
 * @param {Element} node - the node
 * @returns {Number} the width
 */
n.outerWidth = function(node) {
  return node.offsetWidth;
};
