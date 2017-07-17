import Ember from 'ember';

export default Ember.Component.extend({
  build: null,
  classNames: ['FixedTopBuildHeader'],

  actions: {
    zoomIn() { this.sendAction('zoomIn'); },
    zoomOut() { this.sendAction('zoomOut'); }
  }
});
