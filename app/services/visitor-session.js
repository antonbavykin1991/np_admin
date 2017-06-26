import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
  session: Ember.inject.service(),

  routing: Ember.inject.service('-routing'),

  signIn (email, password) {
    return this.get('session').open('firebase', {
      provider: 'password',
      email,
      password
    }).then(() => {
      console.log(config.routeAfterAuthentication);
      this.get('routing').transitionTo(config.routeAfterAuthentication)
    }, (error) => {
      console.log(error);
    })
  },

  signOut () {
    this.get('session').close();
  }
});
