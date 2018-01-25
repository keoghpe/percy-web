import {alias} from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  isApproved: alias('snapshot.isApproved'),
  isLoading: false,

  actions: {
    approveSnapshot() {
      this.set('isLoading', true);
      this.createReview([this.get('snapshot.id')])
        .then(() => {
          // TODO can this be done by responding from backend?
          this.set('snapshot.reviewState', 'approved');
          this.set('snapshot.reviewStateReason', 'user_approved');
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
  },
});
