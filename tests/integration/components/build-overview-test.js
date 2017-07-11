/* jshint expr:true */
import {setupComponentTest} from 'ember-mocha';
import {
  beforeEach,
  afterEach,
  it,
  describe
} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {startMirage} from 'percy-web/initializers/ember-cli-mirage';

describe('Integration: BuildOverviewComponent', function() {
  setupComponentTest('build-overview', {
    integration: true
  });

  beforeEach(function() {
    this.server = startMirage();
  });

  afterEach(function() {
    this.server.shutdown();
  });

  it('renders in pending state', function() {
    let build = server.create('build', {state: 'pending'});
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test);
  });

  it('renders in processing state', function() {
    let build = server.create('build', {state: 'processing'});
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test);
  });

  it('renders in finished state', function() {
    let build = server.create('build', {state: 'finished'});
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test);
  });

  it('renders in failed state', function() {
    let build = server.create('build', {state: 'failed'});
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test);
  });

  it('renders in expired state', function() {
    let build = server.create('build', {state: 'expired'});
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test);
  });

  it('renders in approved state', function() {
    let build = server.create('build', {state: 'approved'});
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test);
  });
});
