;(function() {
  'use strict';

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

var curry = _.curry;

function adapt(func, arity) {
  function reduce() {
    var args = _.initial(arguments),
        data = _.last(arguments);
    if (_.isArray(data)) {
      return _.reduce(data, function(res, item) {
        return res.concat(func.apply(null, args.concat(item)));
      }, []);
    } else {
      data = (data instanceof Element || data instanceof Text) ? data : document.querySelector(data);
      return func.apply(null, args.concat(data));
    }
  }

  return curry(reduce, arity || func.length);
}

// Attributes
f.getAttr = adapt(function(attr, node) {
  return (node.getAttribute(attr) || '').trim();
});

f.setAttr = adapt(function(attr, value, node) {
  node.setAttribute(attr, get(value, node));
  return node;
});

f.removeAttr = adapt(function(attr, node) {
  node.removeAttribute(attr);
  return node;
});

// Class
_.forEach(['add', 'remove', 'toggle'], function(func) {
  f[func + 'Class'] = adapt(function(klasses, node) {
    _.forEach(array(classes), function(klass) {
      node.classList[func](klass);
    });
    return node;
  });
});

f.hasClass = adapt(function(klasses, node) {
  return _.all(f.array(klasses), function(klass) {
    return node.classList.contains(klass);
  });
});

f.getClass = adapt(function(klasses, node) {
  return _.toArray(node.classList);
});

f.getStyle = adapt(function(property, node) {
  return getComputedStyle(node)[property];
});

f.setStyle = adapt(function(property, value, node) {
  node.style[property] = get(value, node);
  return node;
});

f.hide = f.setStyle('display', 'none');
f.show = f.setStyle('display', '');

// Data
f.getData = adapt(function(attr, node) {
  return f.getAttr('data-' + attr, node);
});

f.setData = adapt(function(attr, value, node) {
  return f.setAttr('data-' + attr, get(value, node), node);
});

f.removeData = adapt(function(attr, node) {
  return f.removeAttr('data-' + attr, node);
});

function eventWatcher(func, node, event) {
  return function(event) {
    return func(event, node);
  }
}

f.watch = adapt(function(eventName, func, node) {
  func = eventWatcher(func, node);
  node.addEventListener(eventName, func);
  return function() {
    return node.removeEventListener(eventName, func);
  }
});

f.trigger = adapt(function(eventName, node) {
  var event = document.createEvent('HTMLEvents');
  event.initEvent(eventName, true, false);
  node.dispatchEvent(event);
  return node;
});

f.ready = function(func) {
  document.addEventListener('DOMContentLoaded', func);
};

// HTML
f.getHTML = adapt(function(node) {
  return node.innerHTML.trim();
});

f.setHTML = adapt(function(value, node) {
  node.innerHTML = get(value, node);
  return node;
});

f.getOuterHTML = adapt(function(node) {
  return node.outerHTML;
});

f.setOuterHTML = adapt(function(value, node) {
  node.outerHTML = get(value, node);
  return node;
});

// Layout
f.offset = adapt(function(node) {
  var rect = node.getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
});

f.position = adapt(function(node) {
  return {
    top: node.offsetTop,
    left: node.offsetLeft
  };
});

f.outerHeight = adapt(function(node) {
  return node.offsetHeight;
});

f.outerWidth = adapt(function(node) {
  return node.offsetWidth;
});

f.list = function(s) {
  if (_.isArray(s)) {
    this.list = s;
  } else if (s instanceof HTMLCollection || s instanceof NodeList) {
    this.list = _.toArray(s);
  } else {
    this.list = _.toArray(document.querySelectorAll(s));
  }
};

f.list.prototype = {
  valueOf: function() {
    return this.list;
  }
};

f.l = function(s) {
  return new f.list(s).valueOf();
};

f.remove = adapt(function(node) {
  node.parentNode.removeChild(node);
  return node;
});

f.insertAfter = adapt(function(value, node) {
  node.insertAdjacentHTML('afterend', get(value, node));
  return node;
});

f.insertBefore = adapt(function(value, node) {
  node.insertAdjacentHTML('beforebegin', get(value, node));
  return node;
});

f.append = adapt(function(value, node) {
  node.insertAdjacentHTML('afterbegin', get(value, node));
  return node;
});

f.prepend = adapt(function(value, node) {
  node.insertAdjacentHTML('beforend', get(value, node));
  return node;
});

f.equal = curry(function(node, test) {
  return f.n(node) === f.n(test);
});

f.attrEqual = curry(function(attr, value, node) {
  return f.getAttr(attr, node) === value;
});

f.attrMatch = curry(function(attr, regex, node) {
  return regex.test(f.getAttr(attr, node).toString());
});

f.dataEqual = curry(function(attr, value, node) {
  return f.getData(attr, node) === value;
});

f.dataMatch = curry(function(attr, regex, node) {
  return regex.test(f.getData(attr, node).toString());
});

f.textEqual = curry(function(value, node) {
  return f.getText(node) === value;
});

f.textMatch = curry(function(regex, node) {
  return regex.test(f.getText(node))
});

f.node = function(s) {
  this.node = (s instanceof Element || s instanceof Text) ? s : document.querySelector(s);
};

f.node.prototype = {
  valueOf: function() {
    return this.node;
  }
};

f.n = function(s) {
  return new f.node(s).valueOf();
};

// Properties
f.getProp = adapt(function(prop, node) {
  return (node[prop] || '').trim();
});

f.setProp = adapt(function(prop, value, node) {
  node[prop] = get(value, node);
  return node;
});

f.removeProp = adapt(function(prop, node) {
  delete node[prop];
  return node;
});

// Text
f.getText = adapt(function(node) {
  return (node.textContent || '').trim();
});

f.setText = adapt(function(value, node) {
  node.textContent = get(value, node);
  return node;
});

f.siblings = adapt(function(node) {
  var siblings = [];
  for (var n = node.parentNode.firstChild; n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== node) {
      siblings.push(n);
    }
  }
  return siblings;
});

f.children = adapt(function(node) {
  return f.siblings(node.firstChild);
});

f.parent = adapt(function(node) {
  var parent = node.parentNode;
  return parent && parent.nodeType !== 11 ? parent : null;
});

f.find = adapt(function(s, node) {
  return node.querySelectorAll(s);
});


    return f;
  }

  var f = runInContext();

  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose fQuery to the global object even when an AMD loader is present in
    // case fQuery is loaded with a RequireJS shim config.
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
