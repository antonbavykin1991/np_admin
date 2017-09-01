import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('auth', {path : 'auth'});

  this.route('index', {'path': '/'}, function() {
    this.route('products');
    this.route('categories');
    this.route('places', function() {
      this.route('order', {path: '/:place_id'}, function() {
        this.route('print');
      });
    });
    this.route('orders', function() {
      this.route('expenses');
      this.route('profit');
    });
  });
});

export default Router;
