import {Factory, trait} from 'ember-cli-mirage';

const DEFAULT_HEAD_URL = '/images/test/bs-head.png';
const DEFAULT_LONG_HEAD_URL = '/images/test/bs-head-longer.png';
const DEFAULT_BASE_URL = '/images/test/bs-base.png';

const DEFAULT_HEAD_LOSSY_URL = '/images/test/bs-head-lossy.jpg';
const DEFAULT_LONG_HEAD_LOSSY_URL = '/images/test/bs-head-longer-lossy.jpg';
const DEFAULT_BASE_LOSSY_URL = '/images/test/bs-base-lossy.jpg';

const MOBILE_HEAD_URL = '/images/test/bs-mobile-head.png';
const MOBILE_BASE_URL = '/images/test/bs-mobile-base.png';
const MOBILE_HEAD_LOSSY_URL = '/images/test/bs-mobile-head-lossy.jpg';
const MOBILE_BASE_LOSSY_URL = '/images/test/bs-mobile-base-lossy.jpg';

const DIFF_URL = '/images/test/bs-pdiff-base-head.png';
const DIFF_LONG_URL = '/images/test/bs-pdiff-base-head-longer.png';
const MOBILE_DIFF_URL = '/images/test/bs-mobile-pdiff-base-head.png';

const DEFAULT_HEIGHT = 1485;
const DEFAULT_WIDTH = 1280;
const LONG_HEIGHT = 1814;
const LOSSY_HEIGHT = 1044;
const LOSSY_WIDTH = 900;

const MOBILE_HEIGHT = 1598;
const MOBILE_WIDTH = 320;

export default Factory.extend({
  id(i) {
    return `image-${i}`;
  },

  headScreenshotImage: trait({
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WIDTH,
    url: DEFAULT_HEAD_URL,
  }),

  headScreenshotLongImage: trait({
    height: LONG_HEIGHT,
    width: DEFAULT_WIDTH,
    url: DEFAULT_LONG_HEAD_URL,
  }),

  // ??? why is this base image?
  headScreenshotBaseImage: trait({
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WIDTH,
    url: DEFAULT_BASE_URL,
  }),

  headLossyScreenshotImage: trait({
    height: LOSSY_HEIGHT,
    width: LOSSY_WIDTH,
    url: DEFAULT_HEAD_LOSSY_URL,
  }),

  headLossyScreenshotLongImage: trait({
    height: LOSSY_HEIGHT,
    width: LOSSY_WIDTH,
    url: DEFAULT_LONG_HEAD_LOSSY_URL,
  }),

  baseScreenshotImage: trait({
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WIDTH,
    url: DEFAULT_BASE_URL,
  }),

  baseLossyScreenshotImage: trait({
    height: LOSSY_HEIGHT,
    width: LOSSY_WIDTH,
    url: DEFAULT_BASE_LOSSY_URL,
  }),

  diffImage: trait({
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WIDTH,
    url: DIFF_URL,
  }),

  diffImageLong: trait({
    height: LONG_HEIGHT,
    width: DEFAULT_WIDTH,
    url: DIFF_LONG_URL,
  }),

  randoImage: trait({
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WIDTH,
    // TODO is this image address a typo?
    url: '/images/test/-pdiff-base-head.png',
  }),

  mobileHead: trait({
    height: MOBILE_HEIGHT,
    width: MOBILE_WIDTH,
    url: MOBILE_HEAD_URL,
  }),

  mobileBase: trait({
    height: MOBILE_HEIGHT,
    width: MOBILE_WIDTH,
    url: MOBILE_BASE_URL,
  }),

  mobileLossyHead: trait({
    height: MOBILE_HEIGHT,
    width: MOBILE_WIDTH,
    url: MOBILE_HEAD_LOSSY_URL,
  }),

  mobileLossyBase: trait({
    height: MOBILE_HEIGHT,
    width: MOBILE_WIDTH,
    url: MOBILE_BASE_LOSSY_URL,
  }),

  mobileDiff: trait({
    height: MOBILE_HEIGHT,
    width: MOBILE_WIDTH,
    url: MOBILE_DIFF_URL,
  }),
});
