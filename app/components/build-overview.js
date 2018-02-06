import Component from '@ember/component';

export default Component.extend({
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

  showSupport() {},
});
