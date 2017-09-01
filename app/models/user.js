import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  role: attr(),

  firstName: attr('string'),

  lastName: attr('string'),

  fullName: Ember.computed('firstName', 'lastName', function () {
    return `${this.get('firstName')} ${this.get('lastName')}`
  }),

  isAdmin: Ember.computed.bool('role.admin'),

  isHookah: Ember.computed.bool('role.hookah'),

  isBarman: Ember.computed.bool('role.barman'),

  isMain: Ember.computed.bool('role.main'),

  isWaiter: Ember.computed.bool('role.waiter'),

  hasPermissionsForProfit: Ember.computed.or('isMain', 'isWaiter'),

  hasPermissionsForExpenses: Ember.computed.or('isMain', 'isWaiter'),

  hasPermissionsForCheckUserSalary: Ember.computed.or('isMain', 'isWaiter')
});
