import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service(),
  currentUser: Ember.inject.service(),

  // ESA relies on `config.baseURL` which is gone in our version of Ember. Fix logout manually.
  // https://github.com/simplabs/ember-simple-auth/issues/1048
  sessionInvalidated() {
    if (!Ember.testing) {
      if (window.location) {
        window.location.replace('/');
      } else {
        this.transitionTo('/');
      }
    }
  },

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      return this._loadCurrentUser();
    }
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser();
  },

  _loadCurrentUser() {
    this.get('currentUser').load().catch(() => this.get('session').invalidate());
  },

  actions: {
    showSupport() {
      window.Intercom('show');
    },
    redirectToLogin() {
      this.transitionTo('login');
    },
    redirectToDefaultOrganization() {
      let lastOrganizationSlug;
      if (typeof localStorage !== 'undefined') {
        lastOrganizationSlug = localStorage.getItem('lastOrganizationSlug');
      }
      if (lastOrganizationSlug) {
        this.transitionTo('organization.index', lastOrganizationSlug);
      } else {
        this.get('currentUser').load().then(() => {
          this.get('currentUser.user.organizations').then((orgs) => {
            let org = orgs.get('firstObject');
            if (org) {
              this.transitionTo('organization.index', org.get('slug'));
            } else {
              // User has no organizations.
              this.transitionTo('organizations.new');
            }
          });
        });
      }
    },
    invalidateSession() {
      this.get('session').invalidate();
    },
    navigateToProject(project) {
      let organizationSlug = project.get('organization.slug');
      let projectSlug = project.get('slug');
      this.transitionTo('organization.project.index', organizationSlug, projectSlug);
    },
    navigateToBuild(build) {
      let organizationSlug = build.get('project.organization.slug');
      let projectSlug = build.get('project.slug');
      this.transitionTo('organization.project.builds.build', organizationSlug, projectSlug, build);
    },
    navigateToOrganizationBilling(organization) {
      let organizationSlug = organization.get('slug');
      this.transitionTo('organizations.organization.billing', organizationSlug);
    },
    navigateToProjectSettings(project) {
      let organizationSlug = project.get('organization.slug');
      let projectSlug = project.get('slug');
      this.transitionTo('organization.project.settings', organizationSlug, projectSlug);
    },
  },
});
