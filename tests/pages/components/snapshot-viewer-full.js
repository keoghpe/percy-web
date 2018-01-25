import {create, attribute} from 'ember-cli-page-object';
import {SnapshotViewerHeader} from 'percy-web/tests/pages/components/snapshot-viewer-header';

const selectors = {
  HEADER: ['data-test-SnapshotViewer-header'],
  COMPARISON: ['data-test-SnapshotViewer-comparison'],
  NO_COMPARISON: ['data-test-SnapshotViewer-noComparison'],
  COMPARISON_VIEWER: '[data-test-SnapshotViewerFull-comparison-viewer]',
  COMPARISON_IMAGE: '[data-test-SnapshotViewerFull-comparison-viewer] [data-test-simple-image]',
};

export const SnapshotViewer = {
  header: SnapshotViewerHeader,

  comparisonImageUrl: attribute('src', selectors.COMPARISON_IMAGE, {multiple: true}),
};

export default create(SnapshotViewer);
