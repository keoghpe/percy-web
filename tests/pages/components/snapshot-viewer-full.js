import {create, attribute, triggerable, clickable, isVisible} from 'ember-cli-page-object';
import {SnapshotViewerHeader} from 'percy-web/tests/pages/components/snapshot-viewer-header';
import {alias} from 'ember-cli-page-object/macros';

const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;
const ESCAPE_KEY = 27;

const SELECTORS = {
  SNAPSHOT_VIEWER_FULL: '[data-test-snapshotViewerFull]',
  HEADER: '[data-test-SnapshotViewer-header]',
  COMPARISON: '[data-test-SnapshotViewer-comparison]',
  NO_COMPARISON: '[data-test-SnapshotViewer-noComparison]',
  COMPARISON_VIEWER: '[data-test-SnapshotViewerFull-comparison-viewer]',
  COMPARISON_IMAGE: '[data-test-SnapshotViewerFull-comparison-viewer] img',
  COMPARISON_MODE_SWITCHER: '[data-test-comparison-mode-switcher]',
  DIFF_IMAGE: '.pdiffImageOverlay img',
  DIFF_IMAGE_BOX: '[data-test-ComparisonViewer-diffImageBox] img',
};

export const SnapshotViewerFull = {
  scope: SELECTORS.SNAPSHOT_VIEWER_FULL,
  header: SnapshotViewerHeader,

  clickBaseComparisonMode: alias('header.clickBaseComparisonMode'),
  clickDiffComparisonMode: alias('header.clickDiffComparisonMode'),
  clickHeadComparisonMode: alias('header.clickHeadComparisonMode'),

  comparisonImageUrl: attribute('src', SELECTORS.COMPARISON_IMAGE),
  diffImageUrl: attribute('src', SELECTORS.DIFF_IMAGE),

  typeLeftArrow: triggerable('keydown', '', {
    eventProperties: {keyCode: LEFT_ARROW_KEY},
  }),
  typeRightArrow: triggerable('keydown', '', {
    eventProperties: {keyCode: RIGHT_ARROW_KEY},
  }),
  typeEscape: triggerable('keydown', '', {
    eventProperties: {keyCode: ESCAPE_KEY},
  }),

  clickComparisonViewer: clickable(SELECTORS.COMPARISON_VIEWER),

  isComparisonModeSwitcherVisible: isVisible(SELECTORS.COMPARISON_MODE_SWITCHER),
};

export default create(SnapshotViewerFull);
