import {create} from 'ember-cli-page-object';
import {SnapshotViewerHeader} from 'percy-web/tests/pages/components/snapshot-viewer-header';

// const selectors = {
//   HEADER: ['data-test-SnapshotViewer-header'],
//   COMPARISON: ['data-test-SnapshotViewer-comparison'],
//   NO_COMPARISON: ['data-test-SnapshotViewer-noComparison'],
// };

export const SnapshotViewer = {
  header: SnapshotViewerHeader,
};

export default create(SnapshotViewer);
