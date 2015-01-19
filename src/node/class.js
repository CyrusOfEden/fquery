/**
 * Add, remove, or toggle classes.
 *
 * @param {Array<String>} klasses - classes to add/remove/toggle
 * @param {Element} node - the element to modify
 * @returns {Element} the node
 */
_.forEach(['add', 'remove', 'toggle'], function(func) {
  n[func + 'Class'] = function(klasses, node) {
    _.forEach(klasses, function(klass) { node.classList[func](klass); });
    return node;
  };
});

/**
 * Check to see if an element has _all_ the provided classes.
 *
 * @param {Array<String>} klasses - classes to check presence of
 * @param {Element} node - the element to modify
 * @returns {Boolean} the presence of all the classes
 */
n.hasClass = function(klasses, node) {
  return _.all(klasses, function(klass) {
    return node.classList.contains(klass);
  });
};

/**
 * Return an `Element`'s classes
 *
 * @param {Element} node - the element to modify
 * @returns {Array<String>} the element's classes
 */
n.getClass = function(node) {
  return _.toArray(node.classList);
};

/**
 * Set an `Element`'s classes
 *
 * @param {Array<String>} klasses - the classes to set
 * @param {Element} node - the node to modify
 * @returns {Element} the node
 */
n.setClass = function(klasses, node) {
  n.removeClass(n.getClass(node), node);
  n.addClass(klasses, node);
  return node;
};
