query.list = function(selector) {
  if (selector.wrapped) return selector;

  return query.wrap(
    _.isArray(selector) ? selector : _.toArray(document.querySelectorAll(selector))
  );
};