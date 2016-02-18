(function($) {
'use strict';

var $form = $('#calculator'),
    $button = $form.find('button'),
    $input = $form.find('input'),
    input = $input[0],
    $numbers = $form.find('.numbers'),
    $operators = $form.find('.operators'),
    $root = $('#root'),
    $remove = $('#remove'),
    $percent = $('#percent'),
    $del = $('#delete'),
    emptyExpression = {
      operand1: null,
      operand2: null,
      operator: null
    },
    expression = emptyExpression;

$form.on('submit', function(event) {
  event.preventDefault();
});

$numbers.children().on('click', function() {
  var isOperatorUndefined = null === expression.operator;

  if (null === expression.operand1) {
    expression.operand1 = this.innerHTML;
  } else if (isOperatorUndefined) {
    expression.operand1 += this.innerHTML;
  } else if (null === expression.operand2) {
    expression.operand2 = this.innerHTML;
  }
  else {
    expression.operand2 += this.innerHTML;
  }

  input.value = expression.operand1 + (expression.operator || '') + (expression.operand2 || '');
});

$operators.children().on('click', function() {
  if (null === expression.operator) {
    expression.operator = this.innerHTML;
    input.value += expression.operator;
  }
});
var value = 0;
$button.on('click', function() {

  if (null === expression.operand1 || null === expression.operand2 || null === expression.operator) {
    console.log('Error: nothing to calculate.', expression);
  }
  else {
    switch (expression.operator) {
      case '+':
        value = parseFloat(expression.operand1, 10) + parseFloat(expression.operand2, 10);
        break;

      case '-':
        value = parseFloat(expression.operand1, 10) - parseFloat(expression.operand2, 10);
        break;

      case '/':
        value = parseFloat(expression.operand1, 10) / parseFloat(expression.operand2, 10);
        break;

      case '*':
        value = parseFloat(expression.operand1, 10) * parseFloat(expression.operand2, 10);
        break;
    }

    expression.operand1 = value;
    expression.operand2 = null;
    expression.operator = null;

    $input.val(value);
    expression = emptyExpression;
  }
});

$percent.on('click', function() {
  var proc = 0;
  if (expression.operator === '-' || expression.operator === '+' || expression.operator === '/' || expression.operator === '*') {
    proc = expression.operand1 * (expression.operand2 / 100);
  }

  $input.val(proc);
  expression.operand2 = proc;
});

$remove.on('click', function() {
  if (expression.operand2 != null) {
    expression.operand2 = null;
    $input.val(expression.operand1 + expression.operator);
  }
  else if (expression.operator != null) {
    expression.operator = null;
    $input.val(expression.operand1);
  }
  else if (expression.operand1 != null) {
    expression.operand1 = null;
    $input.val('0');
  }
});

$root.on('click', function() {
  var squareRoot = Math.sqrt(expression.operand1);
  $input.val(squareRoot);
});

$del.on('click', function() {
  $input.val('0');
  expression.operand1 = null;
  expression.operand2 = null;
  expression.operator = null;
});
})(jQuery);
