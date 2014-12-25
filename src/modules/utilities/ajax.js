function requestSuccess(request) {
  return request.status >= 200 && request.status < 400;
}

u.ajax = curry(function(type, func, options) {
  return _.tap(new XMLHttpRequest(), function(request) {
    request.open(type.toUpperCase(), _.isString(options) ? options : options.url, true);
    request.onreadystatechange = function() {
      if (request.readyState !== 4) return;
      func(!requestSuccess(request), request.responseText, request);
    }
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    _.forEach(options.header || {}, function(value, key) {
      request.setRequestHeader(key, value);
    });
    request.send(options.data || "");
  });
});

u.get = u.ajax('get');
u.post = u.ajax('post');
u.put = u.ajax('put');
u.patch = u.ajax('patch');
u.delete = u.ajax('delete');

u.head = u.ajax('head');
u.options = u.ajax('options');
