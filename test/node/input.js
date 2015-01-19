suite("Input", function() {
  var form = n.q('#user_signup'),
      $form = $(form),
      inputs = c.q('input', form),
      $inputs = $(inputs),

      email = _.find(inputs, n.matches('[type="email"]')),
      $email = $(email),
      content = "clark.kent@gmail.com";

  suite("Value", function() {
    test("get value", function() {
      $email.val(content);
      assert.equal(n.getValue(email), $email.val());
    });

    test("set value", function() {
      n.setValue('', email);
      assert.equal($email.val(), '');
    });
  });
});