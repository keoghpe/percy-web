import DS from 'ember-data';

export default DS.Model.extend({
  // buildId: DS.attr(),
  // snapshotIds: DS.attr(),
  build: DS.belongsTo('build'),
  snapshots: DS.hasMany('snapshot'),
});
