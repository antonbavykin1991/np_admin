import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  role: attr('number'),

  firstName: attr('string'),

  lastName: attr('string'),

  fullName: Ember.computed('firstName', 'lastName', function () {
    return `${this.get('firstName')} ${this.get('lastName')}`
  }),

  isAdmin: Ember.computed.equal('role', 99)
});
