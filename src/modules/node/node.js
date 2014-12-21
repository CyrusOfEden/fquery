n.q = function(s) {
  return (s instanceof Element || s instanceof Text) ? s : document.querySelector(s);
};
