import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('np-product/categories', 'Integration | Component | np product/categories', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{np-product/categories}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#np-product/categories}}
      template block text
    {{/np-product/categories}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
