import {create, isVisible, clickable, hasClass} from 'ember-cli-page-object';
import {SnapshotViewerHeader} from 'percy-web/tests/pages/components/snapshot-viewer-header';
import {alias} from 'ember-cli-page-object/macros';

const SELECTORS = {
  SNAPSHOT_VIEWER: '[data-test-SnapshotList]',
  DIFF_IMAGE: '.pdiffImageOverlay img',
  DIFF_IMAGE_BOX: '[data-test-ComparisonViewer-diffImageBox] img',
};

export const SnapshotViewer = {
  scope: SELECTORS.SNAPSHOT_VIEWER,
  header: SnapshotViewerHeader,

  name: alias('header.titleText'),

  isDiffImageVisible: isVisible(SELECTORS.DIFF_IMAGE),
  clickDiffImage: clickable(SELECTORS.DIFF_IMAGE),

  clickDiffImageBox: clickable(SELECTORS.DIFF_IMAGE_BOX),

  isFocused: hasClass('SnapshotViewer--focus'),
};

export default create(SnapshotViewer);
