/* jshint expr:true */
import {setupComponentTest} from 'ember-mocha';
import {beforeEach, it, describe} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make, manualSetup}  from 'ember-data-factory-guy';

describe('Integration: BuildOverviewInfoComponent', function() {
  setupComponentTest('build-overview-info', {
    integration: true
  });

  beforeEach(function() {
    manualSetup(this.container);
  });

  it('renders with pull request', function() {
    let build = make('build', 'isGithubLinked', 'hasPullRequest');
    this.set('build', build);

    this.render(hbs`{{build-overview-info build=build}}`);
    percySnapshot(this.test);
  });

  it('renders with github branch', function() {
    let build = make('build', 'isGithubLinked', 'hasBranch');
    this.set('build', build);

    this.render(hbs`{{build-overview-info build=build}}`);
    percySnapshot(this.test);
  });

  it('renders with branch', function() {
    let build = make('build', 'hasBranch');
    this.set('build', build);

    this.render(hbs`{{build-overview-info build=build}}`);
    percySnapshot(this.test);
  });
});
