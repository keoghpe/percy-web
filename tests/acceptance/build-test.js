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
  let organization;
  let project;
  let build;
  let defaultSnapshot;
  let noDiffsSnapshot;
  let urlParams;

  setupSession(function(server) {
    organization = server.create('organization', 'withUser');
    project = server.create('project', {name: 'project-with-finished-build', organization});
    build = server.create('build', {
      project,
      createdAt: moment().subtract(2, 'minutes'),
      finishedAt: moment().subtract(5, 'seconds'),
    });

    defaultSnapshot = server.create('snapshot', 'withComparison', {build});
    noDiffsSnapshot = server.create('snapshot', 'noDiffs', {build});

    urlParams = {
      orgSlug: organization.slug,
      projectSlug: project.slug,
      buildId: build.id,
    };
    // this.comparisons = {
    //   different: server.create('comparison', {headBuild}),
    //   gotLonger: server.create('comparison', 'gotLonger', {headBuild}),
    //   gotShorter: server.create('comparison', 'gotShorter', {headBuild}),
    //   wasAdded: server.create('comparison', 'wasAdded', {headBuild}),
    //   wasRemoved: server.create('comparison', 'wasRemoved', {headBuild}),
    //   same: server.create('comparison', 'same', {headBuild}),
    //   differentNoMobile: server.create('comparison', {headBuild}),
    // };

    // // Create some mobile width comparisons
    // let headSnapshot = this.comparisons.different.headSnapshot;
    // server.create('comparison', 'mobile', {headBuild, headSnapshot});
    // headSnapshot = this.comparisons.wasAdded.headSnapshot;
    // server.create('comparison', 'mobile', 'wasAdded', {headBuild, headSnapshot});

    // BuildPageObject.visitBuild({
    //   orgSlug: organization.slug,
    //   projectSlug: project.slug,
    //   buildId: build.id,
    // });
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
  it.skip('walk across snapshots with arrow keys', function() {
    const DownArrowKey = 40;
    const UpArrowKey = 38;
    visit(`/${this.project.fullSlug}/builds/${this.build.id}`);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
      expect(currentURL()).to.equal(`/${this.project.fullSlug}/builds/1`);
    });

    keyEvent('.SnapshotList', 'keydown', DownArrowKey);
    andThen(() => {
      expect(currentURL()).to.equal(`/${this.project.fullSlug}/builds/1?snapshot=snapshot-3`);
    });
    percySnapshot(this.test.fullTitle() + ' | Right');

    keyEvent('.SnapshotList', 'keydown', DownArrowKey);
    andThen(() => {
      expect(currentURL()).to.equal(`/${this.project.fullSlug}/builds/1?snapshot=snapshot-1`);
    });
    percySnapshot(this.test.fullTitle() + ' | Right*2');

    keyEvent('.SnapshotList', 'keydown', UpArrowKey);
    andThen(() => {
      expect(currentURL()).to.equal(`/${this.project.fullSlug}/builds/1?snapshot=snapshot-3`);
    });
    percySnapshot(this.test.fullTitle() + ' | Right*2 + Left');
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
        BuildPageObject.urlWithSnapshotQueryParam(defaultSnapshot, build),
      );
    });
  });

  // TODO: add extra snapshot that should _not_ be focused
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

  it('jumps to snapshot for query params in collapsed no diffs', function() {
    // let snapshot = this.comparisons.same.headSnapshot;
    BuildPageObject.visitBuild(Object.assign(urlParams, {snapshot: noDiffsSnapshot.id}));
    andThen(() => {
      // debugger
      const focusedSnapshot = BuildPageObject.focusedSnapshot();
      expect(focusedSnapshot.name).to.equal(noDiffsSnapshot.name);
    });
    // visit(`/${this.project.fullSlug}/builds/${this.build.id}?snapshot=${snapshot.id}`);
    // andThen(() => {
    //   expect(find(
    //    '.SnapshotViewer.SnapshotViewer--focus .SnapshotViewer-title').text()).to.equal(
    //     snapshot.name,
    //   );
    // });
  });

  it('shows and hides unchanged diffs', function() {
    visit(`/${this.project.fullSlug}/builds/${this.build.id}`);

    percySnapshot(this.test.fullTitle() + ' | shows batched no diffs');

    click('[data-test-hide-no-diffs]');
    andThen(() => {
      expect(find('.ComparisonViewer-noDiffBox')).to.have.lengthOf(1);
    });

    percySnapshot(this.test.fullTitle() + ' | shows expanded no diffs');
  });

  it('toggles full view', function() {
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

  it('responds to keystrokes and click in full view', function() {
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

  it('hides comparison mode controls in full view if no snapshot taken', function() {
    let snapshot = this.comparisons.differentNoMobile.headSnapshot;
    visit(`/${this.project.fullSlug}/builds/${this.build.id}/view/${snapshot.id}/320?mode=diff`);
    andThen(() => {
      expect(find('[data-test-comparison-mode-switcher]').css('visibility')).to.equal('hidden');
    });
  });

  it('shows "New" comparison mode controls in full view if snapshot is new', function() {
    let snapshot = this.comparisons.wasAdded.headSnapshot;

    visit(`/${this.project.fullSlug}/builds/${this.build.id}/view/${snapshot.id}/1280?mode=diff`);
    andThen(() => {
      expect(find('[data-test-comparison-mode-switcher] button').length).to.equal(1);
      expect(find('[data-test-comparison-mode-switcher] button').text()).to.equal('New Snapshot');
    });
  });

  it('toggles between old/diff/new comparisons when interacting with comparison mode switcher', function() { // eslint-disable-line
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
