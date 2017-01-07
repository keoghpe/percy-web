import Ember from 'ember';

export default Ember.Component.extend({
  organizationUser: null,
  classes: null,

  currentUser: Ember.inject.service(),

  isExpanded: false,
  classNames: ['OrganizationsUserCard'],
  classNameBindings: [
    'classes',
    'isExpanded:OrganizationsUserCard--expanded',
  ],
  actions: {
    toggleExpanded() {
      this.toggleProperty('isExpanded');
    },
  }
});
