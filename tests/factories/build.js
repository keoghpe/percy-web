import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('build', {
  traits: {
    finished: {state: 'finished'},
    pending: {state: 'pending'},
    processing: {state: 'processing'},
    failed: {state: 'failed'},
    expired: {state: 'expired'},
  }
});
