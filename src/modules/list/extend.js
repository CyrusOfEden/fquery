(function(funcs) {
  _.forEach(funcs, function(func) {
    f[func] = curry(function(callback, list) {
      return _[func](f.list(list), callback);
    });
  });
})([
  'each', 'forEach', 'forEachRight',
  'all', 'every',
  'any', 'some',
  'collect', 'map',
  'reduce', 'foldl', 'inject',
  'reduceRight', 'foldr',
  'select', 'filter',
  'reject',
  'find', 'detect', 'findWhere', 'findLast',
  'countBy', 'groupBy', 'indexBy', 'sortBy',
  'invoke'
]);

// ToDo
// 'head', 'initial', 'tail',
// 'size'
// 'first', 'last'
