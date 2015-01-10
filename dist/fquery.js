;(function() {
  'use strict';

  // Used as a reference to the global object
  var root = window || this;

  // Quick reference to `document`
  var d = window.document;

  // Set up namespaces
  var n = {};
  var c = {};

/**
 * Return `f(x)` if `f` is a function, otherwise just `f`.
 *
 * @private
 * @param {Any} f - a function or a value
 * @param {Any} x - a value
 * @returns {Any} the result of `f(x)` or just `f`
 */
function get(f, x) {
  return _.isFunction(f) ? f(x) : f;
}

/* Local variable for the Lo-Dash or Underscore-Contrib curry function. */
var curry = _.curry;

/* Test node for feature checking */
var testNode = d.createElement('div');

/**
 * Returns an attribute of an `Element`.
 * For example, the `type` attribute on `input` elements.
 *
 * @param {String} attr - the attribute to get
 * @param {Element} node - the element to modify
 * @returns {String} the value of the attribute
 */
n.getAttr = function(attr, node) {
  return (node.getAttribute(attr) || '').trim();
};

/**
 * Set the attribute of an `Element`.
 *
 * @param {String} attr - the attribute to set
 * @param {Any} value - attr's new value
 * @param {Element} node - the element to modify
 * @returns {Element} the node
 */
n.setAttr = function(attr, value, node) {
  node.setAttribute(attr, get(value, node));
  return node;
};

/**
 * Remove an attribute of an `Element`.
 *
 * @param {String} attr - the attribute to remove
 * @param {Element} node - the element to modify
 * @returns {Element} the node
 */
n.removeAttr = function(attr, node) {
  node.removeAttribute(attr);
  return node;
};

/**
 * Add, remove, or toggle classes.
 *
 * @param {Array<String>} klasses - classes to add/remove/toggle
 * @param {Element} node - the element to modify
 * @returns {Element} node
 */
_.forEach(['add', 'remove', 'toggle'], function(func) {
  n[func + 'Class'] = function(klasses, node) {
    _.forEach(klasses, function(klass) {
      node.classList[func](klass);
    });
    return node;
  };
});

/**
 * Check to see if an element has _all_ the provided classes.
 *
 * @param {Array<String>} klasses - classes to check presence of
 * @param {Element} node - the element to modify
 * @returns {Boolean} the presence of all the classes
 */
n.hasClass = function(klasses, node) {
  return _.all(klasses, function(klass) {
    return node.classList.contains(klass);
  });
};

/**
 * Return an `Element`'s classes
 *
 * @param {Element} node - the element to modify
 * @returns {Array<String>} the element's classes
 */
n.getClass = function(node) {
  return _.toArray(node.classList);
};

/**
 * Get the computed styling of a node.
 *
 * @param {String} prop - the CSS property to fetch
 * @param {Element} node - the node
 * @returns {Any} the value of the node's CSS property
 */
n.getStyle = function(prop, node) {
  return getComputedStyle(node)[prop];
};

/**
 * Set the CSS style of a node.
 *
 * @param {String} prop - the property to modify
 * @param {Any} value - the value to set
 * @param {Element} node - the node
 * @returns {Element} the node
 */
n.setStyle = function(prop, value, node) {
  node.style[prop] = get(value, node);
  return node;
};

// Returns a data-attribute of an `Element`.
/**
 * @param {String} attr - the name of the data-attribute
 * @param {Element} node - the node
 * @returns {String} the value of the data-attribute
 */
n.getData = function(attr, node) {
  return n.getAttr('data-' + attr, node);
};

// Set the data-attribute of an `Element`.
/**
 * @param {String} attr - the data-attribute to set
 * @param {Any} value - attr's new value
 * @param {Element} node - the element to modify
 * @returns {Element} the node
 */
n.setData = function(attr, value, node) {
  return n.setAttr('data-' + attr, get(value, node), node);
};

// Remove an attribute of an `Element`.
/**
 * @param {String} attr - the data-attribute to remove
 * @param {Element} node - the element to modify
 * @returns {Element} the node
 */
n.removeData = function(attr, node) {
  return n.removeAttr('data-' + attr, node);
};

/**
 * Create a callback function for an event listener.
 *
 * @private
 * @param {Function} func - the callback function
 * @param {Element} node - the node
 * @returns {Function} the callback function
 */
function buildCallback(func, node) {
  return function(event) {
    return func(event, node);
  }
}

/**
 * Add an event listener to a node.
 *
 * @param {String} name - the name of the event
 * @param {Function} func - the callback function
 * @param {Element} node - the node
 * @returns {Function} an unwatcher function
 */
n.watch = function(name, func, node) {
  func = buildCallback(func, node);
  node.addEventListener(name, func);
  return function() {
    return node.removeEventListener(name, func);
  }
};

/**
 * Trigger an event on a node.
 *
 * @param {String} name - the name of the event
 * @param {Element} node - the node
 * @returns {Element} the ndoe
 */
n.trigger = function(name, node) {
  var event = d.createEvent('HTMLEvents');
  event.initEvent(name, true, true);
  node.dispatchEvent(event);
  return node;
};

/**
 * Get the innerHTML of a node.
 *
 * @param {Element} node - the node
 * @returns {String} the innerHTML of the node
 */
n.getInnerHTML = function(node) {
  return node.innerHTML.trim();
};

/**
 * Set the innerHTML of a node.
 *
 * @param {Any} value - the new value of the innerHTML
 * @param {Element} node - the node
 * @returns {Element} the node
 */
n.setInnerHTML = function(value, node) {
  node.innerHTML = get(value, node);
  return node;
};

/**
 * Get the outerHTML of a node.
 *
 * @param {Element} node - the node
 * @returns {String} the outerHTML of the node
 */
n.getOuterHTML = function(node) {
  return node.outerHTML;
};

/**
 * Set the outerHTML of a node.
 *
 * @param {Any} value - the new value of the outerHTML
 * @param {Element} node - the node
 * @returns {Element} the node
 */
n.setOuterHTML = function(value, node) {
  node.outerHTML = get(value, node);
  return node;
};

// Gets the value of an input.
/**
 * @param {Element} node - the node
 * @returns {Any} the value of the property
 */
n.getValue = function(node) {
  return n.getProp('value', node);
};

// Sets the value of an input.
/**
 * @param {Any} value - the property's new value
 * @param {Element} node - the node
 * @returns {Element} the node
 */
n.setValue = function(value, node) {
  return n.setProp('value', value, node);
};

/**
 * Get the position of an element relative to the d.
 *
 * @param {Element} node - the node
 * @returns {Object} the top and left offsets of the node
 */
n.offset = function(node) {
  var rect = node.getBoundingClientRect();
  return {
    top: rect.top + d.body.scrollTop,
    left: rect.left + d.body.scrollLeft
  };
};

/**
 * Get the position of an element relative to the offset parent.
 *
 * @param {Element} node - the node
 * @returns {Object} the top and left offsets of the node
 */
n.position = function(node) {
  return {
    top: node.offsetTop,
    left: node.offsetLeft
  };
};

/**
 * Get the offset height of an element.
 *
 * @param {Element} node - the node
 * @returns {Number} the height
 */
n.outerHeight = function(node) {
  return node.offsetHeight;
};

/**
 * Get the offset width of an element.
 *
 * @param {Element} node - the node
 * @returns {Number} the width
 */
n.outerWidth = function(node) {
  return node.offsetWidth;
};

/**
 * Remove a node.
 *
 * @param {Element} node - the node
 * @returns {Element} the node
 */
n.remove = function(node) {
  node.parentNode.removeChild(node);
  return node;
};

/**
 * Return a copy of a node.
 *
 * @param {Element} node - the node
 * @returns {Element} the cloned node
 */
n.clone = function(node) {
  return node.cloneNode(true);
};

/**
 * Create a new node.
 *
 * @param {String} tag - the HTML tag of the new node
 * @param {String} text - the text content of the new node
 * @returns {Element} the new node
 */
n.node = function(tag, text) {
  var node = d.createElement(tag);
  node.appendChild(_.isString(text) ? d.createTextNode(text) : text);
  return node;
};

/**
 * Create a document fragment.
 *
 * @returns {DocumentFragment} a new document fragment
 */
n.fragment = function() {
  return d.createDocumentFragment();
};

/**
 * Insert an `Element` after a reference node.
 *
 * @param {Element} value - the node to insert
 * @returns {Element} the inserted node
 */
n.insertAfter = function(value, node) {
  node.parentNode.insertBefore(value, node.nextSibling);
  return node;
};

/**
 * Insert an `Element` before a reference node.
 *
 * @param {Element} value - the node to insert
 * @returns {Element} the inserted node
 */
n.insertBefore = function(value, node) {
  node.parentNode.insertBefore(value, node);
  return node;
};

/**
 * Append an `Element` to an `Element`.
 *
 * @param {Element} value - the node to append
 * @param {Element} node - the parent node
 * @returns {Element} the parent node
 */
n.append = function(value, node) {
  node.appendChild(get(value, node));
  return node;
};

/**
 * Prepend an `Element` to an `Element`.
 *
 * @param {Element} value - the node to prepend
 * @param {Element} node - the parent node
 * @returns {Element} the parent node
 */
n.prepend = function(value, node) {
  if (node.childNodes[1]) {
    node.insertBefore(value, node.childNodes[1]);
  } else {
    n.append(value, node);
  }
  return node;
};

/**
 * Check to see if two nodes are identical.
 *
 * @param {Element} node - the node to match against
 * @param {Element} test - the node to test
 * @returns {Boolean} whether or not they are the same
 */
n.equal = function(node, test) {
  return node === test;
};

/* Find the compatible matcher */
var matcher = _.find([
  "matches",
  "matchesSelector",
  "msMatchesSelector",
  "mozMatchesSelector",
  "webkitMatchesSelector",
  "oMatchesSelector"
], function(method) {
  return testNode[method] != null;
});

/**
 * Check if a node matches a selector.
 *
 * @param {Any} s - the selector
 * @param {Element} node - the node
 * @returns {Boolean} whether the node has any descendents matching the selector
 */
n.matches = function(s, node) {
  return node[matcher](s);
};

/**
 * Check if a node doesn't matches a selector.
 *
 * @param {Any} s - the selector
 * @param {Element} node - the node
 * @returns {Boolean} whether the node has any descendents matching the selector
 */
n.not = function(s, node) {
  return !node[matcher](s);
};

/**
 * Check if a node has any descendents matching a selector.
 *
 * @param {Any} s - the selector
 * @param {Element} node - the node
 * @returns {Boolean} whether the node has any descendents matching the selector
 */
n.has = function(s, node) {
  return _.any(c.q(s, node));
};

/**
 * Check to see if the value of an attribute matches a predicate.
 *
 * @param {String} attr - the attribute to check
 * @param {String} value - the predicate
 * @param {Element} node - the node
 * @returns {Boolean} whether the value of the attribute matches the predicate
 */
n.attrEqual = function(attr, value, node) {
  return n.getAttr(attr, node) === get(value, node);
};

/**
 * Check to see if the value of an attribute passes a `RegExp` test.
 *
 * @param {String} attr - the attribute to check
 * @param {RegExp} regex - the RegExp to test
 * @param {Element} node - the node
 * @returns {Boolean} whether the value of the attribute matches the predicate
 */
n.attrMatch = function(attr, regex, node) {
  return regex.test(n.getAttr(attr, node).toString());
};

/**
 * Check to see if the value of a property matches a predicate.
 *
 * @param {String} attr - the property to check
 * @param {String} value - the predicate
 * @param {Element} node - the node
 * @returns {Boolean} whether the value of the property matches the predicate
 */
n.propEqual = function(attr, value, node) {
  return n.getProp(attr, node) === get(value, node);
};

/**
 * Check to see if the value of a property passes a `RegExp` test.
 *
 * @param {String} attr - the property to check
 * @param {RegExp} regex - the RegExp to test
 * @param {Element} node - the node
 * @returns {Boolean} whether the value of the property matches the predicate
 */
n.propMatch = function(attr, regex, node) {
  return regex.test(n.getProp(attr, node).toString());
};

/**
 * Check to see if the value of a data-attribute matches a predicate.
 *
 * @param {String} attr - the data-attribute to check
 * @param {String} value - the predicate
 * @param {Element} node - the node
 * @returns {Boolean} whether the value of the data-attribute matches the predicate
 */
n.dataEqual = function(attr, value, node) {
  return n.getData(attr, node) === get(value, node);
};

/**
 * Check to see if the value of a data-attribute passes a `RegExp` test.
 *
 * @param {String} attr - the data-attribute to check
 * @param {RegExp} regex - the RegExp to test
 * @param {Element} node - the node
 * @returns {Boolean} whether the value of the data-attribute matches the predicate
 */
n.dataMatch = function(attr, regex, node) {
  return regex.test(n.getData(attr, node).toString());
};

/**
 * Check to see if the text content matches a predicate.
 *
 * @param {String} value - the text-content to check
 * @param {Element} node - the node
 * @returns {Boolean} whether the text content matches the predicate
 */
n.textEqual = function(value, node) {
  return n.getText(node) === get(value, node);
};

/**
 * Check to see if the text content passes a `RegExp` test.
 *
 * @param {RegExp} regex - the RegExp to test
 * @param {Element} node - the node
 * @returns {Boolean} whether the text content matches the predicate
 */
n.textMatch = function(regex, node) {
  return regex.test(n.getText(node))
};

/**
 * Check to see if the text content matches a predicate.
 *
 * @param {Any} tag - the tag predicate
 * @param {Element} node - the node
 * @returns {Boolean} whether the node's tag matches the predicate
 */
n.tagMatch = function(tag, node) {
  return get(tag, node) === node.tagName;
};

/**
 * Passes through `s` if it's an Element or a Text node, or uses
 * `d.querySelector` to retrieve the element.
 *
 * @param {Any} s - an `Element` or `Text` node or a selector
 * @returns {Element} the passed through `s` or the element (or null)
 */
n.q = function(s, n) {
  return (s instanceof Element || s instanceof Text) ? s : (n || d).querySelector(s);
};

/**
 * Returns a property of an `Element`.
 * For example, the `checked` property on checkboxes.
 *
 * @param {String} prop - the name of the property to get
 * @param {Element} node - the node
 * @returns {String} the value of the property
 */
n.getProp = function(prop, node) {
  return (node[prop] || '').trim();
};

/**
 * Sets the property of an `Element`.
 *
 * @param {String} prop - the name of the property to set
 * @param {Any} value - the property's new value
 * @param {Element} node - the node
 * @returns {Element} the node
 */
n.setProp = function(prop, value, node) {
  node[prop] = get(value, node);
  return node;
};

/**
 * Removes a property of an `Element`.
 *
 * @param {String} prop - the name of the property to remove
 * @param {Element} node - the node
 * @returns {Element} the node
 */
n.removeProp = function(prop, node) {
  delete node[prop];
  return node;
};

/**
 * Get the text content of an `Element`.
 *
 * @param {Element} node - the node
 * @returns {Element} the text content of the node
 */
n.getText = function(node) {
  return (node.textContent || '').trim();
};

/**
 * Set the text content of an `Element`.
 *
 * @param {Any} value - the node's new text content
 * @param {Element} node - the node
 * @returns {Element} the node
 */
n.setText = function(value, node) {
  node.textContent = get(value, node);
  return node;
};

/**
 * Retrieve an `Element`'s siblings.
 *
 * @param {Element} node - the node
 * @returns {Array<Element>} the node's siblings
 */
n.siblings = function(node) {
  var siblings = [];
  for (var n = node.parentNode.firstChild; n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== node) {
      siblings.push(n);
    }
  }
  return siblings;
};

/**
 * Retrieve an `Element`'s children.
 *
 * @param {Element} node - the node
 * @returns {Array<Element>} the node's children
 */
n.children = function(node) {
  return n.siblings(node.firstChild);
};

/**
 * Retrieve an `Element`'s parent.
 *
 * @param {Element} node - the node
 * @returns {Element} the parent node (or null)
 */
n.parent = function(node) {
  var parent = node.parentNode;
  return parent && parent.nodeType !== 11 ? parent : null;
};

/**
 * Passes through `s` if it's an Array,
 * returns `s` as an array if `s` is an `HTMLCollection` or a `NodeList`,
 * or performs returns an array of `d.querySelectorAll`.
 *
 * @param {Any} s - an array-like object of `Element`s or a CSS selector
 * @param {Element} c - the context for `querySelectorAll`
 * @returns {Array<Element>} the matched elements
 */
c.q = function(s, c) {
  if (_.isArray(s)) {
    return s;
  } else if (s instanceof HTMLCollection || s instanceof NodeList) {
    return _.toArray(s);
  } else {
    return _.toArray((c || d).querySelectorAll(s));
  }
};

/**
 * Adapt all of `n`'s  functions for use with collections
 * (using the `c` namespace), and curry everything.
 */
_.forEach(n, function(func, name) {
  // Don't run for the `q` function
  if (name !== 'q') {
    c[name] = curry(function() {
      var args = _.initial(arguments),
          collection = _.last(arguments);
      return _.reduce(collection, function(response, element) {
        return response.concat(func.apply(null, args.concat(element)));
      }, []);
    }, func.length);

    n[name] = curry(func, func.length);
  }
});


  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose fQuery to the global object even when an AMD loader is present in
    // case fQuery is loaded with a RequireJS shim config.
    // See http://requirejs.org/docs/api.html#config-shim
    root.n = n;
    root.c = c;
    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "fQuery" module
    define(function() { return n; });
    define(function() { return c; });
  } else {
    // in a browser or Rhino
    root.n = n;
    root.c = c;
  }
}).call(this);
