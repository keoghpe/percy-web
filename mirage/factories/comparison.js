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

  default: trait({
    afterCreate(comparison, server) {
      const diffRatio = LOW_DIFF_RATIO;
      const headScreenshot = server.create('screenshot', 'head');
      const baseScreenshot = server.create('screenshot', 'base');
      const diffImage = server.create('image', 'diffImage');

      comparison.update({
        diffRatio,
        headScreenshot,
        baseScreenshot,
        diffImage,
      });
    },
  }),

  same: trait({
    afterCreate(comparison, server) {
      const diffRatio = NO_DIFF_RATIO;
      const headScreenshot = server.create('screenshot', 'head');
      const baseScreenshot = server.create('screenshot', 'base');
      const diffImage = server.create('image', 'noDiffImage');

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
      const headScreenshot = server.create('screenshot', 'mobileHead');
      const baseScreenshot = server.create('screenshot', 'mobileBase');
      const diffImage = server.create('image', 'mobileDiff');

      comparison.update({
        width,
        headScreenshot,
        baseScreenshot,
        diffImage,
      });
    },
  }),
});
