import {create, clickable, isVisible, text, collection} from 'ember-cli-page-object';

const selectors = {
  COMPARISON_ICON: '[data-test-SnapshotViewer-comparisonIcon]',
  TITLE: '[data-test-SnapshotViewer-title]',
  WIDTH_SWITCHER: '[data-test-SnapshotViewer-widthSwitcher]',
  WIDTH_SWITCHER_BUTTON: '[data-test-ComparisonSwitcher-button]',
  FULL_SCREEN_TOGGLE: '[data-test-SnapshotViewer-toggleFullScreen]',
  COMPARISON_MODE_SWITCHER: '[data-test-SnapshotViewer-comparison-mode-switcher]',
  COMPARISON_MODE_SWITCHER_BASE: '[data-test-ComparisonModeSwitcher-base]',
  COMPARISON_MODE_SWITCHER_DIFF: '[data-test-ComparisonModeSwitcher-diff]',
  COMPARISON_MODE_SWITCHER_HEAD: '[data-test-ComparisonModeSwitcher-head]',
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
  clickToggleFullscreen: clickable(selectors.FULL_SCREEN_TOGGLE),

  clickBaseComparisonMode: clickable(selectors.COMPARISON_MODE_SWITCHER_BASE),
  clickDiffComparisonMode: clickable(selectors.COMPARISON_MODE_SWITCHER_DIFF),
  clickHeadComparisonMode: clickable(selectors.COMPARISON_MODE_SWITCHER_HEAD),
};

export default create(SnapshotViewerHeader);
