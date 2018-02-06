import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';

describe('Acceptance: GitHub App Setup', function() {
  setupAcceptance();
  let githubInstallationId;

  setupSession(function(server) {
    this.organization = server.create('organization', 'withUser', 'withGithubIntegration', {
      name: 'test org',
    });
    githubInstallationId = this.organization.versionControlIntegrations.models[0]
      .githubInstallationId;
    expect(githubInstallationId).to.be.ok; // eslint-disable-line no-unused-expressions
  });

  it('shows GitHub integration processing page', function() {
    visit('/setup/github-app?installation_id=123');
    andThen(() => {
      expect(currentPath()).to.equal('setup.github-app');
    });
    percySnapshot(this.test);
  });

  it('redirects to organization page when the installation_id is present', function() {
    visit(`/setup/github-app?installation_id=${githubInstallationId}`);
    andThen(() => {
      expect(currentPath()).to.equal('organization.index');
    });
  });

  context('with a project', function() {
    setupSession(function(server) {
      server.create('project', {organization: this.organization});
    });
    it('redirects to settings when the installation_id and project present', function() {
      visit(`/setup/github-app?installation_id=${githubInstallationId}`);
      andThen(() => {
        expect(currentPath()).to.equal('organizations.organization.settings');
      });
    });
  });
});
