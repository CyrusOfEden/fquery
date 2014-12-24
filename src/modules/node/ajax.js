function requestSuccess(request) {
  return request.status >= 200 && request.status < 400;
}

function ajax(type, url, options) {
  return _.tap(new XMLHttpRequest(), function(request) {
    request.open(type.toUpperCase(), url, true);
    if (options.then) {
      request.onreadystatechange = function() {
        if (request.readyState !== 4) return;
        options.then(requestSuccess(request), request.responseText, request);
      }
    } else {
      request.onreadystatechange = function() {
        if (request.readyState !== 4) return;
        var success = requestSuccess(request);
        if (success && options.success) {
          options.success(request.responseText, request);
        } else if (options.error) {
          options.error(request.statusText, request);
        }
      }
    }
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    _.forEach(options.header || {}, function(value, key) {
      request.setRequestHeader(key, value);
    });
    request.send(options.data || "");
  });
};

u.ajax = _.curry(ajax);

u.get = u.ajax('get');
u.post = u.ajax('post');
u.put = u.ajax('put');
u.patch = u.ajax('patch');
u.delete = u.ajax('delete');

u.head = u.ajax('head');
u.options = u.ajax('options');
