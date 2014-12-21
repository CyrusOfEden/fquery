f.node = function(s) {
  this.value = (s instanceof Element || s instanceof Text) ? s : document.querySelector(s);
};

f.node.prototype = {
  valueOf: function() {
    return this.value;
  }
};

f.n = function(s) {
  return new f.node(s).value;
};
