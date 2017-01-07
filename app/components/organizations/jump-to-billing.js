import Ember from 'ember';

export default Ember.Component.extend({
  classes: null,

  classNames: ['OrganizationsJumpToBilling'],
  classNameBindings: [
    'classes',
  ],

  session: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  actions: {
    chooseOrganization(organization) {
      // Send action directly up to application controller, so we don't have to delegate every
      // time in the template.
      let applicationController = Ember.getOwner(this).lookup('controller:application');
      applicationController.send('navigateToOrganizationBilling', organization);
    },
    hide() {
      this.get('hide')();
    },
  }
});
