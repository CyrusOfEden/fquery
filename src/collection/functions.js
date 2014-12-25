/**
 * Adapt all of `n`'s  functions for use with collections
 * (using the `c` namespace), and curry everything.
 */
_.forEach(n, function(func, name) {
  // Don't run for the `q` function
  if (name !== 'q') {
    c[name] = curry(function() {
      var args = _.initial(arguments),
          collection = _.last(arguments);
      return _.reduce(collection, function(response, element) {
        return response.concat(func.apply(null, args.concat(element)));
      }, []);
    }, func.length);

    n[name] = curry(func, func.length);
  }
});
