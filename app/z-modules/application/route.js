import Ember from 'ember';

export default Ember.Route.extend({
  visitorSession: Ember.inject.service(),

  beforeModel() {
    return this.get('visitorSession').checkSession()
  },

  model() {
    return this.get('visitorSession').getCurrentUser()
  }
});
