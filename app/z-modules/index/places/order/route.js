import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model({place_id}) {

    return RSVP.hash({
      place: this.store.peekRecord('place', place_id),
      products: this.store.findAll('product'),
      users: this.store.findAll('user', {reload: true}).then((users) => {
        return users.filterBy('isHookah', true)
      })
    })
  },

  setupController(controller, model) {
    this._super(...arguments)

    this.controllerFor('index.places').set('activePlace', Ember.get(model, 'place.id'))
  },

  resetController() {
    this._super(...arguments)

    this.controllerFor('index.places').set('activePlace', null)
  }
});
