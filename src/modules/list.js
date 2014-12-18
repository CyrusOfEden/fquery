query.list = function(selector) {
  if (selector.wrapped) return selector;

  return query.wrap(
    _.isArray(selector) ? selector : _.toArray(document.querySelectorAll(selector))
  );
};

(function(funcs) {
  _.forEach(funcs, function(func) {
    query[func] = _.curry(function(callback, list) {
      return query.wrap(_[func](query.unwrap(query.list(list)), callback));
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
  'invoke',
  'size'
]);
