var f = (function() {
  function f(object) {
    this.wrapped = true;
    this.value = object;
    this.events = {};
  }

  f.prototype.valueOf = function() {
    return this.value;
  }

  return f;
})();

query.wrap = function(object) {
  return new f(object);
};

query.unwrap = function(f) {
  return f.value;
};