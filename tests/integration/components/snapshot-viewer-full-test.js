/* jshint expr:true */
/* eslint-disable no-unused-expressions */
import {setupComponentTest} from 'ember-mocha';
import {expect} from 'chai';
import {it, describe, beforeEach} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make, makeList, manualSetup} from 'ember-data-factory-guy';
import sinon from 'sinon';
import SnapshotViewerPO from 'percy-web/tests/pages/components/snapshot-viewer';

// TODO: acceptance test for clicking different comparison modes

describe('Integration: SnapshotViewerFull', function() {
  setupComponentTest('snapshot-viewer-full', {
    integration: true,
  });

  beforeEach(function() {
    manualSetup(this.container);
    SnapshotViewerPO.setContext(this);
  });

  let closeSnapshotFullModalStub;
  let updateComparisonModeStub;
  const snapshotTitle = 'Awesome snapshot title';
  // NOTE: these need to be the same as the widths in the snapshot factory
  const buildWidths = [375, 550, 1024];
  // TODO: un-nest this describe
  describe('it renders header', function() {
    beforeEach(function() {
      const snapshots = makeList('snapshot', 5, 'withComparisons');
      snapshots[0].set('name', snapshotTitle);
      const build = make('build');
      build.set('snapshots', snapshots);

      closeSnapshotFullModalStub = sinon.stub();
      updateComparisonModeStub = sinon.stub();

      this.setProperties({
        buildWidths,
        build,
        snapshotId: build.get('snapshots.firstObject.id'),
        snapshotSelectedWidth: buildWidths[1],
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
        updateSelectedWidth=stub
        closeSnapshotFullModal=closeSnapshotFullModal
      }}`);
    });

    it('renders header', function() {
      // TODO test snapshotSelectedWidth
      expect(SnapshotViewerPO.header.isTitleVisible, 'title should be visible').to.equal(true);

      expect(SnapshotViewerPO.header.titleText, 'title text should be correct').to.equal(
        snapshotTitle,
      );

      expect(
        SnapshotViewerPO.header.isComparisonModeSwitcherVisible,
        'comparison mode switcher should be visible',
      ).to.equal(true);

      expect(
        SnapshotViewerPO.header.isWidthSwitcherVisible,
        'width switcher should be visible',
      ).to.equal(true);

      expect(
        SnapshotViewerPO.header.widthSwitcher.buttons().count,
        'there should be correct number of buttons',
      ).to.equal(buildWidths.length);

      SnapshotViewerPO.header.widthSwitcher.buttons().forEach((button, i) => {
        expect(button.text, `button ${i} should contain correct width`).to.equal(
          `${buildWidths[i]}px`,
        );
      });

      expect(SnapshotViewerPO.header.isFullScreenToggleVisible).to.equal(true);

      percySnapshot(this.test);
    });

    it('clicks toggleFullscreen button', function() {
      SnapshotViewerPO.header.clickToggleFullscreen();
      expect(closeSnapshotFullModalStub).to.have.been.calledWith(
        this.get('build.id'),
        this.get('snapshotId'),
      );
    });

    it('sends updateComparisonMode action', function() {
      // TODO: test this somewhere images can change
      SnapshotViewerPO.header.clickBaseComparisonMode();
      expect(updateComparisonModeStub).to.have.been.calledWith('base');

      SnapshotViewerPO.header.clickDiffComparisonMode();
      expect(updateComparisonModeStub).to.have.been.calledWith('diff');

      SnapshotViewerPO.header.clickHeadComparisonMode();
      expect(updateComparisonModeStub).to.have.been.calledWith('head');
    });
  });
});
