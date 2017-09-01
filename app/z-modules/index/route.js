import Ember from 'ember';
import AuthenticatedRouteMixin from 'np-admin/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sidebar: Ember.inject.service(),

  hasYieldClassName: Ember.computed.reads('sidebar.hasYieldClassName')
});
