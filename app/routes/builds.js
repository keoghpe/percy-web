import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service(),
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('currentUser', this.get('currentUser'));
  }
});
