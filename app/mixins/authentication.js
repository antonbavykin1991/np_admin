import Ember from 'ember';
import config from '../config/environment';

const {inject: {service}, Mixin} = Ember;
const {routeAfterAuthentication} = config;

export default Mixin.create({
	session: service(),

  signIn (provider = 'password', email, password) {
    return this.get('session').open('firebase', {
      provider,
      email,
      password
    }).then(() => this.transitionToRoute(routeAfterAuthentication));
  },

  signOut () {
    this.get('session').close();
  }
});
