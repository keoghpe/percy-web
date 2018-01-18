import DS from 'ember-data';

export default DS.Model.extend({
  comparisons: DS.hasMany('comparisons', {
    async: false,
    inverse: 'headSnapshot',
  }),
  name: DS.attr(),
  build: DS.belongsTo('build', {async: true}),
  screenshots: DS.hasMany('screenshot', {async: false}),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  reviewState: DS.attr(),
  reviewStateReason: DS.attr(),
});
