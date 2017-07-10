import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  product: DS.belongsTo('product'),

  name: attr('string'),

  description: attr('string'),

  createdAt: attr('date'),

  status: attr('number'),

  price: attr('number'),

  quantity: attr('number', {
    defaultValue: 1
  }),

  totalPrice: Ember.computed('quantity', 'price', function () {
    const {
      quantity,
      price
    } = this.getProperties('quantity', 'price')

    if (!quantity || !price) {return 0}

    return quantity * price;
  })
});
