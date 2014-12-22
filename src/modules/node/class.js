/**
 * Add, remove, or toggle classes.
 *
 * @param {String, Array} klasses - classes to add/remove/toggle
 * @param {Element} node - the element to modify
 * @returns {Element} node
 */
_.forEach(['add', 'remove', 'toggle'], function(func) {
  n[func + 'Class'] = function(klasses, node) {
    _.forEach(array(klasses), function(klass) {
      node.classList[func](klass);
    });
    return node;
  };
});

/**
 * Check to see if an element has _all_ the provided classes.
 *
 * @param {String, Array} klasses - classes to presence of
 * @param {Element} node - the element to modify
 * @returns {Boolean} the presence of all the classes
 */
n.hasClass = function(klasses, node) {
  return _.all(array(klasses), function(klass) {
    return node.classList.contains(klass);
  });
};

/**
 * Return an `Element`'s classes
 *
 * @param {Element} node - the element to modify
 * @returns {Array} the element's classes
 */
n.getClass = function(node) {
  return _.toArray(node.classList);
};
