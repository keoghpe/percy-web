import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  // required params
  snapshot: null,
  buildWidths: null,
  flashMessages: service(),
  hasComparisonAtSelectedWidth: null,
  selectedWidth: null,
  selectedComparison: null,

  // optional params
  fullscreen: false,
  comparisonMode: '',
  tagName: '',

  // required actions
  toggleViewMode: null,
  updateSelectedWidth: null,

  // optional actions
  registerChild() {},
  updateComparisonMode() {},

  actions: {
    onCopySnapshotUrlToClipboard() {
      this.get('flashMessages').success('Snapshot URL was copied to your clipboard');
    },
  },
});
