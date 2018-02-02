import {create} from 'ember-cli-page-object';
import {alias} from 'ember-cli-page-object/macros';
import {SnapshotViewerHeader} from 'percy-web/tests/pages/components/snapshot-viewer-header';

const SELECTORS = {
  SNAPSHOT_VIEWER: '[data-test-SnapshotViewer]',
}

export const SnapshotViewer = {
  scope: SELECTORS.SNAPSHOT_VIEWER,
  header: SnapshotViewerHeader,
  title: alias('header.titleText'),
};

export default create(SnapshotViewer);
