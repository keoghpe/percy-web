import Ember from 'ember';
import utils from '../lib/utils';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

// TODO: fix broken login route when user is already logged in.

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  session: Ember.inject.service(),
  fastboot: Ember.inject.service(),

  afterModel() {
    // Right now location.href is the URL before the transition to the login route has completed.
    // Make sure to pass redirectTo into the authenticator so that we come back to that URL.
    let options = {};
    if (window && window.location && !window.location.href.endsWith('/login')) {
      options['redirectTo'] = window.location.href;
    } else {
      options['redirectTo'] = '/';
    }

    return this.get('session').authenticate('authenticator:custom', options).then(
      function() {
        var finalRedirect = utils.getQueryParam('redirect_to');
        if (finalRedirect) {
          window.location.href = decodeURIComponent(finalRedirect);
        }
      }
    );
  },
});
