function get(f, x) {
  return _.isFunction(f) ? f(x) : f;
}

function array(f) {
  return _.isArray(f) ? f : [f];
}

var curry = _.curry;

function adapt(func, arity) {
  function reduce() {
    var args = _.initial(arguments),
        data = _.last(arguments);
    if (_.isArray(data)) {
      return _.reduce(data, function(res, item) {
        return res.concat(func.apply(null, args.concat(item)));
      }, []);
    } else {
      return func.apply(null, arguments);
    }
  }

  return curry(reduce, arity || func.length);
}
