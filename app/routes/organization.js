import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service(),
  intercom: Ember.inject.service(),

  afterModel(model) {
    try {
      localStorage.setItem('lastOrganizationSlug', model.get('slug'));
    } catch (_) {
      // Safari throws errors while accessing localStorage in private mode.
    }

    this.get('intercom').associateWithCompany(this.get('currentUser.user'), model);
  },
});
