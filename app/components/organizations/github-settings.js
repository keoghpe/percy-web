import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

export default Ember.Component.extend({
  organization: null,
  classes: null,

  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),

  changeset: Ember.computed('organization', function() {
    let validator = this.get('validator') || {};
    return new Changeset(this.get('organization'), lookupValidator(validator), validator);
  }),
  disableSave: Ember.computed(
      'changeset.githubAuthMechanism',
      'changeset.isPristine',
      'changeset.isInvalid',
      'changeset.githubBotUser',
      'organization.githubIntegration',
      function() {
    let mechanism = this.get('changeset.githubAuthMechanism');

    // Special case: disable save if on "Bot user" but no bot user assigned.
    if (mechanism === 'github-bot-user' && !this.get('changeset.githubBotUser')) {
      return true;
    }
    // Special case: disable save if on "Official GitHub Integration" is selected at all.
    if (mechanism === 'github-integration') {
      return true;
    }

    return this.get('changeset.isPristine') || this.get('changeset.isInvalid');
  }),

  isSaveSuccessful: null,
  isSaving: null,

  classNames: ['OrganizationsGithubSettings'],
  classNameBindings: [
    'classes',
  ],
  actions: {
    showSupport() {
      this.sendAction('showSupport');
    },
    changeSelection() {
      let newSelection = this.$('input[name="github-integration-setting"]:checked').val();
      this.get('changeset').rollback();

      // If selecting the same as the currently active auth mechanism, don't dirty the changeset.
      if (newSelection === this.get('organization.githubAuthMechanism')) {
        return;
      }

      this.get('changeset').set('githubAuthMechanism', newSelection);
    },
    assignBotUser() {
      let changeset = this.get('changeset');
      changeset.set('githubBotUser', this.get('currentUser.user'));
    },
    saveSelection() {
      let organization = this.get('organization');
      let currentSelection = this.get('changeset.githubAuthMechanism');
      let changeset = this.get('changeset');

      if (currentSelection !== 'github-bot-user') {
        changeset.set('githubBotUser', null);
      }

      // Some custom validations, these require state outside of the attributes themselves so
      // we don't use a standard validations object.
      let currentIntegration = organization.get('githubIntegration');
      if (currentSelection !== 'github-integration' && currentIntegration) {
        changeset.addError(
          'base',
          [
            'The official Percy GitHub Integration must be uninstalled in GitHub ' +
            'before you can switch to a different integration type.'
          ]
        );
      } else if (currentSelection === 'github-bot-user' && !changeset.get('githubBotUser')) {
        changeset.addError('base', ['GitHub bot user cannot be blank']);
      }

      changeset.validate().then(() => {
        if (changeset.get('isInvalid')) {
          return;
        }
        this.set('isSaveSuccessful', null);
        this.set('isSaving', true);
        changeset.save().then(() => {
          this.set('isSaving', false);
          this.set('isSaveSuccessful', true);
        }, () => {
          this.set('isSaving', false);
          this.set('isSaveSuccessful', false);
        });
      });
    },
  }
});
