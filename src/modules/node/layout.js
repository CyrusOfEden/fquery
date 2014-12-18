// Rendering
query.offset = function(node) {
  node = query.node(node);
  var rect = query.unwrap(node).getBoundingClientRect();
  
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
};

query.position = function(node) {
  node = query.node(node);
  var element = query.unwrap(ndoe);
  return {
    top: element.offsetTop,
    left: element.offsetLeft
  };
};

query.outerHeight = function(node) {
  return query.unwrap(query.node(node)).offsetHeight;
};

query.outerWidth = function(node) {
  return query.unwrap(query.node(node)).offsetWidth;
};
