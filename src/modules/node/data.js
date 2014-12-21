// Data
n.getData = function(attr, node) {
  return n.getAttr('data-' + attr, node);
};

n.setData = function(attr, value, node) {
  return n.setAttr('data-' + attr, get(value, node), node);
};

n.removeData = function(attr, node) {
  return n.removeAttr('data-' + attr, node);
};
