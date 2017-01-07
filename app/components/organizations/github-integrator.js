import Ember from 'ember';
import config from 'percy-web/config/environment';
import {task, timeout} from 'ember-concurrency';

const POLLING_INTERVAL_SECONDS = 3;
const MAX_UPDATE_POLLING_REQUESTS = 2000;

export default Ember.Component.extend({
  organization: null,
  classes: null,

  store: Ember.inject.service(),

  waitingForInstallation: false,
  currentIntegration: Ember.computed.alias('organization.githubIntegration'),
  githubIntegrationUrl: config.APP.githubUrls.integration,

  runningTask: null,
  startPollingForUpdates: function() {
    this.set('runningTask', this.get('pollForUpdatesTask').perform());
  },
  pollForUpdatesTask: task(function * () {
    this.set('numPollRequests', 0);
    while (this.get('numPollRequests') < MAX_UPDATE_POLLING_REQUESTS) {
      this.incrementProperty('numPollRequests');
      this.get('organization').reload().then((organization) => {
        let githubIntegration = organization.get('githubIntegration');
        let githubIntegrationRequest = organization.get('githubIntegrationRequest');

        // If the has been fully installed or uninstalled, stop polling for updates.
        if (githubIntegration || (!githubIntegration && !githubIntegrationRequest)) {
          this.get('runningTask').cancel();
        }
      });
      yield timeout(POLLING_INTERVAL_SECONDS * 1000);
    }
  }).drop(),
  maybeStartPollingOnLoad: Ember.on('init', function() {
    // The user refreshed the page, and there is still a pending request, so start polling.
    if (this.get('organization.githubIntegrationRequest')) {
      this.startPollingForUpdates();
    }
  }),

  classNames: ['OrganizationsGithubIntegrator'],
  classNameBindings: [
    'classes',
  ],
  actions: {
    cancelIntegrationRequest() {
      let integrationRequest = this.get('organization.githubIntegrationRequest');
      integrationRequest.set('_orgForAdapter', this.get('organization'));
      integrationRequest.destroyRecord();
      this.get('runningTask').cancel();
    },
    triggerWaitingForInstallation() {
      // Open popup. :|
      let width = 1100;
      let height = 900;
      let left = (screen.width / 2) - (width / 2);
      let top = (screen.height / 2) - (height / 2);
      let url = this.get('githubIntegrationUrl');
      window.open(
        url,
        '_blank',
        'toolbar=yes, location=yes, directories=no, status=no, menubar=no, scrollbars=yes, ' +
        'resizable=yes, copyhistory=yes, ' +
        'width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
      );

      let organization = this.get('organization');
      let githubIntegrationRequest = this.get('store').createRecord('github-integration-request', {
        _orgForAdapter: organization,
      });
      githubIntegrationRequest.save().then(() => {
        organization.reload();
        this.startPollingForUpdates();
      });

      this.set('waitingForInstallation', true);
    },
    showSupport() {
      this.sendAction('showSupport');
    }
  }
});
