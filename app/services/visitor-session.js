import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
  session: Ember.inject.service(),

  routing: Ember.inject.service('-routing'),

  store: Ember.inject.service('store'),

  isAuthenticated: Ember.computed.reads('session.isAuthenticated'),

  uid: Ember.computed.reads('session.uid'),

  model: null,

  signIn (email, password) {
    return this.get('session').open('firebase', {
      provider: 'password',
      email,
      password
    }).then(() => {
      this.get('routing').transitionTo(config.routeAfterAuthentication)
    }, (error) => {
      Ember.Logger.log(error)
    })
  },

  checkSession() {
    return this.get('session').fetch().catch(function() {})
  },

  getCurrentUser() {
    if(this.get('isAuthenticated')) {
      const uid = this.get('uid')

      return this.get('store').findRecord('user', uid).then((user) => {
        this.set('model', user)
      })
    }
  },

  signOut () {
    this.get('session').close();
  }
});
