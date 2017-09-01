import Ember from 'ember';
import SidebarMixin from 'np-admin/mixins/sidebar-mixin';

export default Ember.Route.extend(SidebarMixin, {
  componentName: 'np-orders/sidebar'
});
