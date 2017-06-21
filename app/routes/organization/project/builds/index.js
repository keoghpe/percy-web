import Ember from 'ember';
import AuthenticatedRouteMixin from '../../../mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  redirect() {
    let organizationSlug = this.modelFor('organization').get('slug');
    let projectSlug = this.modelFor('organization.project').get('slug');
    this.transitionTo('organization.project.index', organizationSlug, projectSlug);
  },
});
