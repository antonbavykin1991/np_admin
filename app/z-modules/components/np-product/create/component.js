import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  createProduct() {
    let entity = null;
    const data = this.getProperties('productId', 'name', 'price', 'code', 'tags')

    if (data.productId) {
      entity = this.get('store').peekRecord('product', data.productId);
      entity.setProperties(data);
    } else {
      entity = this.get('store').createRecord('product', data);
    }

    entity.save().then(() => this.clearForm())
  },

  clearForm() {
    this.setProperties({
      productId: null,
      name: null,
      price: null,
      code: null,
      tags: null
    });
  }
});
