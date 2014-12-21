// Layout
n.offset = function(node) {
  var rect = node.getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
};

n.position = function(node) {
  return {
    top: node.offsetTop,
    left: node.offsetLeft
  };
};

n.outerHeight = function(node) {
  return node.offsetHeight;
};

n.outerWidth = function(node) {
  return node.offsetWidth;
};
