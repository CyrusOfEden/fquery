;(function() {

  // Used to determine if values are of the language type Object
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  // Used as a reference to the global object
  var root = (objectTypes[typeof window] && window) || this;

  function runInContext() {
    var query = {},
        utils = {};

query.array = function(array) {
  return _.isArray(array) ? array : [array];
};

query.wrap = function(object) {
  return {
    wrapped: true,
    value: object,
    valueOf: function() {
      return this.value;
    }
  };
};

query.unwrap = function(object) {
  return object.value;
};
(function(funcs) {
  _.forEach(funcs, function(func) {
    query[func] = _.curry(function(callback, list) {
      return query.wrap(_[func](query.unwrap(query.list(list)), callback));
    });
  });
})([
  'each', 'forEach', 'forEachRight',
  'all', 'every',
  'any', 'some',
  'collect', 'map',
  'reduce', 'foldl', 'inject',
  'reduceRight', 'foldr',
  'select', 'filter',
  'reject',
  'find', 'detect', 'findWhere', 'findLast',
  'countBy', 'groupBy', 'indexBy', 'sortBy',
  'invoke',
  'size'
]);
query.list = function(selector) {
  if (selector.wrapped) return selector;

  return query.wrap(
    _.isArray(selector) ? selector : _.toArray(document.querySelectorAll(selector))
  );
};
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
// Class
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
query.remove = function(node) {
  node = query.node(node);
  query.unwrap(node).parentNode.removeChild(query.unwrap(node));
  return node;
};

query.after = _.curry(function(htmlString, node) {
  node = query.node(node);
  query.unwrap(node).insertAdjacentHTML('afterend', htmlString);
  return node;
});

query.before = _.curry(function(htmlString, node) {
  node = query.node(node);
  query.unwrap(node).insertAdjacentHTML('beforebegin', htmlString);
  return node;
});

query.append = _.curry(function(htmlString, node) {
  node = query.node(node);
  query.unwrap(node).insertAdjacentHTML('afterbegin', htmlString);
  return node;
});

query.prepend = _.curry(function(htmlString, node) {
  node = query.node(node);
  query.unwrap(node).insertAdjacentHTML('beforend', htmlString);
  return node;
});
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
// Text
query.getText = function(node) {
  return query.unwrap(query.node(node)).textContent;
};

query.setText = _.curry(function(text, node) {
  node = query.node(node);
  query.unwrap(node).textContent = text;
  return node;
});

    return query;
  }

  var d = runInContext();

  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lo-Dash to the global object even when an AMD loader is present in
    // case Lo-Dash is loaded with a RequireJS shim config.
    // See http://requirejs.org/docs/api.html#config-shim
    root.d = d;

    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define(function() {
      return d;
    });
  } else {
    // in a browser or Rhino
    root.d = d;
  }

}).call(this);
