(function() {
  'use strict';

  var styles = {
    pass: 'color: green',
    fail: 'color: red'
  };

  var name = "Tests completed in",
      pass = [],
      fail = [];

  document.addEventListener('DOMContentLoaded', function() {
    console.time(name);

<%= contents %>

    console.log("\n");
    console.timeEnd(name);

    var style = styles[fail.length ? 'fail' : 'pass'];

    console.log("%c" + pass.length + " passes, " + fail.length + " failures.", style);
    console.log("%c" + fail.join(', '), style);
  });

})();