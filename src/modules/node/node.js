/**
 * Passes through `s` if it's an Element or a Text node, or uses
 * `document.querySelector` to retrieve the element.
 *
 * @param {Any} s - an `Element` or `Text` node or a selector
 * @returns {Element} the passed through `s` or the element (or null)
 */
n.q = function(s) {
  return (s instanceof Element || s instanceof Text) ? s : document.querySelector(s);
};
