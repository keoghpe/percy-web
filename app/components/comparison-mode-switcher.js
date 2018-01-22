import {alias} from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  wasAdded: alias('comparison.wasAdded'),
  comparison: null,
  comparisonMode: null,
  updateComparisonMode: null,
});
