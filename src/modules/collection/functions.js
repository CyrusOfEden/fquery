_.forEach(n, function(func, name) {

  if (name !== 'q') {
    c[name] = curry(function() {
      var args = _.initial(arguments),
          collection = _.last(arguments);
      return _.reduce(collection, function(response, element) {
        return response.concat(func.apply(null, args.concat(element)));
      }, []);
    }, func.length);
  }

  n[name] = curry(func, func.length);

});
