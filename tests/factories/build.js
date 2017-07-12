import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('build', {
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
    hasPullRequest: {
      isPullRequest: 'true',
      pullRequestNumber: '123',
      pullRequestTitle: 'New Build Header Design',
    },
    hasBranch: {branch: 'new-build-header-design'},
    isGithubLinked: {repo: FactoryGuy.belongsTo('repo', 'percyWeb')}
  }
});
