import Ember from 'ember';
import RadioButton from 'ember-radio-button/components/radio-button';

export default RadioButton.extend({
  model: null,

  actions: {
    changed(newValue) {
      const model = this.get('model');

      this.sendAction('changed', model, newValue);
    }
  }
});
