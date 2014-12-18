query.siblings = function(list) {
};

query.children = function(list) {
  list = query.list(list);
  return query.list(
    _.reduce(query.array(query.unwrap(list)), function(children, element) {
      return children.concat(_.toArray(element.children));
    }, [])
  );
};

query.parent = function(list) {
  list = query.list(list);
  return query.list(
    _.map(query.array(query.unwrap(list)), function(element) {
      return element.parentElement;
    })
  );
};