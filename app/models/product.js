import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  category: DS.belongsTo('category'),

  name: attr('string'),

  price: attr('number', {
    defaultValue: 0
  }),

  code: attr('number'),

  tags: attr('string', {
    defaultValue: ''
  }),

  isHookah: Ember.computed.equal('category.name', 'Кальян')
});
