import {create, collection} from 'ember-cli-page-object';
import {SnapshotViewer} from 'percy-web/tests/pages/components/snapshot-viewer';

const SELECTORS = {
  SNAPSHOT_LIST: '[data-test-snapshot-list]',
};

export const SnapshotList = {
  scope: SELECTORS.SNAPSHOT_LIST,

  snapshots: collection({
    itemScope: SnapshotViewer.scope,
    item: SnapshotViewer,
  }),
};

export default create(SnapshotList);
