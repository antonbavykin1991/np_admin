import Ember from 'ember';
import SidebarRouterMixin from 'np-admin/mixins/sidebar-router';
import { module, test } from 'qunit';

module('Unit | Mixin | sidebar router');

// Replace this with your real tests.
test('it works', function(assert) {
  let SidebarRouterObject = Ember.Object.extend(SidebarRouterMixin);
  let subject = SidebarRouterObject.create();
  assert.ok(subject);
});
