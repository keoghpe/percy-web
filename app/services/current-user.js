import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  analytics: Ember.inject.service(),

  user: null,

  load() {
    if (this.get('session.isAuthenticated')) {
      return this.get('store').queryRecord('user', {}).then((user) => {
        this.get('analytics').identifyUser(user);
        this.set('user', user);
      });
    } else {
      return Ember.RSVP.resolve();
    }
  }
});
