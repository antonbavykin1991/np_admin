import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('np-orders/salary', 'Integration | Component | np orders/salary', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{np-orders/salary}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#np-orders/salary}}
      template block text
    {{/np-orders/salary}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
