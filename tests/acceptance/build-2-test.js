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

describe('Acceptance: Build aaa', function() {
  let organization;
  let project;
  let build;
  let defaultSnapshot;

  freezeMoment('2018-05-22');
  setupAcceptance();

  setupSession(function(server) {
    organization = server.create('organization', 'withUser');
    project = server.create('project', {name: 'project-with-finished-build', organization});
    build = server.create('build', {
      project,
      createdAt: moment().subtract(2, 'minutes'),
      finishedAt: moment().subtract(5, 'seconds'),
    });
    defaultSnapshot = server.create('snapshot', 'withComparison');
    const comparisons = defaultSnapshot.comparisons;
    build.update({comparisons: comparisons});
  });

  it.only('shows as finished on project page', function() {
    BuildPageObject.visitProject({
      orgSlug: organization.slug,
      projectSlug: project.slug,
    });

    andThen(() => {
      expect(currentPath()).to.equal('organization.project.index');
    });

    percySnapshot(this.test.fullTitle() + ' on the project page');

    click('[data-test-build-state]');
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the build page');

    click('[data-test-buildInfoDropdown-button]');

    percySnapshot(this.test.fullTitle() + ' on the build page with build info open');
  });

  it('toggles the image and pdiff', function() {
    debugger
    BuildPageObject.visitBuild({
      orgSlug: organization.slug,
      projectSlug: project.slug,
      buildId: build.id,
    });

    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });



    // let comparison = defaultSnapshot.comparisons[0];
    // let comparisonSelector = `.SnapshotViewer:has([title="${comparison.headSnapshot.name}"])`;
    andThen(() => {
      build
      const x = BuildPageObject.findSnapshotByName(defaultSnapshot.name);
      debugger;
      // expect(find(`${comparisonSelectotr} .pdiffImageOverlay img`).length).to.equal(1);
    });
    // click(`${comparisonSelector} .pdiffImageOverlay img`);
    // andThen(() => {
    //   expect(find(`${comparisonSelector} .pdiffImageOverlay img`).length).to.equal(0);
    // });
    // percySnapshot(this.test.fullTitle() + ' | hides overlay');
    // // TODO somehow click is not happening with regular click, had to trigger('click')
    // //click(`${comparisonSelector} .SnapshotViewer-pdiffImageBox img`);
    // andThen(() => {
    //   find(`${comparisonSelector} .Viewer-pdiffImageBox img`).trigger('click');
    // });
    // andThen(() => {
    //   expect(find(`${comparisonSelector} .pdiffImageOverlay img`).length).to.equal(1);
    // });
    // percySnapshot(this.test.fullTitle() + ' | shows overlay');
  });

  // NOTE: the query parameters this test is expecting in the urls
  // are in an arbitrary order based on the order in which the snapshots were created.
  // After the snapshots are created, they are sorted in `snapshot-list`
  // so are no longer in number order.
  // TODO: make query param ids in this test deterministic.
  it('walk across snapshots with arrow keys', function() {
    // const DownArrowKey = 40;
    // const UpArrowKey = 38;
    // visit(`/${this.project.fullSlug}/builds/${this.build.id}`);
    // andThen(() => {
    //   expect(currentPath()).to.equal('organization.project.builds.build.index');
    //   expect(currentURL()).to.equal(`/${this.project.fullSlug}/builds/1`);
    // });
    // keyEvent('.SnapshotList', 'keydown', DownArrowKey);
    // andThen(() => {
    //   expect(currentURL()).to.equal(`/${this.project.fullSlug}/builds/1?snapshot=snapshot-3`);
    // });
    // percySnapshot(this.test.fullTitle() + ' | Down');
    // keyEvent('.SnapshotList', 'keydown', DownArrowKey);
    // andThen(() => {
    //   expect(currentURL()).to.equal(`/${this.project.fullSlug}/builds/1?snapshot=snapshot-1`);
    // });
    // percySnapshot(this.test.fullTitle() + ' | Down*2');
    // keyEvent('.SnapshotList', 'keydown', UpArrowKey);
    // andThen(() => {
    //   expect(currentURL()).to.equal(`/${this.project.fullSlug}/builds/1?snapshot=snapshot-3`);
    // });
    // percySnapshot(this.test.fullTitle() + ' | Up*2 + Down');
  });

  it('adds query param when clicking on snapshot header', function() {
    // let snapshot = this.comparisons.wasAdded.headSnapshot;
    // visit(`/${this.project.fullSlug}/builds/${this.build.id}`);
    // click('[data-test-SnapshotViewer-header]:eq(0)');
    // andThen(() => {
    //   expect(currentURL()).to.equal(
    //     `/${this.project.fullSlug}/builds/${this.build.id}?snapshot=${snapshot.id}`,
    //   );
    // });
  });

  it('jumps to snapshot for query params', function() {
    // let snapshot = this.comparisons.wasAdded.headSnapshot;
    // visit(`/${this.project.fullSlug}/builds/${this.build.id}?snapshot=${snapshot.id}`);
    // andThen(() => {
    //   expect(currentPath()).to.equal('organization.project.builds.build.index');
    //   expect(find('.SnapshotViewer.SnapshotViewer--focus .SnapshotViewer-title').text()).to.equal(
    //     snapshot.name,
    //   );
    // });
    // percySnapshot(this.test.fullTitle());
  });

  it('jumps to snapshot for query params in collapsed no diffs', function() {
    // let snapshot = this.comparisons.same.headSnapshot;
    // visit(`/${this.project.fullSlug}/builds/${this.build.id}?snapshot=${snapshot.id}`);
    // andThen(() => {
    //   expect(find('.SnapshotViewer.SnapshotViewer--focus .SnapshotViewer-title').text()).to.equal(
    //     snapshot.name,
    //   );
    // });
  });

  it('shows and hides unchanged diffs', function() {
    // visit(`/${this.project.fullSlug}/builds/${this.build.id}`);
    // percySnapshot(this.test.fullTitle() + ' | shows batched no diffs');
    // click('.HideNoDiffsPanel');
    // andThen(() => {
    //   expect(find('.ComparisonViewer-noDiffBox')).to.have.lengthOf(1);
    // });
    // percySnapshot(this.test.fullTitle() + ' | shows expanded no diffs');
  });

  it('toggles full view', function() {
    // visit(`/${this.project.fullSlug}/builds/${this.build.id}`);
    // click('.SnapshotViewer:first .ToggleFullViewButton');
    // andThen(() => {
    //   expect(currentPath()).to.equal('organization.project.builds.build.snapshot');
    //   expect(find('.SnapshotViewerFullModalWrapper ').length).to.equal(1);
    // });
    // click('.ToggleFullViewButton');
    // andThen(() => {
    //   expect(currentPath()).to.equal('organization.project.builds.build.index');
    //   expect(find('.SnapshotViewerFullModalWrapper ').length).to.equal(0);
    // });
  });

  it('responds to keystrokes and click in full view', function() {
    // let snapshot = this.comparisons.different.headSnapshot;
    // visit(`/${this.project.fullSlug}/builds/${this.build.id}/view/${snapshot.id}/1280?mode=diff`);
    // keyEvent('.SnapshotViewerFull', 'keydown', 39);
    // andThen(() => {
    //   expect(currentURL()).to.include('mode=head');
    // });
    // keyEvent('.SnapshotViewerFull', 'keydown', 37);
    // andThen(() => {
    //   expect(currentURL()).to.include('mode=diff');
    // });
    // click('.ComparisonViewerFull');
    // andThen(() => {
    //   expect(currentURL()).to.include('mode=head');
    // });
    // keyEvent('.SnapshotViewerFull', 'keydown', 27);
    // andThen(() => {
    //   expect(currentPath()).to.equal('organization.project.builds.build.index');
    //   expect(find('.SnapshotViewerFullModalWrapper ').length).to.equal(0);
    // });
  });

  it('hides comparison mode controls in full view if no snapshot taken', function() {
    // let snapshot = this.comparisons.differentNoMobile.headSnapshot;
    // visit(`/${this.project.fullSlug}/builds/${this.build.id}/view/${snapshot.id}/320?mode=diff`);
    // andThen(() => {
    //   expect(find('[data-test-comparison-mode-switcher]').css('visibility')).to.equal('hidden');
    // });
  });

  it('shows "New" comparison mode controls in full view if snapshot is new', function() {
    // let snapshot = this.comparisons.wasAdded.headSnapshot;
    // visit(`/${this.project.fullSlug}/builds/${this.build.id}/view/${snapshot.id}/1280?mode=diff`);
    // andThen(() => {
    //   expect(find('[data-test-comparison-mode-switcher] button').length).to.equal(1);
    //   expect(find('[data-test-comparison-mode-switcher] button').text()).to.equal('New Snapshot');
    // });
  });

  it('toggles between old/diff/new comparisons when interacting with comparison mode switcher', function() { // eslint-disable-line
    //   let originalModeButton;
    //   let diffModeButton;
    //   let newModeButton;
    //   const snapshot = this.comparisons.different.headSnapshot;
    //   visit(`/${this.project.fullSlug}/builds/${this.build.id}/view/${snapshot.id}/1280?mode=diff`);
    //   andThen(() => {
    //     originalModeButton = find('[data-test-comparison-mode-switcher] button:contains(Original)');
    //     diffModeButton = find('[data-test-comparison-mode-switcher] button:contains(Diff)');
    //     newModeButton = find('[data-test-comparison-mode-switcher] button:contains(New)');
    //     click(originalModeButton);
    //   });
    //   andThen(() => {
    //     expect(find('[data-test-snapshotviewerfull-comparison-viewer] img').attr('src')).to.equal(
    //       '/images/test/bs-base.png',
    //     );
    //     click(newModeButton);
    //   });
    //   andThen(() => {
    //     expect(find('[data-test-snapshotviewerfull-comparison-viewer] img').attr('src')).to.equal(
    //       '/images/test/bs-head.png',
    //     );
    //     click(diffModeButton);
    //   });
    //   andThen(() => {
    //     expect(find('[data-test-snapshotviewerfull-comparison-viewer] img').attr('src')).to.equal(
    //       '/images/test/bs-pdiff-base-head.png',
    //     );
    //   });
  });
});
