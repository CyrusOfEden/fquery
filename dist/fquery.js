;(function() {
  'use strict';

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
  var root = window || this;

  function runInContext() {
    var query = {};

var f = (function() {
  function f(object) {
    this.wrapped = true;
    this.value = object;
  }

  f.prototype.valueOf = f.prototype.toString = function() {
    return this.value;
  };

  return f;
})();

query.wrap = function(object) {
  return new f(object);
};

query.unwrap = function(f) {
  return f.value;
};
query.array = function(array) {
  return _.isArray(array) ? array : [array];
};

query.buildEventCallback = _.curry(function(callback, node, event) {
  return callback(node, event);
});

query.watch = _.curry(function(eventNmae, callback, node) {
  node = query.node(node);
  callback = query.buildEventCallback(callback, node);
  query.unwrap(node).addEventListener(eventName, callback);
  return function() {
    return query.unwrap(node).removeEventListener(eventName, callback);
  };
});

query.trigger = _.curry(function(eventName, node) {
  node = query.node(node);
  var event = document.createEvent('HTMLEvents');
  event.initEvent(eventName, true, false);
  query.unwrap(node).dispatchEvent(event);
  return node;
});

query.ready = _.curry(document.addEventListener)('DOMContentLoaded');

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

// Layout
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

query.remove = function(node) {
  node = query.node(node);
  query.unwrap(node).parentNode.removeChild(query.unwrap(node));
  return node;
};

query.insertAfter = _.curry(function(htmlString, node) {
  node = query.node(node);
  query.unwrap(node).insertAdjacentHTML('afterend', htmlString);
  return node;
});

query.insertBefore = _.curry(function(htmlString, node) {
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

query.equal = _.curry(function(node, test) {
  return query.unwrap(query.node(node)) === query.unwrap(query.node(test));
});

query.attrEqual = _.curry(function(attr, value, node) {
  return query.getAttr(attr, node) === value;
});

query.attrMatch = _.curry(function(attr, regex, node) {
  return query.getAttr(attr, node).toString().match(regex);
});

query.dataEqual = _.curry(function(attr, value, node) {
  return query.getData(attr, node) === value;
});

query.dataMatch = _.curry(function(attr, regex, node) {
  return query.getData(attr, node).toString().match(regex);
});

query.textEqual = _.curry(function(value, node) {
  return query.getText(node) === value;
});

query.textMatch = _.curry(function(regex, node) {
  return query.getText(node).match(regex);
});

query.node = function(selector) {
  if (selector.wrapped) return selector;

  return query.wrap(
    selector instanceof Element ? selector : document.querySelector(selector)
  );
};

// Properties
query.getProp = _.curry(function(prop, node) {
  return query.unwrap(query.node(node))[prop];
});

query.setProp = _.curry(function(prop, value, node) {
  node = query.node(node);
  query.unwrap(node)[prop] = value;
  return node;
});

query.removeProp = _.curry(function(prop, node) {
  node = query.node(node);
  delete query.unwrap(node)[prop];
  return node;
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

query.siblings = function(node) {
  node = query.node(node);
  return d.reject(d.equal(node), query.unwrap(node).parentNode.children);
};

query.children = function(node) {
  node = query.node(node);
  return d.map(d.getProp('children'), query.unwrap(node).children);
};

query.parent = function(node) {
  return query.list(query.unwrap(query.node(node)).children);
};


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
