import FactoryGuy from 'ember-data-factory-guy';
import {make} from 'ember-data-factory-guy';

FactoryGuy.define('snapshot', {
  default: {
    name: () => 'Snapshot',
    createdAt: () => new Date(),
    updatedAt: () => new Date(),

    comparisons: FactoryGuy.hasMany('comparison'),
    build: FactoryGuy.belongsTo('build'),
    // screenshots: FactoryGuy.belongsTo('screenshot')
  },
  traits: {
    withBuild: {
      build: () => {
        return make('build');
      },
    },
    withComparisons: {},
    withScreenshots: {},
    completeExample: {},
  },
});
