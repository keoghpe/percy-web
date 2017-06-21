import Ember from 'ember';
import AuthenticatedRouteMixin from '../../mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  redirect() {
    this.send('redirectToDefaultOrganization');
  },
  afterModel(model) {
    model.get('projects').reload();
  },
  actions: {
    didTransition() {
      this._super.apply(this, arguments);

      let organization = this.modelFor(this.routeName);
      this.analytics.track('Dashboard Viewed', organization);
    },
  },
});
