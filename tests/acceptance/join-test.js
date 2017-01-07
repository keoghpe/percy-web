import setupAcceptance, {
  setupSession, renderAdapterErrorsAsPage
} from '../helpers/setup-acceptance';

describe('Acceptance: Join', function() {
  setupAcceptance();

  setupSession(function (server) {
    server.create('organization', 'withUser', {name: 'Test org'});
    let anotherOrganization = server.create('organization', {name: 'Other org'});
    server.create('invite', {id: 'valid-code', organization: anotherOrganization});
    server.create('invite', {id: 'expired-code', isExpired: true});
  });

  it('expired rejected', function () {
    visit('/join/expired-code');
    andThen(() => {
      expect(currentPath()).to.equal('join');
    });
    return percySnapshot(this.test);
  });

  it('invalid rejected', function() {
    renderAdapterErrorsAsPage(() => {
      visit('/join/invalid-code');
      andThen(() => {
        expect(currentPath()).to.equal('error');
      });
      return percySnapshot(this.test);
    });
  });

  it('valid accepted', function() {
    visit('/join/valid-code');
    andThen(() => {
      expect(currentPath()).to.equal('join');
    });
    percySnapshot(this.test);
    click('.InvitationHandler button:contains("Accept invitation")');

    andThen(() => {
      expect(currentPath()).to.equal('organization.index');
    });
    percySnapshot(this.test.fullTitle() + ' | Into organization');
  });
});
