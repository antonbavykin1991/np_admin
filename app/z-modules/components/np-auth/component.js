import Ember from 'ember';

export default Ember.Component.extend({
  visitorSession: Ember.inject.service(),

  actions: {
    signIn(email, password) {
      this.get('visitorSession').signIn(email, password)
    }
  }

});
