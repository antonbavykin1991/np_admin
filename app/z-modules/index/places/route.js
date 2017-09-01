import Ember from 'ember';
import SidebarMixin from 'np-admin/mixins/sidebar-mixin';

export default Ember.Route.extend(SidebarMixin, {
  model() {
    return this.store.findAll('place');
  },

  componentName: 'np-places/sidebar',

  componentParams() {
    return {
      places: this.modelFor('index.places'),
      target: this.controllerFor('index.places')
    }
  },
});
