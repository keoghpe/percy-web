/* eslint-disable no-unused-expressions */
import {expect} from 'chai';
import {it, describe} from 'mocha';
import {setupTest} from 'ember-mocha';

describe('AnalyticsService', function() {
  setupTest('service:analytics', {
    needs: ['service:session', 'service:adminMode', 'service:currentUser']
  });

  // Replace this with your real tests.
  it('exists', function() {
    let service = this.subject();
    expect(service).to.be.ok;
  });
});
