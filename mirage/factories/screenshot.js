import {Factory, trait} from 'ember-cli-mirage';

export default Factory.extend({
  afterCreate(screenshot, server) {
    if (screenshot.image === null) {
      let image = server.create('image', 'headScreenshotImage');
      screenshot.update({image});
    }
    if (screenshot.lossyImage === null) {
      let lossyImage = server.create('image', 'headLossyScreenshotImage');
      screenshot.update({lossyImage});
    }
  },

  head: trait({
    afterCreate(screenshot, server) {
      const image = server.create('image', 'headScreenshotImage');
      const lossyImage = server.create('image', 'headLossyScreenshotImage');

      screenshot.update({image, lossyImage});
    },
  }),

  base: trait({
    afterCreate(screenshot, server) {
      const image = server.create('image', 'baseScreenshotImage');
      const lossyImage = server.create('image', 'baseLossyScreenshotImage');

      screenshot.update({image, lossyImage});
    },
  }),

  mobileHead: trait({
    afterCreate(screenshot, server) {
      const image = server.create('image', 'mobileHead');
      const lossyImage = server.create('image', 'mobileLossyHead');

      screenshot.update({image, lossyImage});
    },
  }),

  mobileBase: trait({
    afterCreate(screenshot, server) {
      const image = server.create('image', 'mobileBase');
      const lossyImage = server.create('image', 'mobileLossyBase');

      screenshot.update({image, lossyImage});
    },
  }),
});
