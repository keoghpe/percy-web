import FactoryGuy from 'ember-data-factory-guy';
import {make} from 'ember-data-factory-guy';
import {TEST_BUILD_WIDTHS} from 'percy-web/tests/factories/comparison';

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
    withComparisons: {
      comparisons: () => {
        return TEST_BUILD_WIDTHS.map(width => {
          return make('comparison', {width});
        });
      },
    },

    new: {
      comparisons: () => {
        return TEST_BUILD_WIDTHS.map(width => {
          return make('comparison', 'new', {width});
        });
      },
    },

    withScreenshots: {},
    completeExample: {},
  },
});
