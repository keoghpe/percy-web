import Component from '@ember/component';
import PollingMixin from 'percy-web/mixins/polling';
import {inject as service} from '@ember/service';

export function areInstallationIdsEqual(installationId, otherInstallationId) {
  return installationId == otherInstallationId;
}
export default Component.extend(PollingMixin, {
  installationId: null,
  afterAppInstalled: null,
  session: service(),

  shouldPollForUpdates: true,
  POLLING_INTERVAL_SECONDS: 1,
  MAX_UPDATE_POLLING_REQUESTS: 600,
  pollRefresh() {
    this.get('session.currentUser.organizations')
      .reload()
      .then(orgs => {
        // Attempt to get the organization that matches the installationId
        // This may fail if we haven't received the webhook yet, or a fake param is used
        let installationId = this.get('installationId');
        let organization = orgs.find(org => {
          return areInstallationIdsEqual(
            org.get('githubIntegration.githubInstallationId'),
            installationId,
          );
        });

        if (organization) {
          this.get('afterAppInstalled')(organization);
        }
      });
  },
});
