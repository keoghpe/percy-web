import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('build', {
  sequences: {
    buildNumber: (num) => num,
  },
  default: {
    buildNumber: FactoryGuy.generate('buildNumber'),
    state: 'pending',
    branch: 'master',
    createdAt: () => new Date(),
    updatedAt: () => new Date(),
  },
  traits: {
    finished: {state: 'finished'},
    pending: {state: 'pending'},
    processing: {state: 'processing'},
    failed: {state: 'failed'},
    expired: {state: 'expired'},
    hasDiffs: {
      totalComparisonsDiff: 10,
      totalComparisonsFinished: 15
    },
    noDiffs: {
      totalComparisonsDiff: 0,
      totalComparisonsFinished: 12
    },
    missingResources: {failureReason: 'missing_resources'},
    noSnapshots: {failureReason: 'no_snapshots'},
    renderTimeout: {failureReason: 'render_timeout'},
  }
});
