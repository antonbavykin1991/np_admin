import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';

import RSVP from 'rsvp';

export default DS.Model.extend({
  product: DS.belongsTo('product'),

  price: attr('number'),

  name: attr('string'),

  quantity: attr('number', {
    defaultValue: 1
  }),

  discount: attr('number', {
    defaultValue: 0
  }),

  createdAt: attr('date'),

  status: attr('number', {
    defaultValue: 0
  }),

  isPaid: Ember.computed.equal('status', 1),

  inPlace: Ember.computed.equal('status', 0),

  totalPrice: Ember.computed('price', 'quantity', 'discount', function () {
    const discount = this.get('discount') / 100;
    const totalPrice = this.get('price') * this.get('quantity');

    return totalPrice - (totalPrice * discount);
  }),

  changeQuantity(increment) {
    const quantity = this.get('quantity')
    const method = increment ? 'incrementProperty' : 'decrementProperty'

    if (quantity < 2 && !increment) {
      return false
    }

    this[method]('quantity')

    this.save()
  },

  clone() {
    const data = this.toJSON()

    const productRequest = this.store.createRecord('product-request', data)

    productRequest.set('createdAt', new Date(data.createdAt))

    return productRequest.save()
  },

  changeDiscount(discount) {
    this.set('discount', discount)

    return this.save()
  },

  archive() {
    const clonePromiseArray = []
    const quantity = this.get('quantity')

    this.set('status', 1)
    this.set('quantity', 1)

    for (let i = 1; i<quantity; i++) {
      clonePromiseArray.push(this.clone())
    }

    clonePromiseArray.push(this.save())

    return RSVP.all(clonePromiseArray)
  }
});
