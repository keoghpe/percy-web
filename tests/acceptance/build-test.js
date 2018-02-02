import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';
import freezeMoment from '../helpers/freeze-moment';
import moment from 'moment';
import sinon from 'sinon';
import BuildPageObject from 'percy-web/tests/pages/build-page';

// TODO convert this file to use page objects
describe('Acceptance: Pending Build', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();

  setupSession(function(server) {
    let organization = server.create('organization', 'withUser');
    let project = server.create('project', {name: 'pending build', organization});
    let build = server.create('build', {
      project,
      createdAt: moment().subtract(2, 'minutes'),
      state: 'pending',
    });
    this.project = project;
    this.build = build;
  });

  it('shows as pending', function() {
    visit(`/${this.project.fullSlug}`);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the project page');

    click('[data-test-build-state]');
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the build page');

    click('#BuildInfo');

    percySnapshot(this.test.fullTitle() + ' on the build page with build info open');
  });
});

describe('Acceptance: Processing Build', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();

  setupSession(function(server) {
    let organization = server.create('organization', 'withUser');
    let project = server.create('project', {name: 'project-with-processing-build', organization});
    let build = server.create('build', {
      project,
      createdAt: moment().subtract(2, 'minutes'),
      state: 'processing',
    });
    this.project = project;
    this.build = build;
  });

  it('shows as processing', function() {
    visit(`/${this.project.fullSlug}`);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the project page');

    click('[data-test-build-state]');
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the build page');

    click('#BuildInfo');

    percySnapshot(this.test.fullTitle() + ' on the build page with build info open');
  });
});

describe('Acceptance: Failed Build', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();

  setupSession(function(server) {
    let organization = server.create('organization', 'withUser');
    let project = server.create('project', {name: 'project-with-failed-build', organization});
    let build = server.create('build', {
      project,
      createdAt: moment().subtract(2, 'minutes'),
      state: 'failed',
      failureReason: 'render_timeout',
    });
    this.project = project;
    this.build = build;
  });

  it('shows as failed', function() {
    visit(`/${this.project.fullSlug}`);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the project page');

    click('[data-test-build-state]');
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the build page');

    click('#BuildInfo');

    percySnapshot(this.test.fullTitle() + ' on the build page with build info open');

    window.Intercom = sinon.stub();

    click('[data-test-build-overview-show-support]');
    andThen(() => {
      expect(window.Intercom).to.have.been.calledWith('show');
    });
  });
});

describe('Acceptance: Build', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();

  // TODO do these need to be globally scoped?
  let project;
  let defaultSnapshot;
  let noDiffsSnapshot;
  let twoWidthsSnapshot;
  let urlParams;

  setupSession(function(server) {
    const organization = server.create('organization', 'withUser');
    project = server.create('project', {name: 'project-with-finished-build', organization});
    const build = server.create('build', {
      project,
      createdAt: moment().subtract(2, 'minutes'),
      finishedAt: moment().subtract(5, 'seconds'),
    });

    defaultSnapshot = server.create('snapshot', 'withComparison', {build});
    noDiffsSnapshot = server.create('snapshot', 'noDiffs', {
      build,
      name: 'No Diffs snapshot',
    });
    twoWidthsSnapshot = server.create('snapshot', 'withComparison', 'withMobile', {
      build,
      name: 'Two widths snapshot',
    });
    // not used yet, but assign to variable when it's important
    server.create('snapshot', 'withMobile', {
      build,
      name: 'Mobile only snapshot',
    });

    urlParams = {
      orgSlug: organization.slug,
      projectSlug: project.slug,
      buildId: build.id,
    };
  });

  // TODO move this out of this test
  it.skip('shows as finished', function() {
    visit(`/${this.project.fullSlug}`);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the project page');

    click('[data-test-build-state]');
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the build page');

    click('#BuildInfo');

    percySnapshot(this.test.fullTitle() + ' on the build page with build info open');
  });

  // TODO: test number of snapshots, expanded, actionable status for all

  it('toggles the image and pdiff', function() {
    let snapshot;
    BuildPageObject.visitBuild(urlParams);

    andThen(() => {
      snapshot = BuildPageObject.findSnapshotByName(defaultSnapshot.name);
      expect(currentPath()).to.equal('organization.project.builds.build.index');
      expect(BuildPageObject.snapshots(0).isDiffImageVisible).to.equal(true);

      snapshot.clickDiffImage();
    });

    andThen(() => {
      expect(snapshot.isDiffImageVisible).to.equal(false);
    });

    percySnapshot(this.test.fullTitle() + ' | hides overlay');

    andThen(() => {
      snapshot.clickDiffImageBox();
    });

    andThen(() => {
      expect(snapshot.isDiffImageVisible).to.equal(true);
    });

    percySnapshot(this.test.fullTitle() + ' | shows overlay');
  });

  //TODO do this one
  it('walk across snapshots with arrow keys', function() {
    let firstSnapshot;
    let secondSnapshot;
    let thirdSnapshot;
    const urlBase = `/${project.fullSlug}/builds/1`;

    BuildPageObject.visitBuild(urlParams);

    andThen(() => {
      firstSnapshot = BuildPageObject.snapshots(0);
      secondSnapshot = BuildPageObject.snapshots(1);
      thirdSnapshot = BuildPageObject.snapshots(2);

      expect(currentPath()).to.equal('organization.project.builds.build.index');
      expect(currentURL()).to.equal(urlBase);
    });

    BuildPageObject.typeDownArrow();
    percySnapshot(this.test.fullTitle() + ' | Down');

    andThen(() => {
      expect(BuildPageObject.focusedSnapshot().name).to.equal(defaultSnapshot.name);
      expect(currentURL()).to.equal(`${urlBase}?snapshot=${defaultSnapshot.id}`);
      expect(firstSnapshot.isFocused).to.equal(true);
      expect(secondSnapshot.isFocused).to.equal(false);
      expect(thirdSnapshot.isFocused).to.equal(false);
    });

    BuildPageObject.typeDownArrow();
    percySnapshot(this.test.fullTitle() + ' | Down > Down');

    andThen(() => {
      expect(BuildPageObject.focusedSnapshot().name).to.equal(twoWidthsSnapshot.name);
      expect(currentURL()).to.equal(`${urlBase}?snapshot=${twoWidthsSnapshot.id}`);
      expect(firstSnapshot.isFocused).to.equal(false);
      expect(secondSnapshot.isFocused).to.equal(true);
      expect(thirdSnapshot.isFocused).to.equal(false);
    });

    BuildPageObject.typeUpArrow();
    percySnapshot(this.test.fullTitle() + ' | Down > Down > Up');

    andThen(() => {
      expect(BuildPageObject.focusedSnapshot().name).to.equal(defaultSnapshot.name);
      expect(currentURL()).to.equal(`${urlBase}?snapshot=${defaultSnapshot.id}`);
      expect(firstSnapshot.isFocused).to.equal(true);
      expect(secondSnapshot.isFocused).to.equal(false);
      expect(thirdSnapshot.isFocused).to.equal(false);
    });
  });

  it('adds query param when clicking on snapshot header', function() {
    let snapshot;
    BuildPageObject.visitBuild(urlParams);
    andThen(() => {
      snapshot = BuildPageObject.findSnapshotByName(defaultSnapshot.name);
      snapshot.header.click();
    });

    andThen(() => {
      expect(currentURL()).to.equal(
        BuildPageObject.urlWithSnapshotQueryParam(defaultSnapshot, defaultSnapshot.build),
      );
    });
  });

  it('jumps to snapshot for query params', function() {
    BuildPageObject.visitBuild(Object.assign(urlParams, {snapshot: defaultSnapshot.id}));

    andThen(() => {
      const focusedSnapshot = BuildPageObject.focusedSnapshot();

      expect(currentPath()).to.equal('organization.project.builds.build.index');
      expect(focusedSnapshot.isFocused).to.equal(true);
      expect(focusedSnapshot.name).to.equal(defaultSnapshot.name);
    });

    percySnapshot(this.test.fullTitle());
  });

  it('jumps to snapshot for query params when snapshot has no diffs ', function() {
    BuildPageObject.visitBuild(Object.assign(urlParams, {snapshot: noDiffsSnapshot.id}));
    andThen(() => {
      const focusedSnapshot = BuildPageObject.focusedSnapshot();

      expect(focusedSnapshot.name).to.equal(noDiffsSnapshot.name);
      expect(focusedSnapshot.isExpanded).to.equal(true);
    });
  });

  it('shows and hides unchanged diffs', function() {
    const snapshotName = noDiffsSnapshot.name;

    BuildPageObject.visitBuild(urlParams);

    andThen(() => {
      expect(BuildPageObject.isNoDiffsPanelVisible).to.equal(true);
      expect(BuildPageObject.findSnapshotByName(snapshotName)).to.not.exist;
    });

    percySnapshot(this.test.fullTitle() + ' | shows batched no diffs');

    BuildPageObject.clickToggleNoDiffsSection();
    andThen(() => {
      const snapshot = BuildPageObject.findSnapshotByName(snapshotName);

      expect(BuildPageObject.isNoDiffsPanelVisible).to.equal(false);
      expect(snapshot.isExpanded, 'three').to.equal(true);
      expect(snapshot.isNoDiffBoxVisible).to.equal(true);
    });

    percySnapshot(this.test.fullTitle() + ' | shows expanded no diffs');
  });

  // TODO full view
  it.skip('toggles full view', function() {
    // visit(`/${this.project.fullSlug}/builds/${this.build.id}`);
    click('.SnapshotViewer:first .ToggleFullViewButton');
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.snapshot');
      expect(find('.SnapshotViewerFullModalWrapper ').length).to.equal(1);
    });

    click('.ToggleFullViewButton');
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
      expect(find('.SnapshotViewerFullModalWrapper ').length).to.equal(0);
    });
  });

  // TODO full view
  it.skip('responds to keystrokes and click in full view', function() {
    let snapshot = this.comparisons.different.headSnapshot;
    visit(`/${this.project.fullSlug}/builds/${this.build.id}/view/${snapshot.id}/1280?mode=diff`);

    keyEvent('.SnapshotViewerFull', 'keydown', 39);
    andThen(() => {
      expect(currentURL()).to.include('mode=head');
    });

    keyEvent('.SnapshotViewerFull', 'keydown', 37);
    andThen(() => {
      expect(currentURL()).to.include('mode=diff');
    });

    click('.ComparisonViewerFull');
    andThen(() => {
      expect(currentURL()).to.include('mode=head');
    });

    keyEvent('.SnapshotViewerFull', 'keydown', 27);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
      expect(find('.SnapshotViewerFullModalWrapper ').length).to.equal(0);
    });
  });

  // TODO full view
  it.skip('hides comparison mode controls in full view if no snapshot taken', function() {
    let snapshot = this.comparisons.differentNoMobile.headSnapshot;
    visit(`/${this.project.fullSlug}/builds/${this.build.id}/view/${snapshot.id}/320?mode=diff`);
    andThen(() => {
      expect(find('[data-test-comparison-mode-switcher]').css('visibility')).to.equal('hidden');
    });
  });

  // TODO full view
  it.skip('shows "New" comparison mode controls in full view if snapshot is new', function() {
    let snapshot = this.comparisons.wasAdded.headSnapshot;

    visit(`/${this.project.fullSlug}/builds/${this.build.id}/view/${snapshot.id}/1280?mode=diff`);
    andThen(() => {
      expect(find('[data-test-comparison-mode-switcher] button').length).to.equal(1);
      expect(find('[data-test-comparison-mode-switcher] button').text()).to.equal('New Snapshot');
    });
  });

  // FULL VIEW
  it.skip('toggles between old/diff/new comparisons when interacting with comparison mode switcher', function() { // eslint-disable-line
    let originalModeButton;
    let diffModeButton;
    let newModeButton;

    const snapshot = this.comparisons.different.headSnapshot;
    visit(`/${this.project.fullSlug}/builds/${this.build.id}/view/${snapshot.id}/1280?mode=diff`);

    andThen(() => {
      originalModeButton = find('[data-test-comparison-mode-switcher] button:contains(Original)');
      diffModeButton = find('[data-test-comparison-mode-switcher] button:contains(Diff)');
      newModeButton = find('[data-test-comparison-mode-switcher] button:contains(New)');

      click(originalModeButton);
    });

    andThen(() => {
      expect(find('[data-test-snapshotviewerfull-comparison-viewer] img').attr('src')).to.equal(
        '/images/test/bs-base.png',
      );

      click(newModeButton);
    });

    andThen(() => {
      expect(find('[data-test-snapshotviewerfull-comparison-viewer] img').attr('src')).to.equal(
        '/images/test/bs-head.png',
      );
      click(diffModeButton);
    });

    andThen(() => {
      expect(find('[data-test-snapshotviewerfull-comparison-viewer] img').attr('src')).to.equal(
        '/images/test/bs-pdiff-base-head.png',
      );
    });
  });
});
