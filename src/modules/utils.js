function get(f, x) {
  return _.isFunction(f) ? f(x) : f;
}

function array(f) {
  return _.isArray(f) ? f : [f];
}

f.curry = _.curry;

f.func = function(func) {
  func = f.curry(func);
  return function(data) {
    return _.isArray(data) ? f.map(func, data) : func(data);
  }
}
