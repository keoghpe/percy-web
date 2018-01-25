import FactoryGuy from 'ember-data-factory-guy';
import moment from 'moment';

FactoryGuy.define('comparison', {
  default: {
    startedProcessingAt: () => moment().subtract(65, 'seconds'),
    finishedProcessingAt: () => moment().subtract(23, 'seconds'),

    headScreenshot: f => {
      // TODO: make the screenshot and image a real FactoryGuy model instead of POJO
      return {id: f.id, image: {id: f.id, url: '/head/screenshot/url', width: 375, height: 500}};
    },
    baseScreenshot: f => {
      // TODO: make the screenshot and image a real FactoryGuy model instead of POJO
      return {id: f.id, image: {id: f.id, url: '/base/screenshot/url', width: 375, height: 500}};
    },
    diffImage: f => {
      // TODO: make the screenshot and image a real FactoryGuy model instead of POJO
      return {id: f.id, image: {id: f.id, url: '/diff/image/url', width: 375, height: 500}};
    },
  },
});
