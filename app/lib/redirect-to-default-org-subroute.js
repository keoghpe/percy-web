import localStorageProxy from 'percy-web/lib/localstorage';
import Mixin from '@ember/object/mixin';

const NESTED_ORG_ROUTES = ['settings', 'setup', 'projects', 'users', 'billing'];
export default Mixin.create({
  redirectToDefaultOrgSubroute({route = 'index'} = {}) {
    let orgRouteBase = 'organization';

    if (NESTED_ORG_ROUTES.includes(route)) {
      orgRouteBase = `organizations.organization.${route}`;
    }

    let lastOrganizationSlug = localStorageProxy.get('lastOrganizationSlug');

    if (lastOrganizationSlug) {
      this.transitionTo(orgRouteBase, lastOrganizationSlug);
    } else {
      this.get('session.currentUser.organizations').then(orgs => {
        let org = orgs.get('firstObject');
        if (org) {
          this.transitionTo(orgRouteBase, org.get('slug'));
        } else {
          // User has no organizations.
          this.transitionTo('organizations.new');
        }
      });
    }
  },
});
