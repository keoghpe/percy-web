import Component from '@ember/component';

export default Component.extend({
  selectedWidth: null,
  comparisons: [],
  buildWidths: [],

  actions: {
    updateSelectedWidth(value) {
      if (value === parseInt(this.get('selectedWidth'))) {
        return;
      }

      this.get('updateSelectedWidth')(value);
    },
  },
});
