import {visitable, collection, create} from 'ember-cli-page-object';
import {BuildCard} from 'percy-web/tests/pages/components/build-card';

const SELECTORS = {
  PROJECT_CONTAINER: '[data-test-project-container]',
};

const ProjectPage = {
  scope: SELECTORS.PROJECT_CONTAINER,

  visitProject: visitable('/:orgSlug/:projectSlug'),

  builds: collection({
    itemScope: BuildCard.scope,
    item: BuildCard,
  }),

  finishedBuilds: {
    isDescriptor: true,
    get() {
      return this.builds().filter(build => !!build.isFinished);
    },
  },
};

export default create(ProjectPage);
