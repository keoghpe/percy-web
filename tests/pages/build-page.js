import {visitable, collection, create, clickable, isVisible} from 'ember-cli-page-object';
import {SnapshotViewer} from 'percy-web/tests/pages/components/snapshot-viewer';

const SELECTORS = {
  BUILD_LIST: '[data-test-project-container-build-list]',
  NO_DIFFS_PANEL: '[data-test-toggle-no-diffs]',
};

// TODO snapshot-list page object?
const BuildPage = {
  visitProject: visitable('/:orgSlug/:projectSlug'),
  visitBuild: visitable('/:orgSlug/:projectSlug/builds/:buildId'),

  isNoDiffsPanelVisible: isVisible(SELECTORS.NO_DIFFS_PANEL),
  clickToggleNoDiffsSection: clickable(SELECTORS.NO_DIFFS_PANEL),

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
    return this.snapshots()
      .toArray()
      .findBy('name', name);
  },

  focusedSnapshot() {
    return this.snapshots()
      .toArray()
      .findBy('isFocused', true);
  },

  urlWithSnapshotQueryParam(snapshot, build) {
    return `/${build.project.fullSlug}/builds/${build.id}?snapshot=${snapshot.id}`;
  },
};

export const FullScreenDiff = {
  visitSnapshotDiff: visitable('/:orgSlug/:projectSlug/builds/:buildId/view/:snapshotId/:width'),
  snapshot: SnapshotViewer,
};

export const FullScreenDiffPage = create(FullScreenDiff);

export default create(BuildPage);
