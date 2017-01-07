import Ember from 'ember';
import ResetScrollMixin from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScrollMixin, {
  currentUser: Ember.inject.service(),
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('currentUser', this.get('currentUser'));
  },
  actions: {
    didTransition() {
      this._super.apply(this, arguments);

      // TODO: Add organization tracking
      this.analytics.track('Home Viewed');
    },
  }
});
