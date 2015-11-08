module.exports = {
  message: 'Only extend placeholders. Extending classes often has unintended results!',
  name: 'only-extend-placeholders',
  test: function(ast){
    var errors = [];

    ast.traverse(function(node) {
      if (node.type !== 'extend') {
        return;
      }

      node.traverse(function(simpleSelector){
        if (simpleSelector.type !== 'simpleSelector') {
          return;
        }

        if (!simpleSelector.contains('placeholder')) {
          errors.push({
            node: node
          });
        }
      });
    });

    return errors;
  }
};
