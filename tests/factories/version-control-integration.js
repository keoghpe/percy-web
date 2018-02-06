import FactoryGuy from 'ember-data-factory-guy';
import faker from 'faker';

FactoryGuy.define('version-control-integration', {
  default: {},
  traits: {
    github: {
      githubInstallationId: () => faker.random.number(),
      integrationType: 'github',
    },
  },
});
