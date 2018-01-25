import {create} from 'ember-cli-page-object';
import {SnapshotViewerHeader} from 'percy-web/tests/pages/components/snapshot-viewer-header';

export const SnapshotViewer = {
  header: SnapshotViewerHeader,
};

export default create(SnapshotViewer);
