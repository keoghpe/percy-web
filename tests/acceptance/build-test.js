import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';
import freezeMoment from '../helpers/freeze-moment';
import moment from 'moment';
import sinon from 'sinon';
import BuildPageObject from 'percy-web/tests/pages/build-page';

// TODO convert this file to use page objects
describe('Acceptance: Pending Build', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();
  let urlParams;

  setupSession(function(server) {
    let organization = server.create('organization', 'withUser');
    let project = server.create('project', {name: 'pending build', organization});
    let build = server.create('build', {
      project,
      createdAt: moment().subtract(2, 'minutes'),
      state: 'pending',
    });

    urlParams = {
      orgSlug: organization.slug,
      projectSlug: project.slug,
      buildId: build.id,
    };
  });

  it('shows as pending', function() {
    BuildPageObject.visitBuild(urlParams);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the build page');

    BuildPageObject.toggleBuildInfoDropdown();

    percySnapshot(this.test.fullTitle() + ' on the build page with build info open');
  });
});

describe('Acceptance: Processing Build', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();
  let urlParams;

  setupSession(function(server) {
    let organization = server.create('organization', 'withUser');
    let project = server.create('project', {name: 'project-with-processing-build', organization});
    let build = server.create('build', {
      project,
      createdAt: moment().subtract(2, 'minutes'),
      state: 'processing',
    });

    urlParams = {
      orgSlug: organization.slug,
      projectSlug: project.slug,
      buildId: build.id,
    };
  });

  it('shows as processing', function() {
    BuildPageObject.visitBuild(urlParams);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the build page');

    BuildPageObject.toggleBuildInfoDropdown();

    percySnapshot(this.test.fullTitle() + ' on the build page with build info open');
  });
});

describe('Acceptance: Failed Build', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();
  let urlParams;

  setupSession(function(server) {
    let organization = server.create('organization', 'withUser');
    let project = server.create('project', {name: 'project-with-failed-build', organization});
    let build = server.create('build', {
      project,
      createdAt: moment().subtract(2, 'minutes'),
      state: 'failed',
      failureReason: 'render_timeout',
    });

    urlParams = {
      orgSlug: organization.slug,
      projectSlug: project.slug,
      buildId: build.id,
    };
  });

  it('shows as failed', function() {
    BuildPageObject.visitBuild(urlParams);

    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the build page');

    BuildPageObject.toggleBuildInfoDropdown();

    percySnapshot(this.test.fullTitle() + ' on the build page with build info open');

    window.Intercom = sinon.stub();

    BuildPageObject.clickShowSupportLink();
    andThen(() => {
      expect(window.Intercom).to.have.been.calledWith('show');
    });
  });
});

describe('Acceptance: Build', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();

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

  // TODO: test number of snapshots, expanded, actionable status for all
  it('shows build overview info dropdown', function() {
    BuildPageObject.visitBuild(urlParams);
    BuildPageObject.toggleBuildInfoDropdown();
    percySnapshot(this.test.fullTitle());
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

  it('toggles full view', function() {
    BuildPageObject.visitBuild(urlParams);
    BuildPageObject.snapshots(0).header.clickToggleFullscreen();

    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.snapshot');
      expect(BuildPageObject.snapshotFullscreen.isVisible).to.equal(true);
    });

    BuildPageObject.snapshotFullscreen.header.clickToggleFullscreen();

    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
      expect(BuildPageObject.snapshotFullscreen.isVisible).to.equal(false);
    });
  });
});

describe('Acceptance: Fullscreen Snapshot', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();

  let project;
  let snapshot;
  let urlParams;

  setupSession(function(server) {
    const organization = server.create('organization', 'withUser');
    project = server.create('project', {name: 'project-with-finished-build', organization});
    const build = server.create('build', {
      project,
      createdAt: moment().subtract(2, 'minutes'),
      finishedAt: moment().subtract(5, 'seconds'),
    });
    snapshot = server.create('snapshot', 'withComparison', {build});

    urlParams = {
      orgSlug: organization.slug,
      projectSlug: project.slug,
      buildId: build.id,
      snapshotId: snapshot.id,
      width: snapshot.comparisons.models[0].width,
      mode: 'diff',
    };
  });

  it('responds to keystrokes and click in full view', function() {
    BuildPageObject.visitFullPageSnapshot(urlParams);

    BuildPageObject.snapshotFullscreen.typeRightArrow();

    andThen(() => {
      expect(currentURL()).to.include('mode=head');
    });

    BuildPageObject.snapshotFullscreen.typeLeftArrow();

    andThen(() => {
      expect(currentURL()).to.include('mode=diff');
    });

    BuildPageObject.snapshotFullscreen.clickComparisonViewer();
    andThen(() => {
      expect(currentURL()).to.include('mode=head');
    });

    BuildPageObject.snapshotFullscreen.typeEscape();
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
      expect(BuildPageObject.snapshotFullscreen.isVisible).to.equal(false);
    });
  });

  it('toggles between old/diff/new comparisons when interacting with comparison mode switcher', function() { // eslint-disable-line
    BuildPageObject.visitFullPageSnapshot(urlParams);

    BuildPageObject.snapshotFullscreen.clickBaseComparisonMode();

    andThen(() => {
      expect(BuildPageObject.snapshotFullscreen.comparisonImageUrl).to.equal(
        '/images/test/bs-base.png',
      );
    });

    BuildPageObject.snapshotFullscreen.clickHeadComparisonMode();

    andThen(() => {
      expect(BuildPageObject.snapshotFullscreen.comparisonImageUrl).to.equal(
        '/images/test/bs-head.png',
      );
    });

    BuildPageObject.snapshotFullscreen.clickDiffComparisonMode();

    andThen(() => {
      expect(BuildPageObject.snapshotFullscreen.diffImageUrl).to.equal(
        '/images/test/bs-pdiff-base-head.png',
      );
    });
  });
});
