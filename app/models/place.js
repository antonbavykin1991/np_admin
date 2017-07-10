import Ember from 'ember';
import DS from 'ember-data';
import RSVP from 'rsvp';
import attr from 'ember-data/attr';

import {productTotalPrice} from 'np-admin/helpers/product-total-price';

export default DS.Model.extend({
  visitorSession: Ember.inject.service(),

  productRequests: DS.hasMany('product-request'),

  ps: attr('boolean'),

  size: attr('number'),

  status: attr('number'),

  isEmpty: Ember.computed.equal('status', 0),

  isActive: Ember.computed.equal('status', 1),

  totalPrice: Ember.computed('productRequests.@each.totalPrice', function() {
    return productTotalPrice([this.get('productRequests')])
  }),

  checkExistsProduct(product) {
    return this.get('productRequests').findBy('product.id', product.get('id'))
  },

  createProductRequest(product) {
    const data = product.getProperties('name', 'price')
    const productRequest = this.get('store').createRecord('product-request', data)
    const currentVisitor = this.get('visitorSession.model')

    productRequest.set('createdAt', new Date())
    productRequest.set('product', product)
    productRequest.set('user', currentVisitor)

    productRequest.save().then(() => {
      this.get('productRequests').addObject(productRequest)

      return this.save()
    })
  },

  //TODO cannot delete productRequest.isPaid
  deleteProductRequest(productRequestId) {
    const productRequest = this.get('productRequests').findBy('id', productRequestId)

    return productRequest.destroyRecord().then(() => this.save())
  },

  changeDiscount(discount) {
    const savedProductRequestArray = [];

    this.get('productRequests').toArray().forEach((productRequest) => {
      savedProductRequestArray.push(productRequest.changeDiscount(discount))
    })

    return RSVP.all(savedProductRequestArray)
  },

  archiveProductsRequests() {
    const savedProductRequestArray = [];

    this.get('productRequests').toArray().forEach((productRequest) => {
      savedProductRequestArray.push(productRequest.archive())
    })

    return RSVP.all(savedProductRequestArray).then(() => {
      this.set('productRequests', [])
      return this.save()
    })
  }
});
