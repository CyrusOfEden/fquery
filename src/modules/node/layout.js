// Layout
f.offset = function(node) {
  var rect = f.node(node).getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
};

f.position = function(node) {
  node = f.node(node);
  return {
    top: node.offsetTop,
    left: node.offsetLeft
  };
};

f.outerHeight = function(node) {
  return f.node(node).offsetHeight;
};

f.outerWidth = function(node) {
  return f.node(node).offsetWidth;
};
