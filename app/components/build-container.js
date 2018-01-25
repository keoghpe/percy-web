import {max, oneWay, or} from '@ember/object/computed';
import Component from '@ember/component';
import PollingMixin from 'percy-web/mixins/polling';

export default Component.extend(PollingMixin, {
  build: null,
  activeSnapshotId: null,
  updateActiveSnapshotId: null,
  classNames: ['BuildContainer'],
  classNameBindings: [
    'classes',
    'isShowingModal:BuildContainer--snapshotModalOpen:BuildContainer--snapshotModalClosed',
  ],
  maxWidth: max('build.comparisonWidths'),
  buildContainerSelectedWidth: oneWay('maxWidth'),
  noWidthSelected: false,
  currentPosition: null,

  showComparisons: or('build.isPending', 'build.isProcessing', 'build.isFinished'),
  shouldPollForUpdates: or('build.isPending', 'build.isProcessing'),

  pollRefresh() {
    this.get('build')
      .reload()
      .then(build => {
        build.get('comparisons').reload();
      });
  },

  actions: {
    showSnapshotFullModalTriggered(snapshotId, snapshotSelectedWidth) {
      this.sendAction('openSnapshotFullModal', snapshotId, snapshotSelectedWidth);
    },
    updateActiveSnapshotId(comparisonId) {
      this.get('updateActiveSnapshotId')(comparisonId);
    },
    updateSelectedWidth(width) {
      // Clear the query parameter selected snapshot.
      this.sendAction('updateActiveSnapshotId', undefined);

      this.set('noWidthSelected', false);
      if (width) {
        this.set('buildContainerSelectedWidth', width);
      }
      window.scrollTo(0, 0);
    },
    showSupport() {
      this.sendAction('showSupport');
    },
    snapshotWidthChangeTriggered() {
      this.set('noWidthSelected', true);
    },
  },
});
