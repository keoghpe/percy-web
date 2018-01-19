import {computed} from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  selectedWidth: null,
  width: null,
  comparisons: [],
  tagName: 'button',
  classNames: ['btn'],
  classNameBindings: [
    'isSelected:is-active:',
    'matchingComparison::is-disabled',
    'matchingComparison.isDifferent:has-diffs',
  ],

  matchingComparison: computed('comparisons', 'width', function() {
    let comparisons = this.get('comparisons') || [];
    return comparisons.findBy('width', this.get('width'));
  }),

  isSelected: computed('selectedWidth', 'width', function() {
    return parseInt(this.get('selectedWidth'), 10) === this.get('width');
  }),

  click() {
    this.get('updateSelectedWidth')(this.get('width'));
  },
});
