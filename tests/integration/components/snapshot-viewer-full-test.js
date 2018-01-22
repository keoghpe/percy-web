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

describe('Integration: SnapshotViewerFull', function() {
  setupComponentTest('snapshot-viewer-full', {
    integration: true,
  });

  beforeEach(function() {
    manualSetup(this.container);
    SnapshotViewerPO.setContext(this);
  });

  const snapshotTitle = 'Awesome snapshot title';
  // NOTE: these need to be the same as the widths in the snapshot factory
  const buildWidths = [375, 550, 1024];
  describe('it renders header', function() {
    beforeEach(function() {
      const snapshots = makeList('snapshot', 5, 'withComparisons');
      snapshots[0].set('name', snapshotTitle);
      const build = make('build');
      build.set('snapshots', snapshots);

      this.setProperties({
        buildWidths,
        build,
        snapshotId: build.get('snapshots.firstObject.id'),
        snapshotSelectedWidth: buildWidths[1],
        comparisonMode: 'diff',
        stub: sinon.stub(),
      });

      this.render(hbs`{{snapshot-viewer-full
        snapshotId=snapshotId
        build=build
        buildWidths=buildWidths
        snapshotSelectedWidth=snapshotSelectedWidth
        comparisonMode=comparisonMode
        transitionRouteToWidth=stub
        updateComparisonMode=stub
        updateSelectedWidth=stub
        closeSnapshotFullModal=stub
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
  });
});
