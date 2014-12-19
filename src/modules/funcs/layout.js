// Layout
f.offset = adapt(function(node) {
  var rect = f.node(node).getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
});

f.position = adapt(function(node) {
  node = f.node(node);
  return {
    top: node.offsetTop,
    left: node.offsetLeft
  };
});

f.outerHeight = adapt(function(node) {
  return f.node(node).offsetHeight;
});

f.outerWidth = adapt(function(node) {
  return f.node(node).offsetWidth;
});
