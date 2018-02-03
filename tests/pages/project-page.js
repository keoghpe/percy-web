import {visitable, collection, create, hasClass} from 'ember-cli-page-object';

const SELECTORS = {
  PROJECT_CONTAINER: '[data-test-project-container]',
  BUILD_CARD: '[data-test-build-card]',
  // TODO: goes in build-card page object
  BUILD_STATE: '[data-test-build-state]',
};

const ProjectPage = {
  scope: SELECTORS.PROJECT_CONTAINER,

  visitProject: visitable('/:orgSlug/:projectSlug'),

  builds: collection({
    itemScope: SELECTORS.BUILD_CARD,
    // TODO make build-card page object
    item: {
      isFinished: hasClass('is-finished'),
    },
  }),

  finishedBuilds: {
    isDescriptor: true,
    get() {
      return this.builds().filter(build => !!build.isFinished);
    },
  },
};

export default create(ProjectPage);
