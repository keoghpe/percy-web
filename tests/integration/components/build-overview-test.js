/* jshint expr:true */
import {setupComponentTest} from 'ember-mocha';
import {beforeEach, it, describe} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make, manualSetup}  from 'ember-data-factory-guy';

describe('Integration: BuildOverviewComponent', function() {
  setupComponentTest('build-overview', {
    integration: true
  });

  beforeEach(function() {
    manualSetup(this.container);
  });

  it('renders in pending state', function() {
    let build = make('build', 'pending');
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test);
  });

  it('renders in processing state', function() {
    let build = make('build', 'processing');
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test);
  });

  it('renders in finished state with diffs', function() {
    let build = make('build', 'finished', 'hasDiffs');
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test);
  });

  it('renders in finished state with no diffs', function() {
    let build = make('build', 'finished', 'noDiffs');
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test);
  });

  it('renders in failed state with missing resources', function() {
    let build = make('build', 'failed', 'missingResources');
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test);
  });

  it('renders in failed state with no snapshots', function() {
    let build = make('build', 'failed', 'noSnapshots');
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test);
  });

  it('renders in failed state with render timeout', function() {
    let build = make('build', 'failed', 'renderTimeout');
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test);
  });

  it('renders in expired state', function() {
    let build = make('build', 'expired');
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test);
  });

});
