import Ember from 'ember';

export default Ember.Route.extend({
  redirect() {
    const model = this.modelFor('index.places')
    const firstPlace = model.get('firstObject.id')

    if (!firstPlace) { return }

    return this.transitionTo('index.places.order', firstPlace)
  },
});
