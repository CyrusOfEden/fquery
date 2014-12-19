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