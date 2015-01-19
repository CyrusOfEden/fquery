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
 * Apply object-style funcs or a function to a node
 *
 * @private
 * @param {Element} node - the node
 * @param {Object<String, Array> || Function} funcs
 * @returns {Element} the node, with updates applied
 */
function apply(node, funcs) {
  if (_.isFunction(funcs)) {
    funcs(node);
  } else {
    _.forEach(funcs, function(args, func) {
      n[func].apply(null, args.concat(node));
    });
  }
  return node;
}

/* Local variable for the Lo-Dash or Underscore-Contrib curry function. */
var curry = _.curry;

/* Test node for feature checking */
var testNode = d.createElement('div');
