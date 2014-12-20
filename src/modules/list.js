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
