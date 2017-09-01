import Ember from 'ember';

export default Ember.Component.extend({
  activePlace: Ember.computed.reads('target.activePlace'),

  totalPrice: Ember.computed('places.@each.totalPrice', function () {
    let price = 0;

    this.get('places').toArray().forEach((place) => {
      const totalPrice = place.get('totalPrice');

      price = price + totalPrice
    })

    return price;
  }),

  goToPlace(placeId) {
    this.router.transitionTo(`/places/${placeId}`)
  }
});
