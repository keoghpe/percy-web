import ESAAuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

var AuthenticatedRouteMixin = Ember.Mixin.create(ESAAuthenticatedRouteMixin, {
  authenticationRoute: Ember.computed(function() {
    return 'github-login';
  })
});

export default AuthenticatedRouteMixin;
