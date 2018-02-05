import {create, hasClass} from 'ember-cli-page-object';

const SELECTORS = {
  BUILD_CARD: '[data-test-build-card]',
  BUILD_STATE: '[data-test-build-card-state]',
};

export const BuildCard = {
  scope: SELECTORS.BUILD_CARD,

  isFinished: hasClass('is-finished'),
};

export default create(BuildCard);
