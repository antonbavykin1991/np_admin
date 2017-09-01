import Ember from 'ember';

const {$} = Ember;

export default Ember.Component.extend({
  visitorSession: Ember.inject.service(),
  sidebar: Ember.inject.service(),

  tagName: 'aside',
  elementId: 'sidebar',
  classNames: ['sidebar', 'c-overflow'],

  yieldClassName:  Ember.computed('sidebar.hasYieldClassName', function () {
    return this.get('sidebar.hasYieldClassName') ? 'sidebar-container--has-yield' : '';
  }),

  fullName: Ember.computed.reads('visitorSession.model.fullName'),

  didInsertElement() {
    $('body').on('click', '[data-ma-action]', function (e) {
      e.preventDefault();


      var $this = $(this);
      var action = $(this).data('ma-action');

      switch (action) {
        case 'sidebar-open':
          var target = $this.data('ma-target');
          var backdrop = '<div data-ma-action="sidebar-close" class="ma-backdrop" />';

          $('body').addClass('sidebar-toggled');
          $('#header, #header-alt, #main').append(backdrop);
          $this.addClass('toggled');
          $(target).addClass('toggled');

          break;

        case 'sidebar-close':
          $('body').removeClass('sidebar-toggled');
          $('.ma-backdrop').remove();
          $('.sidebar, .ma-trigger').removeClass('toggled')

          break;
      }
    });
  }
});
