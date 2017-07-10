
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('product-total-price', 'helper:product-total-price', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{product-total-price inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

