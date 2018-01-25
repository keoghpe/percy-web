import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';
import UserSettingsPageObject from '../pages/user-settings-page';

describe('Acceptance: User Settings', function() {
  setupAcceptance();

  setupSession(function(server) {
    const user = server.create('user', {name: 'Tyrion Lannister', email: 'tyrion@lannisters.net'});
    server.create('identity', 'githubIdentity', {user});
  });

  it('displays profile info page', function() {
    UserSettingsPageObject.visitUserSettingsPage();

    percySnapshot(this.test.fullTitle() + ' before submitting');

    UserSettingsPageObject.profileForm
      .fillInName('Tyrion Targaryen')
      .fillInEmail('tyrion@motherofdragons.biz')
      .submitForm();
    percySnapshot(this.test.fullTitle() + ' after submitting');
  });
});
