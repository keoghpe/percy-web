import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service(),
  intercom: Ember.inject.service(),

  afterModel(model) {
    this.get('intercom').associateWithCompany(this.get('currentUser.user'), model);

    // Proactively load the currentUserMembership object and return to block rendering until it
    // exists, since we use it to determine what parts of the organization settings the current
    // user has permission to access. Loading it now prevents flickering.
    //
    // Note: we have to use the underlying _filteredOrganizationUsers because it is a promise,
    // whereas currentUserMembership is just an alias to .firstObject.
    return model.get('_filteredOrganizationUsers');
  },
  actions: {
  },
});
