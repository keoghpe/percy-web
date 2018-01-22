import {create, isVisible, text, collection} from 'ember-cli-page-object';

const selectors = {
  COMPARISON_ICON: '[data-test-SnapshotViewer-comparisonIcon]',
  TITLE: '[data-test-SnapshotViewer-title]',
  WIDTH_SWITCHER: '[data-test-SnapshotViewer-widthSwitcher]',
  WIDTH_SWITCHER_BUTTON: '[data-test-ComparisonSwitcher-button]',
  FULL_SCREEN_TOGGLE: '[data-test-SnapshotViewer-showFullScreen]',
  COMPARISON_MODE_SWITCHER: '[data-test-SnapshotViewer-comparison-mode-switcher]',
};

export const SnapshotViewerHeader = {
  isTitleVisible: isVisible(selectors.TITLE),
  titleText: text(selectors.TITLE),

  isComparisonModeSwitcherVisible: isVisible(selectors.COMPARISON_MODE_SWITCHER),

  isWidthSwitcherVisible: isVisible(selectors.WIDTH_SWITCHER),
  widthSwitcher: {
    scope: selectors.WIDTH_SWITCHER,

    buttons: collection({
      itemScope: selectors.WIDTH_SWITCHER_BUTTON,
      item: {
        text: text(),
      },
    }),
  },

  isFullScreenToggleVisible: isVisible(selectors.FULL_SCREEN_TOGGLE),
};

export default create(SnapshotViewerHeader);
