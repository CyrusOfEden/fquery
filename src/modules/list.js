f.list = function(s) {
  if (_.isArray(s)) {
    this.value = s;
  } else if (s instanceof HTMLCollection || s instanceof NodeList) {
    this.value = _.toArray(s);
  } else {
    this.value = _.toArray(document.querySelectorAll(s));
  }
};

f.list.prototype = {
  valueOf: function() {
    return this.value;
  }
};

f.l = function(s) {
  return new f.list(s).value;
};
