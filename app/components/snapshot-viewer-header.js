import Component from '@ember/component';

export default Component.extend({
  // required params
  snapshot: null,
  buildWidths: null,
  selectedWidth: null,
  selectedComparison: null,
  hasComparisonAtSelectedWidth: null,

  // optional params
  fullscreen: false,
  comparisonMode: '',

  // required actions
  toggleViewMode: null,
  updateSelectedWidth: null,
  // optional actions
  registerChild() {},
  updateComparisonMode() {},
});
