import {visitable, collection, create, clickable} from 'ember-cli-page-object';
import {SnapshotViewer} from 'percy-web/tests/pages/components/snapshot-viewer';

const SELECTORS = {
  BUILD_LIST: '[data-test-project-container-build-list]',
};

const BuildPage = {
  visitProject: visitable('/:orgSlug/:projectSlug'),
  visitBuild: visitable('/:orgSlug/:projectSlug/builds/:buildId'),

  snapshots: collection({
    itemScope: SnapshotViewer.scope,
    item: SnapshotViewer,
  }),

  snapshotTitles: {
    isDescriptor: true,
    get() {
      return this.snapshots().map(snapshot => snapshot.titleText);
    },
  },

  findSnapshotByName(name) {
    debugger;
    return this.snapshots()
      .toArray()
      .findBy('title', name);
  },



};

export const FullScreenDiff = {
  visitSnapshotDiff: visitable('/:orgSlug/:projectSlug/builds/:buildId/view/:snapshotId/:width'),
  snapshot: SnapshotViewer,
};

export const FullScreenDiffPage = create(FullScreenDiff);

export default create(BuildPage);
