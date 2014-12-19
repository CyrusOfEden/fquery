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
    var f = {};

function get(f, x) {
  return _.isFunction(f) ? f(x) : f;
}

function array(f) {
  return _.isArray(f) ? f : [f];
}

f.curry = _.curry;

f.func = function(func) {
  func = f.curry(func);
  return function(data) {
    return _.isArray(data) ? f.map(func, data) : func(data);
  }
}

function eventWatcher(func, node, event) {
  return function(event) {
    return func(event, node);
  }
}

f.watch = f.curry(function(eventName, func, node) {
  node = f.node(node);
  func = eventWatcher(func, node);
  node.addEventListener(eventName, func);
  return function() {
    return node.removeEventListener(eventName, func);
  }
});

f.trigger = f.curry(function(eventName, node) {
  node = f.node(node);
  var event = document.createEvent('HTMLEvents');
  event.initEvent(eventName, true, false);
  node.dispatchEvent(event);
  return node;
});

f.ready = function(func) {
  document.addEventListener('DOMContentLoaded', func);
};

(function(funcs) {
  _.forEach(funcs, function(func) {
    f[func] = f.curry(function(callback, list) {
      return _[func](f.list(list), callback);
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
  'invoke'
]);

// ToDo
// 'head', 'initial', 'tail',
// 'size'
// 'first', 'last'

f.list = function(s) {
  if (_.isArray(s)) {
    return s;
  } else if (s instanceof HTMLCollection || s instanceof NodeList) {
    return _.toArray(s);
  } else {
    return _.toArray(document.querySelectorAll(s));
  }
};

// Attributes
f.getAttr = f.curry(function(attr, node) {
  return f.node(node).getAttribute(attr);
});

f.setAttr = f.curry(function(attr, value, node) {
  node = f.node(node);
  node.setAttribute(attr, get(value, node));
  return node;
});

f.removeAttr = f.curry(function(attr, node) {
  node = f.node(node);
  node.removeAttribute(attr);
  return node;
});

// Class
_.forEach(['add', 'remove', 'toggle'], function(func) {
  f[func + 'Class'] = f.curry(function(klasses, node) {
    node = f.node(node);
    _.forEach(array(classes), function(klass) {
      node.classList[func](klass);
    });
    return node;
  });
});

f.hasClass = f.curry(function(klasses, node) {
  node = f.node(node);
  return _.all(f.array(klasses), function(klass) {
    return node.classList.contains(klass);
  });
});

f.getStyle = f.curry(function(property, node) {
  return getComputedStyle(f.node(node))[property];
});

f.setStyle = f.curry(function(property, value, node) {
  node = f.node(node);
  node.style[property] = get(value, node);
  return node;
});

f.hide = _f.setStyle('display', 'none');
f.show = f.setStyle('display', '');

// Data
f.getData = f.curry(function(attr, node) {
  return f.getAttr('data-' + attr, node);
});

f.setData = f.curry(function(attr, value, node) {
  return f.setAttr('data-' + attr, get(value, node), node);
});

f.removeData = f.curry(function(attr, node) {
  return f.removeAttr('data-' + attr, node);
});

// HTML
f.getHTML = function(node) {
  return f.node(node).innerHTML;
};

f.setHTML = f.curry(function(value, node) {
  node = f.node(node);
  node.innerHTML = get(value, node);
  return node;
});

f.getOuterHTML = function(node) {
  return f.node(node).outerHTML;
};

f.setOuterHTML = f.curry(function(value, node) {
  node = f.node(node);
  node.outerHTML = get(value, node);
  return node;
});

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

f.remove = function(node) {
  node = f.node(node);
  node.parentNode.removeChild(node);
  return node;
};

f.insertAfter = f.curry(function(value, node) {
  node = f.node(node);
  node.insertAdjacentHTML('afterend', get(value, node));
  return node;
});

f.insertBefore = f.curry(function(value, node) {
  node = f.node(node);
  node.insertAdjacentHTML('beforebegin', get(value, node));
  return node;
});

f.append = f.curry(function(value, node) {
  node = f.node(node);
  node.insertAdjacentHTML('afterbegin', get(value, node));
  return node;
});

f.prepend = f.curry(function(value, node) {
  node = f.node(node);
  node.insertAdjacentHTML('beforend', get(value, node));
  return node;
});

f.equal = f.curry(function(node, test) {
  return f.node(node) === f.node(test);
});

f.attrEqual = f.curry(function(attr, value, node) {
  return f.getAttr(attr, node) === value;
});

f.attrMatch = f.curry(function(attr, regex, node) {
  return f.getAttr(attr, node).toString().match(regex);
});

f.dataEqual = f.curry(function(attr, value, node) {
  return f.getData(attr, node) === value;
});

f.dataMatch = f.curry(function(attr, regex, node) {
  return f.getData(attr, node).toString().match(regex);
});

f.textEqual = f.curry(function(value, node) {
  return f.getText(node) === value;
});

f.textMatch = f.curry(function(regex, node) {
  return f.getText(node).match(regex);
});

f.node = function(s) {
  return s instanceof Element ? s : document.querySelector(s)
};

// Properties
f.getProp = f.curry(function(prop, node) {
  return f.node(node)[prop];
});

f.setProp = f.curry(function(prop, value, node) {
  node = f.node(node);
  node[prop] = get(value, node);
  return node;
});

f.removeProp = f.curry(function(prop, node) {
  node = f.node(node);
  delete node[prop];
  return node;
});

// Text
f.getText = function(node) {
  return f.node(node).textContent;
};

f.setText = f.curry(function(value, node) {
  node = f.node(node);
  node.textContent = get(value, node);
  return node;
});

f.siblings = function(node) {
  node = f.node(node);
  return f.reject(
    f.equal(node),
    f.list(node.parentNode.children)
  );
};

f.children = function(node) {
  return f.list(f.node(node).children);
};

f.parent = function(node) {
  return f.node(f.node(node).parentNode);
};


    return f;
  }

  var f = runInContext();

  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lo-Dash to the global object even when an AMD loader is present in
    // case Lo-Dash is loaded with a RequireJS shim config.
    // See http://requirejs.org/docs/api.html#config-shim
    root.f = f;

    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define(function() {
      return f;
    });
  } else {
    // in a browser or Rhino
    root.f = f;
  }

}).call(this);
