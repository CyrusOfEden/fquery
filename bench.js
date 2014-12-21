var v, i, path;

path = document.location.pathname;

v = 10000;
console.time('jQuery');
while (--v) {
  $('.six-columns.text-container');

  $('.navbar a').filter(function() {
    return $(this).attr('href') === path;
  });

  $('p.lead').map(function() {
    return $(this).offset();
  });

  $('p.lead').toggleClass('lead');

  $('.navbar a').filter('.active');

  $('p.lead').each(function() {
    var $this = $(this);
    $this.data('content') = $this.text();
  });

  $('.inner').children();

  $('.navbar a').each(function() {
    var $this = $(this);
    $this.on('mouseover', $.noop);
    $this.trigger('mouseover');
    $this.off('mouseover');
  });
}
console.timeEnd('jQuery');

v = 10000;
console.time('fQuery');
while (--v) {
  c.q('.six-columns.text-container');

  _.select(c.q('.navbar a'), n.attrEqual('href', path));

  c.offset(c.q('p.lead'));

  c.toggleClass('lead', c.q('lead'));

  _.filter(c.q('.navbar a'), n.hasClass('active'));

  _.map(c.getText(c.q('p.lead')), n.setData('content'));

  c.children(c.q('.inner'));

  _.forEach(c.q('.navbar a'), function(node) {
    var unwatch = n.watch('mouseover', _.noop, node);
    n.trigger('mouseover', node);
    unwatch();
  });
}
console.timeEnd('fQuery');
