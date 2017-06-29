import Ember from 'ember';

export default Ember.Component.extend({
  editableProduct: {},

  actions: {
    editProduct(product) {
      const id = product.get('id')

      this.set('editableProduct', Object.assign({}, product.toJSON(), {id}))
    },

    deleteProduct(product) {
      product.destroyRecord()
    }
  }
});
