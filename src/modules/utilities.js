/**
 * Return `f(x)` if `f` is a function, otherwise just `f`.
 *
 * @private
 * @param {Any} f - a function or a value
 * @param {Any} x - a value
 * @returns {Any} the result of `f(x)` or just `f`
 */
function get(f, x) {
  return _.isFunction(f) ? f(x) : f;
}

/**
 * Wrap `f` in an array if it's not already an array.
 *
 * @private
 * @param {Any} f - an array or a value
 * @returns {Array} the equivalent of `_.flatten([f])`
 */
function array(f) {
  return _.isArray(f) ? f : [f];
}

/* Local variable for the `lodash` or `underscore-contrib` curry function. */
var curry = _.curry;
