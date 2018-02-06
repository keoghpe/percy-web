import FactoryGuy from 'ember-data-factory-guy';
import faker from 'faker';
import {makeList, make} from 'ember-data-factory-guy';

FactoryGuy.define('organization', {
  default: {
    name: () => faker.company.companyName(),

    projects: FactoryGuy.hasMany('project'),
    versionControlIntegrations: FactoryGuy.hasMany('version-control-integration'),
    repos: FactoryGuy.hasMany('repo'),
  },
  traits: {
    withGithubIntegration: {
      versionControlIntegrations: () => {
        // TODO: This will clobber other versionControlIntegrations
        // When more integrations are added here, fix this to support them
        return [make('version-control-integration', 'github')];
      },
    },
    withRepos: {repos: () => makeList('repo', 3)},
    withProjects: {projects: () => makeList('project', 5)},
  },
});
