define(function (require) {
  var registerSuite = require('intern!object'),
      assert        = require('intern/chai!assert'),
      plugin        = require('intern/dojo/node!../index'),
      fs            = require('intern/dojo/node!fs'),
      gonzales      = require('intern/dojo/node!../node_modules/gonzales-pe');

  registerSuite({
    name: 'polish-only-extend-placeholders',

    message: function () {
      assert.strictEqual(plugin.message, 'Only extend placeholders. Extending classes often has unintended results!');
    },

    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/scss.scss', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'scss' }));

        assert.strictEqual(errors.length, 3);
        assert.equal(errors[0].node.toString().trim(), '@extend .something-bad-to-extend');
        assert.equal(errors[1].node.toString().trim(), '@extend .something-bad-to-extend');
        assert.equal(errors[2].node.toString().trim(), '@extend .something-bad-to-extend');
      }));}
  });
});
