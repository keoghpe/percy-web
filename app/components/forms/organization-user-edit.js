import Ember from 'ember';
import BaseFormComponent from './base';

export default BaseFormComponent.extend({
  organizationUser: null,
  classes: null,

  classNames: ['FormsOrganizationUserEdit', 'Form'],
  classNameBindings: ['classes'],

  session: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  isCurrentUser: Ember.computed('organizationUser', 'currentUser.user', function() {
    return this.get('organizationUser.user.id') === this.get('currentUser.user.id');
  }),
  deleteText: Ember.computed('isCurrentUser', function() {
    if (this.get('isCurrentUser')) {
      return 'Leave Organization';
    } else {
      return 'Remove User';
    }
  }),
  model: Ember.computed.alias('organizationUser'),
  validator: null,
});
