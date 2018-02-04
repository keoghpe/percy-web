import {
  visitable,
  collection,
  create,
  clickable,
  isVisible,
  triggerable,
} from 'ember-cli-page-object';
import {SnapshotViewer} from 'percy-web/tests/pages/components/snapshot-viewer';
import {SnapshotViewerFull} from 'percy-web/tests/pages/components/snapshot-viewer-full';

const DOWN_ARROW_KEY = 40;
const UP_ARROW_KEY = 38;

const SELECTORS = {
  BUILD_LIST: '[data-test-project-container-build-list]',
  NO_DIFFS_PANEL: '[data-test-toggle-no-diffs]',
  SNAPSHOT_LIST: '[data-test-snapshotList]',
  BUILD_INFO_DROPDOWN_TOGGLE: '[data-test-build-info-dropdown-toggle]',
  SHOW_SUPPORT_LINK: '[data-test-build-overview-show-support]',
};

// TODO snapshot-list page object?
const BuildPage = {
  visitProject: visitable('/:orgSlug/:projectSlug'),
  visitBuild: visitable('/:orgSlug/:projectSlug/builds/:buildId'),
  visitFullPageSnapshot: visitable(
    '/:orgSlug/:projectSlug/builds/:buildId/view/:snapshotId/:width',
  ),

  toggleBuildInfoDropdown: clickable(SELECTORS.BUILD_INFO_DROPDOWN_TOGGLE),

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

  typeDownArrow: triggerable('keydown', SELECTORS.SNAPSHOT_LIST, {
    eventProperties: {keyCode: DOWN_ARROW_KEY},
  }),
  typeUpArrow: triggerable('keydown', SELECTORS.SNAPSHOT_LIST, {
    eventProperties: {keyCode: UP_ARROW_KEY},
  }),

  snapshotFullscreen: SnapshotViewerFull,
  isFullscreenModalVisible: isVisible(SELECTORS.SNAPSHOT_FULL_MODAL),

  clickShowSupportLink: clickable(SELECTORS.SHOW_SUPPORT_LINK),
};

export default create(BuildPage);
