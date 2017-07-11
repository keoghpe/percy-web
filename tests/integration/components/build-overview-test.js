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

  let snapshotOptions = {minimumHeight: 100};

  beforeEach(function() {
    manualSetup(this.container);
  });

  it('renders in pending state', function() {
    let build = make('build', 'pending');
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test, snapshotOptions);
  });

  it('renders in processing state', function() {
    let build = make('build', 'processing');
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test, snapshotOptions);
  });

  it('renders in finished state', function() {
    let build = make('build', 'finished');
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test, snapshotOptions);
  });

  it('renders in finished state with diffs', function() {
    let build = make('build', 'finished', 'hasDiffs');
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test, snapshotOptions);
  });

  it('renders in finished state with no diffs', function() {
    let build = make('build', 'finished', 'noDiffs');
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test, snapshotOptions);
  });

  it('renders in failed state', function() {
    let build = make('build', 'failed');
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test, snapshotOptions);
  });

  it('renders in expired state', function() {
    let build = make('build', 'expired');
    this.set('build', build);

    this.render(hbs`{{build-overview build=build}}`);
    percySnapshot(this.test, snapshotOptions);
  });

});
