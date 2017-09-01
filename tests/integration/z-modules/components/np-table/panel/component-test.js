import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('np-table/panel', 'Integration | Component | np table/panel', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{np-table/panel}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#np-table/panel}}
      template block text
    {{/np-table/panel}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
