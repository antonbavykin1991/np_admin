import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  visitorSession: Ember.inject.service(),

  hasPermissionsForCheckUserSalary: Ember.computed.reads('visitorSession.model.hasPermissionsForCheckUserSalary'),

  userId: Ember.computed('hasPermissionsForCheckUserSalary', 'visitorSession.model.id', function () {
    return this.get('hasPermissionsForCheckUserSalary') ? null : this.get('visitorSession.model.id');
  }),

  model() {
    const hasPermissionsForCheckUserSalary = this.get('hasPermissionsForCheckUserSalary');
    const userId = this.get('userId');

    const users = this.store.findAll('user', {reload: true}).then((users) => {
      return users.filterBy('isHookah', true)
    });

    return RSVP.hash({
      users: hasPermissionsForCheckUserSalary ? users : [],
      hasPermissionsForCheckUserSalary,
      userId
    });
  }
});
