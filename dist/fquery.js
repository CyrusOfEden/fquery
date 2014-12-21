;(function() {
  'use strict';

  // Used as a reference to the global object
  var root = window || this;

  var n = {};
  var c = {};

function get(f, x) {
  return _.isFunction(f) ? f(x) : f;
}

function array(f) {
  return _.isArray(f) ? f : [f];
}

var curry = _.curry;

// Attributes
n.getAttr = function(attr, node) {
  return (node.getAttribute(attr) || '').trim();
};

n.setAttr = function(attr, value, node) {
  node.setAttribute(attr, get(value, node));
  return node;
};

n.removeAttr = function(attr, node) {
  node.removeAttribute(attr);
  return node;
};

// Class
_.forEach(['add', 'remove', 'toggle'], function(func) {
  n[func + 'Class'] = function(klasses, node) {
    _.forEach(array(classes), function(klass) {
      node.classList[func](klass);
    });
    return node;
  };
});

n.hasClass = function(klasses, node) {
  return node.classList.contains(klass);
};

n.getClass = function(klasses, node) {
  return _.toArray(node.classList);
};

// CSS
n.getStyle = function(property, node) {
  return getComputedStyle(node)[property];
};

n.setStyle = function(property, value, node) {
  node.style[property] = get(value, node);
  return node;
};

// n.hide = n.setStyle('display', 'none');
// n.show = n.setStyle('display', '');

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

function eventWatcher(func, node, event) {
  return function(event) {
    return func(event, node);
  }
}

n.watch = function(eventName, func, node) {
  func = eventWatcher(func, node);
  node.addEventListener(eventName, func);
  return function() {
    return node.removeEventListener(eventName, func);
  }
};

n.trigger = function(eventName, node) {
  var event = document.createEvent('HTMLEvents');
  event.initEvent(eventName, true, false);
  node.dispatchEvent(event);
  return node;
};

n.ready = function(func) {
  document.addEventListener('DOMContentLoaded', func);
};

// HTML
n.getHTML = function(node) {
  return node.innerHTML.trim();
};

n.setHTML = function(value, node) {
  node.innerHTML = get(value, node);
  return node;
};

n.getOuterHTML = function(node) {
  return node.outerHTML;
};

n.setOuterHTML = function(value, node) {
  node.outerHTML = get(value, node);
  return node;
};

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

n.remove = function(node) {
  node.parentNode.removeChild(node);
  return node;
};

n.insertAfter = function(value, node) {
  node.insertAdjacentHTML('afterend', get(value, node));
  return node;
};

n.insertBefore = function(value, node) {
  node.insertAdjacentHTML('beforebegin', get(value, node));
  return node;
};

n.append = function(value, node) {
  node.insertAdjacentHTML('afterbegin', get(value, node));
  return node;
};

n.prepend = function(value, node) {
  node.insertAdjacentHTML('beforend', get(value, node));
  return node;
};

n.equal = function(node, test) {
  return n.n(node) === n.n(test);
};

n.attrEqual = function(attr, value, node) {
  return n.getAttr(attr, node) === value;
};

n.attrMatch = function(attr, regex, node) {
  return regex.test(n.getAttr(attr, node).toString());
};

n.dataEqual = function(attr, value, node) {
  return n.getData(attr, node) === value;
};

n.dataMatch = function(attr, regex, node) {
  return regex.test(n.getData(attr, node).toString());
};

n.textEqual = function(value, node) {
  return n.getText(node) === value;
};

n.textMatch = function(regex, node) {
  return regex.test(n.getText(node))
};

n.q = function(s) {
  return (s instanceof Element || s instanceof Text) ? s : document.querySelector(s);
};

// Properties
n.getProp = function(prop, node) {
  return (node[prop] || '').trim();
};

n.setProp = function(prop, value, node) {
  node[prop] = get(value, node);
  return node;
};

n.removeProp = function(prop, node) {
  delete node[prop];
  return node;
};

// Text
n.getText = function(node) {
  return (node.textContent || '').trim();
};

n.setText = function(value, node) {
  node.textContent = get(value, node);
  return node;
};

// Traversal
n.siblings = function(node) {
  var siblings = [];
  for (var n = node.parentNode.firstChild; n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== node) {
      siblings.push(n);
    }
  }
  return siblings;
};

n.children = function(node) {
  return n.siblings(node.firstChild);
};

n.parent = function(node) {
  var parent = node.parentNode;
  return parent && parent.nodeType !== 11 ? parent : null;
};

n.find = function(s, node) {
  return node.querySelectorAll(s);
};

c.q = function(s) {
  if (_.isArray(s)) {
    return s;
  } else if (s instanceof HTMLCollection || s instanceof NodeList) {
    return _.toArray(s);
  } else {
    return _.toArray(document.querySelectorAll(s));
  }
};

_.forEach(n, function(func, name) {

  if (name !== 'q') {
    c[name] = curry(function() {
      var args = _.initial(arguments),
          collection = _.last(arguments);
      return _.reduce(collection, function(response, element) {
        return response.concat(func.apply(null, args.concat(element)));
      }, []);
    }, func.length);
  }

  n[name] = curry(func, func.length);

});


  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose fQuery to the global object even when an AMD loader is present in
    // case fQuery is loaded with a RequireJS shim config.
    // See http://requirejs.org/docs/api.html#config-shim
    root.n = n;
    root.c = c;
    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define(function() {
      return c;
    });
    define(function() {
      return n;
    });
  } else {
    // in a browser or Rhino
    root.n = n;
    root.c = c;
  }
}).call(this);
