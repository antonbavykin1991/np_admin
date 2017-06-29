import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  name: attr('string'),

  price: attr('number', {
    defaultValue: 0
  }),

  code: attr('number'),

  tags: attr('string', {
    defaultValue: ''
  })
});
