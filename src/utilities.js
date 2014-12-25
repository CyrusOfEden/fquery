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

/* Local variable for the Lo-Dash or Underscore-Contrib curry function. */
var curry = _.curry;

/* Test node for feature checking */
var testNode = d.createElement('div');
