/**
 * Passes through `s` if it's an Array,
 * returns `s` as an array if `s` is an `HTMLCollection` or a `NodeList`,
 * or performs returns an array of `d.querySelectorAll`.
 *
 * @param {Any} s - an array-like object of `Element`s or a CSS selector
 * @param {Element} c - the context for `querySelectorAll`
 * @returns {Array<Element>} the matched elements
 */
c.q = function(s, c) {
  if (_.isArray(s)) {
    return s;
  } else if (s instanceof HTMLCollection || s instanceof NodeList) {
    return _.toArray(s);
  } else {
    return _.toArray((c || d).querySelectorAll(s));
  }
};
