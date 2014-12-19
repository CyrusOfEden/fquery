f.node = f.n = function(s) {
  return s instanceof Element ? s : document.querySelector(s)
};
