import {Factory, trait} from 'ember-cli-mirage';

export default Factory.extend({
  id(i) {
    return `snapshot-${i}`;
  },
  name(i) {
    return `Exemplifying Test Snapshot That Shows Things ${i}`;
  },

  withComparison: trait({
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'default');
      const comparisonIds = snapshot.comparisonIds;
      comparisonIds.push(comparison.id);
      snapshot.comparisonIds = comparisonIds;
      snapshot.save();
    },
  }),

  noDiffs: trait({
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'same');
      const comparisonIds = snapshot.comparisonIds;
      comparisonIds.push(comparison.id);
      snapshot.comparisonIds = comparisonIds;
      snapshot.save();
    },
  }),

  withMobile: trait({
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'mobile');
      const comparisonIds = snapshot.comparisonIds;
      comparisonIds.push(comparison.id);
      snapshot.comparisonIds = comparisonIds;
      snapshot.save();
    },
  }),
});
