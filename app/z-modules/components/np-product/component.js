import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  editableProduct: {},

  categories: Ember.computed(function () {
    return this.get('store').findAll('category', {reload: true});
  }),

  onSave ({data, entityModelName, keys}) {
    let entity = null

    if (data.entityId) {
      entity = this.get('store').peekRecord(entityModelName, data.entityId)
      entity.setProperties(data)
    } else {
      entity = this.get('store').createRecord(entityModelName, data)
    }

    if (data.category) {
      const category = this.get('store').peekRecord('category', data.category)
      entity.set('category', category)
    }

    return entity.save()
  },

  actions: {
    editProduct(product) {
      const id = product.get('id')

      const categoryId = product.get('category.id')

      this.set('editableProduct', Object.assign({}, product.toJSON(), {id, categoryId}))
    },

    deleteProduct(product) {
      product.destroyRecord()
    }
  }
});
