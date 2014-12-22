/**
 * Passes through `s` if it's an Element or a Text node, or uses
 * `document.querySelector` to retrieve the element.
 *
 * @param {Element, Text, String} s - an `Element` or `Text` node or a selector
 * @returns {Element, null} the passed through `s` or the element
 */
n.q = function(s) {
  return (s instanceof Element || s instanceof Text) ? s : document.querySelector(s);
};
