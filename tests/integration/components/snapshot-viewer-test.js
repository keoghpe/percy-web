/* jshint expr:true */
/* eslint-disable no-unused-expressions */
import {setupComponentTest} from 'ember-mocha';
import {expect} from 'chai';
import {it, describe, beforeEach} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make, manualSetup} from 'ember-data-factory-guy';
// import sinon from 'sinon';
import SnapshotViewerPO from 'percy-web/tests/pages/components/snapshot-viewer';

describe('Integration: SnapshotViewer', function() {
  setupComponentTest('snapshot-viewer', {
    integration: true,
  });

  beforeEach(function() {
    manualSetup(this.container);
    SnapshotViewerPO.setContext(this);
  });

  let snapshotTitle;
  const buildWidths = ['325', '500', '1024'];
  describe('it renders', function() {
    beforeEach(function() {
      snapshotTitle = 'Awesome snapshot title';
      const snapshot = make('snapshot', {name: snapshotTitle});
      const build = make('build');
      this.setProperties({
        snapshot,
        build,
        buildWidths,
        buildContainerSelectedWidth: ['500'],
      });

      this.render(hbs`{{snapshot-viewer
        snapshot=snapshot
        build=build
        buildWidths=buildWidths
        buildContainerSelectedWidth=buildContainerSelectedWidth
      }}`);
    });

    it('renders header', function() {
      expect(SnapshotViewerPO.header.isTitleVisible, 'title should be visible').to.equal(true);

      expect(SnapshotViewerPO.header.titleText, 'title text should be correct').to.equal(
        snapshotTitle,
      );

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
