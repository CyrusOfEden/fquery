n.remove = function(node) {
  node.parentNode.removeChild(node);
  return node;
};

n.clone = function(node) {
  return node.cloneNode(true);
};

n.node = function(tag, text) {
  var node = document.createElement(tag);
  node.appendChild(_.isString(text) ? document.createTextNode(text) : text);
  return node;
};

n.fragment = function() {
  return document.createDocumentFragment();
};

n.insertAfter = function(value, node) {
  node.parentNode.insertBefore(get(value, node), node.nextSibling);
  return node;
};

n.insertBefore = function(value, node) {
  node.parentNode.insertBefore(get(value, node), node);
  return node;
};

n.append = function(value, node) {
  node.appendChild(get(value, node));
  return node;
};

n.prepend = function(value, node) {
  if (node.childNodes[1]) {
    node.insertBefore(get(value, node), node.childNodes[1]);
  } else {
    n.append(value, node);
  }
  return node;
};
