import {Factory, trait} from 'ember-cli-mirage';
import moment from 'moment';

const DEFAULT_WIDTH = 1280;
const HIGH_DIFF_RATIO = 0.62;
const LOW_DIFF_RATIO = 0.42;
const NO_DIFF_RATIO = 0.0;

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

  includeBaseScreenshot: true,
  includePdiff: true,
  includeHeadScreenshot: true,
  includeMobileScreenshot: false,

  different: trait({
    afterCreate(comparison, server) {
      const diffRatio = LOW_DIFF_RATIO;
      const headScreenshot = server.create('screenshot', 'head');
      const baseScreenshot = server.create('screenshot', 'base');
      const diffImage = server.create('image', 'diffImage');
      const headSnapshot = server.create('snapshot');

      comparison.update({
        diffRatio,
        headScreenshot,
        baseScreenshot,
        diffImage,
        headSnapshot,
      });
    },
  }),

  gotLonger: trait({
    afterCreate(comparison, server) {
      const headScreenshot = server.create('screenshot', 'headLong');
      const baseScreenshot = server.create('screenshot', 'baseLong');
      const diffImage = server.create('image', 'diffImageLong');
      const headSnapshot = server.create('snapshot');

      comparison.update({
        headScreenshot,
        baseScreenshot,
        diffImage,
        headSnapshot,
      });
    },
  }),

  gotShorter: trait({
    afterCreate(comparison, server) {
      const headScreenshot = server.create('screenshot', 'base');
      const baseScreenshot = server.create('screenshot', 'headLong');
      const diffImage = server.create('image', 'diffImageLong');
      const headSnapshot = server.create('snapshot');

      comparison.update({
        headScreenshot,
        baseScreenshot,
        diffImage,
        headSnapshot,
      });
    },
  }),

  wasAdded: trait({
    afterCreate(comparison, server) {
      const headScreenshot = server.create('screenshot', 'head');
      const headSnapshot = server.create('snapshot');

      comparison.update({headScreenshot, headSnapshot});
    },
  }),

  wasRemoved: trait({
    afterCreate(comparison, server) {
      const baseScreenshot = server.create('screenshot', 'base');

      comparison.update({
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
      const headSnapshot = server.create('snapshot');

      comparison.update({
        diffRatio,
        headScreenshot,
        baseScreenshot,
        diffImage,
        headSnapshot,
      });
    },
  }),

  differentNoMobile: trait({
    afterCreate(comparison, server) {
      const diffRatio = LOW_DIFF_RATIO;
      const headScreenshot = server.create('screenshot', 'head');
      const baseScreenshot = server.create('screenshot', 'base');
      const diffImage = server.create('image', 'diffImage');
      const headSnapshot = server.create('snapshot');

      comparison.update({
        diffRatio,
        headScreenshot,
        baseScreenshot,
        diffImage,
        headSnapshot,
      });
    },
  }),

  mobile: trait({
    afterCreate(comparison, server) {
      const diffRatio = 0.32;
      const headScreenshot = server.create('screenshot', 'mobileHead');
      const baseScreenshot = server.create('screenshot', 'mobileBase');
      const diffImage = server.create('image', 'mobileDiff');
      const headSnapshot = server.create('snapshot');

      comparison.update({
        diffRatio,
        headScreenshot,
        baseScreenshot,
        diffImage,
        headSnapshot,
      });
    },
  }),

  mobileAdded: trait({
    afterCreate(comparison, server) {
      const headScreenshot = server.create('screenshot', 'mobileHead');
      const headSnapshot = server.create('snapshot');

      comparison.update({
        headScreenshot,
        headSnapshot,
      });
    },
  }),
});
