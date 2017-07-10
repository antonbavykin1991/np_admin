import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  editableExpense: {},

  products: Ember.computed(function () {
    return this.get('store').findAll('product')
  }),

  onSave ({data, entityModelName, keys}) {
    console.log(data, entityModelName, keys);

    let entity = null

    if (data.entityId) {
      entity = this.get('store').peekRecord(entityModelName, data.entityId);
      entity.setProperties(data);
    } else {
      entity = this.get('store').createRecord(entityModelName, data);
    }

    if (data.product) {
      const product = this.get('store').peekRecord('product', data.product)
      entity.set('product', product)
    }

    return entity.save()
  },

  actions: {
    editExpense(expense) {
      const data = expense.getProperties('id', 'name', 'description', 'price', 'createdAt', 'quantity')

      data.productId = expense.get('product.id')

      this.set('editableExpense', data)
    },

    deleteExpense(expense) {
      expense.destroyRecord()
    }
  }
});
