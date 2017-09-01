import Ember from 'ember';

export default Ember.Component.extend({
  visitorSession: Ember.inject.service(),

  hasPermissionsForProfit: Ember.computed.or('visitorSession.model.hasPermissionsForProfit'),

  hasPermissionsForExpenses: Ember.computed.or('visitorSession.model.hasPermissionsForExpenses')
});