query.array = function(array) {
  return _.isArray(array) ? array : [array];
};

query.wrap = function(object) {
  return {
    wrapped: true,
    value: object,
    valueOf: function() {
      return this.value;
    }
  };
};

query.unwrap = function(object) {
  return object.value;
};
