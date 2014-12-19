query.node = function(selector) {
  if (selector.wrapped) return selector;

  return query.wrap(
    selector instanceof Element ? selector : document.querySelector(selector)
  );
};
