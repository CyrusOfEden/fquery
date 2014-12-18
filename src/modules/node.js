query.node = function(selector) {
  if (selector.wrapped) return selector;

  return query.wrap(
    selector instanceof Element ? selector : document.querySelector(selector)
  );
};

// State
query.isEmpty = function(node) {
  return !!query.getText(node);
};

query.isMatch = _.curry(function(node1, node2) {
  return node1 === node2;
});

// CSS
query.getStyle = _.curry(function(property, node) {
  return getComputedStyle(query.unwrap(query.node(node)))[property];
});

query.setStyle = _.curry(function(property, value, node) {
  node = query.node(node);
  query.unwrap(node).style[property] = value;
  return node;
});

query.hide = function(node) {
  return query.setStyle('display', 'none', query.node(node));
};

query.show = function(node) {
  return query.setStyle('display', '', query.node(node));
};

// Traversal
query.siblings = function(list) {
  return 'todo';
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

query.remove = function(node) {
  node = query.node(node);
  query.unwrap(node).parentNode.removeChild(query.unwrap(node));
  return node;
};

// Classes
_.forEach(['add', 'remove', 'toggle'], function(func) {
  query[func + 'Class'] = _.curry(function(klasses, node) {
    node = query.node(node);
    var element = query.unwrap(node);
    _.forEach(query.array(klasses), function(klass) {
      element.classList[func](klass);
    });
    return node;
  });
});

query.hasClass = _.curry(function(klasses, node) {
  node = query.node(node);
  var element = query.unwrap(node);
  return _.all(query.array(klasses), function(klass) {
    return element.classList.contains(klass);
  });
});

// Attributes
query.getAttr = _.curry(function(attr, node) {
  return query.unwrap(query.node(node)).getAttribute(attr);
});

query.setAttr = _.curry(function(attr, value, node) {
  node = query.node(node);
  query.unwrap(node).setAttribute(attr, value);
  return node;
});

query.removeAttr = _.curry(function(attr, node) {
  node = query.node(node);
  query.unwrap(node).removeAttribute(attr);
  return node;
});

// Data
query.getData = _.curry(function(attr, node) {
  return query.getAttr('data-' + attr, node);
});

query.setData = _.curry(function(attr, value, node) {
  return query.setAttr('data-' + attr, value, node);
});

query.removeData = _.curry(function(attr, node) {
  return query.removeAttr('data-' + attr, node);
});

// Text
query.getText = function(node) {
  return query.unwrap(query.node(node)).textContent;
};

query.setText = _.curry(function(text, node) {
  node = query.node(node);
  query.unwrap(node).textContent = text;
  return node;
});

// HTML
query.getHTML = function(node) {
  return query.unwrap(query.node(node)).innerHTML;
};

query.setHTML = _.curry(function(text, node) {
  node = query.node(node);
  query.unwrap(node).innerHTML = text;
  return node;
});

query.getOuterHTML = function(node) {
  return query.unwrap(query.node(node)).outerHTML;
};

query.setOuterHTML = _.curry(function(text, node) {
  node = query.node(node);
  query.unwrap(node).outerHTML = text;
  return node;
});
