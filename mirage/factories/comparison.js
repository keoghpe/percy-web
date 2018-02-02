import {Factory, trait} from 'ember-cli-mirage';
import moment from 'moment';

const DEFAULT_WIDTH = 1280;
const HIGH_DIFF_RATIO = 0.62;
const LOW_DIFF_RATIO = 0.42;
const NO_DIFF_RATIO = 0.0;

function conditionallyAddHeadSnapshot(comparison, server) {
  if (!comparison.headSnapshot) {
    const headSnapshot = server.create('snapshot');
    comparison.update({headSnapshot});
  }
  return comparison;
}

export default Factory.extend({
  id(i) {
    return `comparison-${i}`;
  },
  startedProcessingAt() {
    return moment().subtract(65, 'seconds');
  },
  finishedProcessingAt() {
    return moment().subtract(23, 'seconds');
  },

  width: DEFAULT_WIDTH,
  diffRatio: HIGH_DIFF_RATIO,

  default: trait({
    afterCreate(comparison, server) {
      const diffRatio = LOW_DIFF_RATIO;
      const headScreenshot = server.create('screenshot', 'head');
      const baseScreenshot = server.create('screenshot', 'base');
      const diffImage = server.create('image', 'diffImage');
      // comparison = conditionallyAddHeadSnapshot(comparison, server);

      comparison.update({
        diffRatio,
        headScreenshot,
        baseScreenshot,
        diffImage,
      });
    },
  }),

  different: trait({
    afterCreate(comparison, server) {
      const diffRatio = LOW_DIFF_RATIO;
      const headScreenshot = server.create('screenshot', 'head');
      const baseScreenshot = server.create('screenshot', 'base');
      const diffImage = server.create('image', 'diffImage');
      comparison = conditionallyAddHeadSnapshot(comparison, server);

      comparison.update({
        diffRatio,
        headScreenshot,
        baseScreenshot,
        diffImage,
      });
    },
  }),

  gotLonger: trait({
    afterCreate(comparison, server) {
      const headScreenshot = server.create('screenshot', 'headLong');
      const baseScreenshot = server.create('screenshot', 'baseLong');
      const diffImage = server.create('image', 'diffImageLong');
      comparison = conditionallyAddHeadSnapshot(comparison, server);

      comparison.update({
        headScreenshot,
        baseScreenshot,
        diffImage,
      });
    },
  }),

  gotShorter: trait({
    afterCreate(comparison, server) {
      const headScreenshot = server.create('screenshot', 'base');
      const baseScreenshot = server.create('screenshot', 'headLong');
      const diffImage = server.create('image', 'diffImageLong');
      comparison = conditionallyAddHeadSnapshot(comparison, server);

      comparison.update({
        headScreenshot,
        baseScreenshot,
        diffImage,
      });
    },
  }),

  wasAdded: trait({
    afterCreate(comparison, server) {
      comparison = conditionallyAddHeadSnapshot(comparison, server);
      const headScreenshot = comparison.headScreenshot || server.create('screenshot', 'head');
      const baseScreenshot = null;

      comparison.update({
        headScreenshot,
        baseScreenshot,
      });
    },
  }),

  wasRemoved: trait({
    afterCreate(comparison, server) {
      const headScreenshot = null;
      const baseScreenshot = comparison.baseSnapshot || server.create('screenshot', 'base');

      comparison.update({
        headScreenshot,
        baseScreenshot,
      });
    },
  }),

  same: trait({
    afterCreate(comparison, server) {
      const diffRatio = NO_DIFF_RATIO;
      const headScreenshot = server.create('screenshot', 'head');
      const baseScreenshot = server.create('screenshot', 'base');
      const diffImage = server.create('image', 'randoImage');
      comparison = conditionallyAddHeadSnapshot(comparison, server);

      comparison.update({
        diffRatio,
        headScreenshot,
        baseScreenshot,
        diffImage,
      });
    },
  }),

  differentNoMobile: trait({
    afterCreate(comparison, server) {
      const diffRatio = LOW_DIFF_RATIO;
      const headScreenshot = server.create('screenshot', 'head');
      const baseScreenshot = server.create('screenshot', 'base');
      const diffImage = server.create('image', 'diffImage');
      comparison = conditionallyAddHeadSnapshot(comparison, server);

      comparison.update({
        diffRatio,
        headScreenshot,
        baseScreenshot,
        diffImage,
      });
    },
  }),

  mobile: trait({
    afterCreate(comparison, server) {
      const width = 320;
      const diffRatio = 0.32;
      const headScreenshot = server.create('screenshot', 'mobileHead');
      const baseScreenshot = server.create('screenshot', 'mobileBase');
      const diffImage = server.create('image', 'mobileDiff');
      comparison = conditionallyAddHeadSnapshot(comparison, server);

      comparison.update({
        width,
        diffRatio,
        headScreenshot,
        baseScreenshot,
        diffImage,
      });
    },
  }),

  mobileAdded: trait({
    afterCreate(comparison, server) {
      const width = 320;
      const headScreenshot = server.create('screenshot', 'mobileHead');
      const baseScreenshot = null;
      comparison = conditionallyAddHeadSnapshot(comparison, server);

      comparison.update({
        width,
        headScreenshot,
        baseScreenshot,
      });
    },
  }),

  mobileRemoved: trait({
    afterCreate(comparison, server) {
      const width = 320;
      const headScreenshot = null;
      const baseScreenshot = comparison.baseSnapshot || server.create('screenshot', 'mobileBase');

      comparison.update({
        width,
        headScreenshot,
        baseScreenshot,
      });
    },
  }),
});
