// Retrieve an `Element`'s siblings.
/**
 * @param {Element} node - the node
 * @returns {Array<Element>} the node's siblings
 */
n.siblings = function(node) {
  var siblings = [];
  for (var n = node.parentNode.firstChild; n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== node) {
      siblings.push(n);
    }
  }
  return siblings;
};

// Retrieve an `Element`'s children.
/**
 * @param {Element} node - the node
 * @returns {Array<Element>} the node's children
 */
n.children = function(node) {
  return n.siblings(node.firstChild);
};

// Retrieve an `Element`'s parent.
/**
 * @param {Element} node - the node
 * @returns {Element, null} the parent node or null
 */
n.parent = function(node) {
  var parent = node.parentNode;
  return parent && parent.nodeType !== 11 ? parent : null;
};
