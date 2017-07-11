import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';
import freezeMoment from '../helpers/freeze-moment';
import moment from 'moment';

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

    click('.BuildState');
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the build page');
  });
});

describe('Acceptance: Processing Build', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();

  setupSession(function(server) {
    let organization = server.create('organization', 'withUser');
    let project = server.create('project', {name: 'processing build', organization});
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

    click('.BuildState');
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the build page');
  });
});

describe('Acceptance: Failed Build', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();

  setupSession(function(server) {
    let organization = server.create('organization', 'withUser');
    let project = server.create('project', {name: 'failed build', organization});
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

    click('.BuildState');
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the build page');
  });
});

describe('Acceptance: Build', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();

  setupSession(function(server) {
    let organization = server.create('organization', 'withUser');
    let project = server.create('project', {name: 'finished build', organization});
    let build = server.create('build', {project, createdAt: moment().subtract(2, 'minutes')});
    this.comparisons = {
      different: server.create('comparison', {build}),
      gotLonger: server.create('comparison', 'gotLonger', {build}),
      gotShorter: server.create('comparison', 'gotShorter', {build}),
      wasAdded: server.create('comparison', 'wasAdded', {build}),
      wasRemoved: server.create('comparison', 'wasRemoved', {build}),
      same: server.create('comparison', 'same', {build}),
      differentNoMobile: server.create('comparison', {build}),
    };

    // Create some mobile width comparisons
    let headSnapshot = this.comparisons.different.headSnapshot;
    server.create('comparison', 'mobile', {build, headSnapshot});
    headSnapshot = this.comparisons.wasAdded.headSnapshot;
    server.create('comparison', 'mobile', 'wasAdded', {build, headSnapshot});

    this.project = project;
    this.build = build;
  });

  it('shows as finished', function() {
    visit(`/${this.project.fullSlug}`);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the project page');

    click('.BuildState');
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the build page');

    //click('.BuildModePicker button');
    //percySnapshot(this.test.fullTitle() + ' in overview mode');
  });

  it('toggles the image and pdiff', function() {
    visit(`/${this.project.fullSlug}/builds/${this.build.id}`);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });

    let comparison = this.comparisons.different;
    let comparisonSelector = `.SnapshotViewer:has(div[title="${comparison.headSnapshot.name}"])`;

    andThen(() => {
      expect(find(`${comparisonSelector} .pdiffImageOverlay img`).length).to.equal(1);
    });

    click(`${comparisonSelector} .pdiffImageOverlay img`);
    andThen(() => {
      expect(find(`${comparisonSelector} .pdiffImageOverlay img`).length).to.equal(0);
    });
    percySnapshot(this.test.fullTitle() + ' | hides overlay');

    // TODO somehow click is not happening with regular click, had to trigger('click')
    //click(`${comparisonSelector} .SnapshotViewer-pdiffImageBox img`);
    andThen(() => {
      find(`${comparisonSelector} .Viewer-pdiffImageBox img`).trigger('click');
    });
    andThen(() => {
      expect(find(`${comparisonSelector} .pdiffImageOverlay img`).length).to.equal(1);
    });
    percySnapshot(this.test.fullTitle() + ' | shows overlay');
  });

  it('walk across snapshots with arrow keys', function() {
    const RightArrowKey = 39;
    const LeftArrowKey = 37;
    visit(`/${this.project.fullSlug}/builds/${this.build.id}`);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
      expect(currentURL()).to.equal(`/${this.project.fullSlug}/builds/1`);
    });


    keyEvent('.SnapshotList', 'keydown', RightArrowKey);
    andThen(() => {
      expect(currentURL()).to.equal(`/${this.project.fullSlug}/builds/1?snapshot=snapshot-3`);
    });
    percySnapshot(this.test.fullTitle() + ' | Right');

    keyEvent('.SnapshotList', 'keydown', RightArrowKey);
    andThen(() => {
      expect(currentURL()).to.equal(`/${this.project.fullSlug}/builds/1?snapshot=snapshot-1`);
    });
    percySnapshot(this.test.fullTitle() + ' | Right*2');

    keyEvent('.SnapshotList', 'keydown', LeftArrowKey);
    andThen(() => {
      expect(currentURL()).to.equal(`/${this.project.fullSlug}/builds/1?snapshot=snapshot-3`);
    });
    percySnapshot(this.test.fullTitle() + ' | Right*2 + Left');
  });

  it('jumps to snapshot for query params', function() {
    let snapshot = this.comparisons.wasAdded.headSnapshot;

    visit(`/${this.project.fullSlug}/builds/${this.build.id}?snapshot=${snapshot.id}`);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
      expect(
        find('.SnapshotViewer.SnapshotViewer--focus .SnapshotViewer-title a').text()
      ).to.equal(snapshot.name);
    });

    percySnapshot(this.test.fullTitle());
  });

  it('jumps to snapshot for query params in collapsed no diffs', function() {
    let snapshot = this.comparisons.same.headSnapshot;
    visit(`/${this.project.fullSlug}/builds/${this.build.id}?snapshot=${snapshot.id}`);
    andThen(() => {
      expect(
        find('.SnapshotViewer.SnapshotViewer--focus .SnapshotViewer-title a').text()
      ).to.equal(snapshot.name);
    });
  });

  it('shows and hides unchanged diffs', function() {
    visit(`/${this.project.fullSlug}/builds/${this.build.id}`);

    percySnapshot(this.test.fullTitle() + ' | shows batched no diffs');

    click('.HideNoDiffsPanel');
    andThen(() => {
      expect(find('.ComparisonViewer-noDiffBox')).to.have.lengthOf(1);
    });

    percySnapshot(this.test.fullTitle() + ' | shows expanded no diffs');
  });

  it('toggles full view', function() {
    visit(`/${this.project.fullSlug}/builds/${this.build.id}`);
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
      expect(find('.ComparisonModeSwitcher').css('visibility')).to.equal('hidden');
    });
  });

  it('hides comparison mode controls in full view if no snapshot taken', function() {
    let snapshot = this.comparisons.wasAdded.headSnapshot;

    visit(`/${this.project.fullSlug}/builds/${this.build.id}/view/${snapshot.id}/1280?mode=diff`);
    andThen(() => {
      expect(find('.ComparisonModeSwitcher span').length).to.equal(1);
      expect(find('.ComparisonModeSwitcher span').text()).to.equal('New Snapshot');
    });
  });
});
