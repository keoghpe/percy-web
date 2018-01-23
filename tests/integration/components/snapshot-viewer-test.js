/* jshint expr:true */
/* eslint-disable no-unused-expressions */
import {setupComponentTest} from 'ember-mocha';
import {expect} from 'chai';
import {it, describe, beforeEach} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make, manualSetup} from 'ember-data-factory-guy';
import sinon from 'sinon';
import SnapshotViewerPO from 'percy-web/tests/pages/components/snapshot-viewer';

// TODO: acceptance test for clicking different comparison modes
// TODO: acceptance test for clicking snapshot title and see query params change
// TODO: clicking comparison mode buttons switch img src
// TODO: clicking on right comparison, toggles diff image

describe('Integration: SnapshotViewer', function() {
  setupComponentTest('snapshot-viewer', {
    integration: true,
  });

  let snapshotTitle;
  const widthIndex = 1;
  // NOTE: these need to be the same as the widths in the snapshot factory
  const buildWidths = [375, 550, 1024];
  const buildContainerSelectedWidth = buildWidths[widthIndex];
  let showSnapshotFullModalTriggeredStub;

  beforeEach(function() {
    manualSetup(this.container);
    SnapshotViewerPO.setContext(this);

    showSnapshotFullModalTriggeredStub = sinon.stub();
    snapshotTitle = 'Awesome snapshot title';
    const snapshot = make('snapshot', {name: snapshotTitle});
    const build = make('build');
    const stub = sinon.stub();

    this.setProperties({
      stub,
      snapshot,
      build,
      buildWidths,
      buildContainerSelectedWidth,
      showSnapshotFullModalTriggered: showSnapshotFullModalTriggeredStub,
    });

    this.render(hbs`{{snapshot-viewer
      snapshot=snapshot
      build=build
      buildWidths=buildWidths
      buildContainerSelectedWidth=buildContainerSelectedWidth
      showSnapshotFullModalTriggered=showSnapshotFullModalTriggered
      snapshotWidthChangeTriggered=stub
    }}`);
  });

  it('displays snapshot name', function() {
    expect(SnapshotViewerPO.header.isTitleVisible, 'title should be visible').to.equal(true);

    expect(SnapshotViewerPO.header.titleText, 'title text should be correct').to.equal(
      snapshotTitle,
    );
  });

  it('compares visually to previous screenshot', function() {
    percySnapshot(this.test);
  });

  describe('comparison mode switcher', function() {
    it('does does not display', function() {
      expect(
        SnapshotViewerPO.header.isComparisonModeSwitcherVisible,
        'comparison mode switcher should not be visible',
      ).to.equal(false);
    });
  });

  describe('width switcher', function() {
    it('displays', function() {
      expect(
        SnapshotViewerPO.header.isWidthSwitcherVisible,
        'width switcher should be visible',
      ).to.equal(true);
    });

    it('has the right number of buttons', function() {
      expect(
        SnapshotViewerPO.header.widthSwitcher.buttons().count,
        'there should be correct number of buttons',
      ).to.equal(buildWidths.length);
    });

    it('displays correct text on the buttons', function() {
      SnapshotViewerPO.header.widthSwitcher.buttons().forEach((button, i) => {
        expect(button.text, `button ${i} should contain correct width`).to.equal(
          `${buildWidths[i]}px`,
        );
      });
    });

    it('displays correct number as selected', function() {
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(0).isActive).to.equal(false);
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(widthIndex).isActive).to.equal(true);
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(2).isActive).to.equal(false);
    });

    it('updates active button when clicked', function() {
      SnapshotViewerPO.header.widthSwitcher.buttons(0).click();
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(0).isActive).to.equal(true);
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(1).isActive).to.equal(false);
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(2).isActive).to.equal(false);

      SnapshotViewerPO.header.widthSwitcher.buttons(2).click();
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(0).isActive).to.equal(false);
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(1).isActive).to.equal(false);
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(2).isActive).to.equal(true);

      SnapshotViewerPO.header.widthSwitcher.buttons(1).click();
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(0).isActive).to.equal(false);
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(1).isActive).to.equal(true);
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(2).isActive).to.equal(false);
    });
  });

  describe('full screen toggle button', function() {
    it('displays', function() {
      expect(SnapshotViewerPO.header.isFullScreenToggleVisible).to.equal(true);
    });

    it('sends closeSnapshotFullModal when toggle fullscreen button is clicked', function() {
      SnapshotViewerPO.header.clickToggleFullscreen();
      expect(showSnapshotFullModalTriggeredStub).to.have.been.calledWith(
        this.get('snapshot.id'),
        this.get('buildContainerSelectedWidth'),
      );
    });
  });
});
