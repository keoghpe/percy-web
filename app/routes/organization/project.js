import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import localStorageProxy from 'percy-web/lib/localstorage';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    let organizationSlug = this.modelFor('organization').get('slug');

    return this.store.findRecord('project', `${organizationSlug}/${params.project_id}`);
  },
  afterModel(model) {
    let recentProjects = localStorageProxy.get('recentProjectSlugs') || {};
    recentProjects[model.get('organization.slug')] = model.get('slug');
    localStorageProxy.set('recentProjectSlugs', recentProjects);
  },
});
