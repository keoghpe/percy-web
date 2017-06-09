import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import utils from '../lib/utils';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  model() {
    return {redirectTarget: utils.buildApiUrl('login', {})};
  }
});
