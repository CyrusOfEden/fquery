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