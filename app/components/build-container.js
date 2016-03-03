import Ember from 'ember';

export default Ember.Component.extend({
  build: null,
  classNames: ['BuildContainer'],
  selectedWidths: [1280],
  selectedNumColumns: 4,
  restoreSelectedModeColumns: function() {
    let numColumns = localStorage.getItem('numColumns');

    // Cleanup bad data (not a number) in localStorage.
    if (numColumns && Number(numColumns) === numColumns && numColumns % 1 !== 0) {
      localStorage.deleteItem('numColumns');
      return;
    }
    if (numColumns) {
      this.send('selectNumColumns', parseInt(numColumns))
    }
  }.on('init'),
  actions: {
    updateSelectedWidths: function(widths) {
      this.set('selectedWidths', widths);
    },
    selectNumColumns: function(numColumns) {
      this.set('selectedNumColumns', numColumns);
      localStorage.setItem('numColumns', numColumns);
    },
  },
});
