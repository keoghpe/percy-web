import {not, alias, notEmpty} from '@ember/object/computed';
import {computed} from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['SnapshotViewer'],

  snapshot: null,
  buildContainerSelectedWidth: null,
  registerChild() {},
  unregisterChild() {},
  selectChild() {},

  snapshotSelectedWidth: computed('buildContainerSelectedWidth', {
    get() {
      return this.get('buildContainerSelectedWidth');
    },
    set(_, value) {
      return value;
    },
  }),
  selectedComparison: computed('snapshot', 'snapshotSelectedWidth', function() {
    let width = this.get('snapshotSelectedWidth');
    let comparisons = this.get('snapshot.comparisons') || [];
    return comparisons.findBy('width', parseInt(width, 10));
  }),
  classNameBindings: [
    'isFocus:SnapshotViewer--focus',
    'isExpanded::SnapshotViewer--collapsed',
    'isActionable:SnapshotViewer--actionable',
  ],
  isDefaultExpanded: true,
  isFocus: false,
  isExpanded: computed('isDefaultExpanded', function() {
    // TODO: this is just to break the binding with isDefaultExpanded,
    // fix this when migrating to later ember versions with default one-way bindings.
    return this.get('isDefaultExpanded');
  }),
  isNotExpanded: not('isExpanded'),
  isActionable: alias('isNotExpanded'),

  comparisonForSelectedWidth: computed('snapshot.comparisons', 'snapshotSelectedWidth', function() {
    let comparisons = this.get('snapshot.comparisons') || [];
    return comparisons.findBy('width', this.get('snapshotSelectedWidth'));
  }),

  hasComparisonAtSelectedWidth: notEmpty('comparisonForSelectedWidth'),

  didInsertElement() {
    this._super(...arguments);
    this.send('registerChild', this);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.send('unregisterChild', this);
  },

  click() {
    this.send('selectChild');
  },

  setAsSelected() {
    this.set('showNoDiffSnapshot', true);
    this.set('isFocus', true);

    if (this.get('isNotExpanded')) {
      this.set('isExpanded', true);
    }
  },

  actions: {
    selectChild() {
      this.get('setAsSelected').call(this);
      this.get('selectChild')(this);
    },

    registerChild() {
      this.get('registerChild')(this);
    },

    unregisterChild() {
      this.get('unregisterChild')(this);
    },

    updateSelectedWidth(value) {
      this.set('snapshotSelectedWidth', value);
      this.get('snapshotWidthChangeTriggered')();
    },

    showSnapshotFullModalTriggered(snapshotId, snapshotSelectedWidth) {
      this.showSnapshotFullModalTriggered(snapshotId, snapshotSelectedWidth);
    },
  },
});
