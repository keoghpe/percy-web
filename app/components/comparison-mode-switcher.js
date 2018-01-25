import {alias, empty} from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  classNameBindings: ['isHidden:is-invisible'],
  comparison: null,
  isHidden: empty('comparison'),
  wasAdded: alias('comparison.wasAdded'),
  comparisonMode: null,
  updateComparisonMode: null,
});
