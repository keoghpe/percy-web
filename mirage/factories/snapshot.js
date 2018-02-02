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

  withMobileComparison: trait({
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'mobile');
      const comparisons = snapshot.comparisons || [];
      comparisons.push(comparison);

      snapshot.update({comparisons});
    },
  }),

  gotLonger: trait({
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'gotLonger');
      const comparisons = snapshot.comparisons || [];
      comparisons.push(comparison);

      snapshot.update({comparisons});
    },
  }),

  gotShorter: trait({
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'gotShorter');
      const comparisons = snapshot.comparisons || [];
      comparisons.push(comparison);

      snapshot.update({comparisons});
    },
  }),

  wasAdded: trait({
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'wasAdded');
      const comparisons = snapshot.comparisons || [];
      comparisons.push(comparison);

      snapshot.update({comparisons});
    },
  }),

  wasRemoved: trait({
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'wasRemoved');
      const comparisons = snapshot.comparisons || [];
      comparisons.push(comparison);

      snapshot.update({comparisons});
    },
  }),

  withMobileAdded: trait({
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'mobileAdded');
      const comparisons = snapshot.comparisons || [];
      comparisons.push(comparison);

      snapshot.update({comparisons});
    },
  }),

  withMobileRemoved: trait({
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'mobileRemoved');
      const comparisons = snapshot.comparisons || [];
      comparisons.push(comparison);

      snapshot.update({comparisons});
    },
  }),

  noDiffs: trait({
    // afterCreate(snapshot, server) {
    //   const comparison = server.create('comparison', 'default');
    //   const comparisonIds = snapshot.comparisonIds;
    //   comparisonIds.push(comparison.id);
    //   snapshot.comparisonIds = comparisonIds;
    //   snapshot.save();
    // },
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'same');
      const comparisonIds = snapshot.comparisonIds;
      comparisonIds.push(comparison.id);
      snapshot.comparisonIds = comparisonIds;
      snapshot.save();
      snapshot.update({name: 'no diffs snapshot'});
    },
  }),

  // withMobileLonger: trait({
  //   afterCreate(snapshot, server) {
  //     const comparison = server.create('comparison')
  //   }
  // })

  // longMessage: {message: () => faker.lorem.sentence(30)},
  // noSpacesMessage: {message: () => faker.lorem.slug},
});
