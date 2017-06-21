import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import utils from '../lib/utils';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  fastboot: Ember.inject.service(),
  session: Ember.inject.service(),
  cookies: Ember.inject.service(),

  model() {
    var location;
    if (this.get('fastboot.isFastBoot')) {
      let host = this.get('fastboot.request.host');
      let protocol = this.get('fastboot.request.protocol');
      location = `${protocol}://${host}`;
    } else {
      location = window.location.origin;
    }

    var fastboot = this.get('fastboot');
    if (!fastboot.get('isFastBoot')) {
      var attemptedTransition = this.get('session.attemptedTransition').intent.url;
      this.get('cookies').write('ember_simple_auth-redirectTarget', attemptedTransition, {
          path: '/',
          secure: window.location.protocol === 'https:'
        });
    }
    let loginUrl = utils.buildApiUrl('login', {fastboot});
    var redirectTarget = `${loginUrl}?redirect_to=${location}/auth/success`;
    return {redirectTarget};
  },
});
