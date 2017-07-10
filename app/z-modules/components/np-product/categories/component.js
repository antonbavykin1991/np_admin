import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  createCategory() {
    let entity = null;

    const data = this.getProperties('categoryId', 'name')

    if (data.categoryId) {
      entity = this.get('store').peekRecord('category', data.categoryId)
      entity.setProperties(data)
    } else {
      entity = this.get('store').createRecord('category', data)
    }

    entity.save().then(() => this.clearForm())
  },

  clearForm() {
    this.setProperties({
      productId: null,
      name: null
    })
  }
});
