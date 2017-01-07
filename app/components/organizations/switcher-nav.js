import Ember from 'ember';

export default Ember.Component.extend({
  classes: null,

  isExpanded: false,

  currentUser: Ember.inject.service(),

  classNames: ['OrganizationsSwitcherNav'],
  classNameBindings: [
    'classes',
  ],

  actions: {
    toggleSwitcher() {
      this.get('currentUser.user.organizations').reload();
      this.toggleProperty('isExpanded');
    },
    hideSwitcher() {
      this.set('isExpanded', false);
    },
  }
});
