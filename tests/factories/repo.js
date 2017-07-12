import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('repo', {
  traits: {
    percyWeb: {
      name: 'percy-web',
      htmlUrl: 'https://github.com/percy/percy-web',
      isPrivate: 'false'
    },
  }
});
