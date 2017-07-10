import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  paramsArray: Ember.computed(function() {
    const params = this.get('params')
    const paramsArray = []

    for (let key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const options = params[key]
        const title = typeof options === 'string' ? options :  options.title
        const type = options && options.type ? options.type : 'text'

        paramsArray.push({
          key: key,
          title: title,
          id: `${this.get('elementId')}-${key}`,
          type: type,
          isFormElement: true,
          isDate: type === 'date',
          isText: type === 'text',
          isSelect: type === 'select',
          data: options.data
        })
      }
    }

    paramsArray.push({
      key: 'entityId',
      isFormElement: false
    })

    return paramsArray
  }),

  _keys: Ember.computed.mapBy('paramsArray', 'key'),

  onSave({data, entityModelName, keys}) {
    let entity = null

    if (data.entityId) {
      entity = this.get('store').peekRecord(entityModelName, data.entityId)
      entity.setProperties(data)
    } else {
      entity = this.get('store').createRecord(entityModelName, data)
    }

    return entity.save()
  },

  create() {
    const keys = this.get('_keys')
    const data = this.getProperties.apply(this, keys)
    const entityModelName = this.get('entityModelName')

    this
      .onSave({data, entityModelName, keys})
      .then(() => this.clearForm())
  },

  clearForm() {
    const keys = this.get('_keys')
    let properties = {}

    keys.forEach(key => properties[key] = null)

    this.setProperties(properties)
  },

  onSelection(key, value) {
    this.set(key, value)
  }
});
