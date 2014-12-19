f.node = function(s) {
  return s instanceof Element ? s : document.querySelector(s)
};
