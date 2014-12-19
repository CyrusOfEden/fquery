function get(f, x) {
  return _.isFunction(f) ? f(x) : f;
}

function array(f) {
  return _.isArray(f) ? f : [f];
}

var curry = _.curry || (function() {
  function enforcesUnary (fn) {
    return function mustBeUnary() {
      if (arguments.length === 1) {
        return fn.apply(this, arguments);
      } else {
        throw new RangeError('Only a single argument may be accepted.');
      }
    };
  }
  function collectArgs(func, that, argCount, args, newArg, reverse) {
    if (reverse === true) {
      args.unshift(newArg);
    } else {
      args.push(newArg);
    }
    if (args.length == argCount) {
      return func.apply(that, args);
    } else {
      return enforcesUnary(function () {
        return collectArgs(func, that, argCount, args.slice(0), arguments[0], reverse);
      });
    }
  }
  return function curry(func, reverse) {
    var that = this;
    return enforcesUnary(function() {
      return collectArgs(func, that, func.length, [], arguments[0], reverse);
    });
  };
})();

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
