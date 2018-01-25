import {create, clickable, isVisible, hasClass, text, collection} from 'ember-cli-page-object';

const SELECTORS = {
  HEADER: '[data-test-SnapshotViewer-header]',
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
  scope: SELECTORS.HEADER,
  isTitleVisible: isVisible(SELECTORS.TITLE),
  titleText: text(SELECTORS.TITLE),

  isComparisonModeSwitcherVisible: isVisible(SELECTORS.COMPARISON_MODE_SWITCHER),

  isWidthSwitcherVisible: isVisible(SELECTORS.WIDTH_SWITCHER),

  widthSwitcher: {
    scope: SELECTORS.WIDTH_SWITCHER,
    buttons: collection({
      itemScope: SELECTORS.WIDTH_SWITCHER_BUTTON,
      item: {
        isActive: hasClass('is-active'),
        text: text(),
      },
    }),
  },

  isFullScreenToggleVisible: isVisible(SELECTORS.FULL_SCREEN_TOGGLE),
  clickToggleFullscreen: clickable(SELECTORS.FULL_SCREEN_TOGGLE),

  clickBaseComparisonMode: clickable(SELECTORS.COMPARISON_MODE_SWITCHER_BASE),
  clickDiffComparisonMode: clickable(SELECTORS.COMPARISON_MODE_SWITCHER_DIFF),
  clickHeadComparisonMode: clickable(SELECTORS.COMPARISON_MODE_SWITCHER_HEAD),
};

export default create(SnapshotViewerHeader);
