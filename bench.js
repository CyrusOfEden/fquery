var n, i, path;

path = document.location.pathname;

n = 10000;
console.time('jQuery');
while (--n) {
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

n = 10000;
console.time('fQuery');
while (--n) {
  f.l('.six-columns.text-container');

  _.select(f.l('.navbar a'), f.attrEqual('href', path));

  f.offset(f.l('p.lead'));

  f.toggleClass('lead', f.l('lead'));

  _.filter(f.l('.navbar a'), f.hasClass('active'));

  var list = f.l('p.lead');
  _.map(f.getText(list), f.setData('content'));

  f.children(f.l('.inner'));

  _.forEach(f.l('.navbar a'), function(node) {
    var unwatch = f.watch('mouseover', _.noop, node);
    f.trigger('mouseover', node);
    unwatch();
  });
}
console.timeEnd('fQuery');
