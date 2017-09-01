import Ember from 'ember';

export default Ember.Mixin.create({
  sidebar: Ember.inject.service(),

  setupController(controller, model) {
    this._super(...arguments)
    this.get('sidebar').set('hasYieldClassName', true)
  },

  resetController() {
    this._super(...arguments)

    console.log('resetController');

    this.get('sidebar').set('hasYieldClassName', false)
  },

  renderTemplate() {
    this._super(...arguments);
    this.renderSidebar();
  },

  componentName: null,

  componentParams() {
    return {}
  },

  renderSidebar() {
    const componentName = this.get('componentName');
    const componentParams = this.componentParams() || {};

    Ember.assert(`You should provide component name to the router: ${this.toString()}`, componentName);

    const component = Ember.getOwner(this).lookup(`component:${componentName}`);

    component.reopen(componentParams);

    this.render(`components/${componentName}`, {
      into: 'index',
      outlet: 'sidebar',
      controller: component
    });
  },

  actions: {
    willTransition () {
      console.log('willTransition');
    }
  }
});
