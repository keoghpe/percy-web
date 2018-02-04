/* jshint expr:true */
import {setupComponentTest} from 'ember-mocha';
import {expect} from 'chai';
import {it, describe, beforeEach} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make, manualSetup} from 'ember-data-factory-guy';
import sinon from 'sinon';
import SnapshotViewerFullPO from 'percy-web/tests/pages/components/snapshot-viewer-full';
import {TEST_BUILD_WIDTHS} from 'percy-web/tests/factories/comparison';

describe('Integration: SnapshotViewerFull', function() {
  setupComponentTest('snapshot-viewer-full', {
    integration: true,
  });

  let closeSnapshotFullModalStub;
  let updateComparisonModeStub;
  let addedSnapshot;
  const snapshotTitle = 'Awesome snapshot title';
  const widthIndex = 1;
  const buildWidths = TEST_BUILD_WIDTHS;
  const snapshotSelectedWidth = buildWidths[widthIndex];

  beforeEach(function() {
    manualSetup(this.container);
    SnapshotViewerFullPO.setContext(this);

    const build = make('build');
    const snapshot = make('snapshot', 'withComparisons', {
      build,
      name: snapshotTitle,
    });

    addedSnapshot = make('snapshot', 'new', {build});

    closeSnapshotFullModalStub = sinon.stub();
    updateComparisonModeStub = sinon.stub();

    this.setProperties({
      build,
      buildWidths,
      snapshotSelectedWidth,
      snapshotId: snapshot.get('id'),
      comparisonMode: 'diff',
      closeSnapshotFullModal: closeSnapshotFullModalStub,
      updateComparisonMode: updateComparisonModeStub,
      stub: sinon.stub(),
    });

    this.render(hbs`{{snapshot-viewer-full
      snapshotId=snapshotId
      build=build
      buildWidths=buildWidths
      snapshotSelectedWidth=snapshotSelectedWidth
      comparisonMode=comparisonMode
      transitionRouteToWidth=stub
      updateComparisonMode=updateComparisonMode
      closeSnapshotFullModal=closeSnapshotFullModal
    }}`);
  });

  it('displays snapshot name', function() {
    expect(SnapshotViewerFullPO.header.isTitleVisible, 'title should be visible').to.equal(true);

    expect(SnapshotViewerFullPO.header.titleText, 'title text should be correct').to.equal(
      snapshotTitle,
    );
  });

  describe('comparison mode switcher', function() {
    it('displays comparison mode switcher', function() {
      expect(
        SnapshotViewerFullPO.header.isComparisonModeSwitcherVisible,
        'comparison mode switcher should be visible',
      ).to.equal(true);
    });

    it('sends updateComparisonMode action when comparison switcher is clicked', function() {
      SnapshotViewerFullPO.header.clickBaseComparisonMode();
      expect(updateComparisonModeStub).to.have.been.calledWith('base');

      SnapshotViewerFullPO.header.clickDiffComparisonMode();
      expect(updateComparisonModeStub).to.have.been.calledWith('diff');

      SnapshotViewerFullPO.header.clickHeadComparisonMode();
      expect(updateComparisonModeStub).to.have.been.calledWith('head');
    });

    it('hides comparison mode controls when no comparison for specified width', function() {
      // A comparison for this width doesn't exist
      this.set('snapshotSelectedWidth', 99999);

      expect(SnapshotViewerFullPO.isComparisonModeSwitcherVisible).to.equal(false);
      percySnapshot(this.test);
    });

    it('shows "New" button when snapshot is new', function() {
      this.set('snapshotId', addedSnapshot.get('id'));

      expect(SnapshotViewerFullPO.isNewComparisonModeButtonVisible).to.equal(true);
      percySnapshot(this.test);
    });
  });

  describe('width switcher', function() {
    it('displays', function() {
      expect(
        SnapshotViewerFullPO.header.isWidthSwitcherVisible,
        'width switcher should be visible',
      ).to.equal(true);
    });

    it('has the right number of buttons', function() {
      expect(
        SnapshotViewerFullPO.header.widthSwitcher.buttons().count,
        'there should be correct number of buttons',
      ).to.equal(buildWidths.length);
    });

    it('displays the correct text on the buttons', function() {
      SnapshotViewerFullPO.header.widthSwitcher.buttons().forEach((button, i) => {
        expect(button.text, `button ${i} should contain correct width`).to.equal(
          `${buildWidths[i]}px`,
        );
      });
    });

    it('displays correct number as selected', function() {
      expect(SnapshotViewerFullPO.header.widthSwitcher.buttons(0).isActive).to.equal(false);
      expect(SnapshotViewerFullPO.header.widthSwitcher.buttons(widthIndex).isActive).to.equal(true);
      expect(SnapshotViewerFullPO.header.widthSwitcher.buttons(2).isActive).to.equal(false);
    });

    it('updates active button when clicked', function() {
      SnapshotViewerFullPO.header.widthSwitcher.buttons(0).click();
      expect(SnapshotViewerFullPO.header.widthSwitcher.buttons(0).isActive).to.equal(true);
      expect(SnapshotViewerFullPO.header.widthSwitcher.buttons(1).isActive).to.equal(false);
      expect(SnapshotViewerFullPO.header.widthSwitcher.buttons(2).isActive).to.equal(false);

      SnapshotViewerFullPO.header.widthSwitcher.buttons(2).click();
      expect(SnapshotViewerFullPO.header.widthSwitcher.buttons(0).isActive).to.equal(false);
      expect(SnapshotViewerFullPO.header.widthSwitcher.buttons(1).isActive).to.equal(false);
      expect(SnapshotViewerFullPO.header.widthSwitcher.buttons(2).isActive).to.equal(true);

      SnapshotViewerFullPO.header.widthSwitcher.buttons(1).click();
      expect(SnapshotViewerFullPO.header.widthSwitcher.buttons(0).isActive).to.equal(false);
      expect(SnapshotViewerFullPO.header.widthSwitcher.buttons(1).isActive).to.equal(true);
      expect(SnapshotViewerFullPO.header.widthSwitcher.buttons(2).isActive).to.equal(false);
    });
  });

  it('compares visually to previous screenshot', function() {
    percySnapshot(this.test);
  });

  describe('full screen toggle button', function() {
    it('displays', function() {
      expect(SnapshotViewerFullPO.header.isFullScreenToggleVisible).to.equal(true);
    });

    it('sends closeSnapshotFullModal when toggle fullscreen button is clicked', function() {
      SnapshotViewerFullPO.header.clickToggleFullscreen();
      expect(closeSnapshotFullModalStub).to.have.been.calledWith(
        this.get('build.id'),
        this.get('snapshotId'),
      );
    });
  });
});
