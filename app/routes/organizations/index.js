import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {alias} from '@ember/object/computed';
import {inject as service} from '@ember/service';
import RedirectToDefaultOrgSubRoute from 'percy-web/lib/redirect-to-default-org-subroute';

export default Route.extend(AuthenticatedRouteMixin, RedirectToDefaultOrgSubRoute, {
  session: service(),
  currentUser: alias('session.currentUser'),

  redirect() {
    this.redirectToDefaultOrgSubroute();
  },
});
