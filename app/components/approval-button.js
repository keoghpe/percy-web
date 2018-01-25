import {alias} from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  build: null,
  isApproved: alias('build.isApproved'),
  isLoading: false,
  tagName: 'button',
  classNames: ['approval-button btn btn-md btn-success ml-2 px-2 pl-7 flex align-center'],
  classNameBindings: ['classes', 'isLoading:is-loading', 'isApproved:is-approved'],

  click() {
    this.set('isLoading', true);
    const snapshotIds = this.get('build.snapshots').mapBy('id');
    this.createReview(this.get('build.id'), snapshotIds)
      .then(() => {
        return this.get('build').reloadAll();
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  },
});
