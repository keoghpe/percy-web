import Ember from 'ember';

export default Ember.Component.extend({
  build: null,
  classes: null,

  classNames: ['BuildOverview'],
  classNameBindings: [
    'classes',

    'build.isPending:BuildOverview--pending',
    'build.isProcessing:BuildOverview--processing',
    'build.isFinished:BuildOverview--finished',
    'build.isFailed:BuildOverview--failed',
    'build.isExpired:BuildOverview--expired',
    'build.isApproved:BuildOverview--approved',
    'build.hasDiffs:BuildOverview--hasDiffs',
  ],
});
