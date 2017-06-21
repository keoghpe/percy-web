import Ember from 'ember';
import AuthenticatedRouteMixin from 'percy-web/mixins/authenticated-route-mixin';
import ResetScrollMixin from 'percy-web/mixins/reset-scroll';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {
  params: {},
  queryParams: {
    comparisonMode: {as: 'mode'},
  },
  model(params, /*transition*/) {
    this.set('params', params);
    let buildId = this.modelFor('organization.project.builds.build').get('id');
    return this.store.findRecord('build', buildId);
  },
  afterModel(resolvedModel) {
    // Avoids race condition to get snapshots on build in components. Because the underlying
    // lookup is an async relationship, the get triggers a promise which allows route cycle
    // blocking behavior.
    return resolvedModel.get('comparisons');
  },
  setupController(controller, model) {
    this._super(...arguments);

    let params = this.get('params');

    controller.setProperties({
      build: model,
      snapshotId: params.snapshot_id,
      snapshotSelectedWidth: params.width,
      comparisonMode: params.comparisonMode
    });
  },
  actions: {
    didTransition() {
      this._super(...arguments);
      this.send('updateModalState', true);
    },
    updateComparisonMode(value) {
      this.controllerFor(this.routeName).set('comparisonMode', value.toString());
    },
    transitionRouteToWidth(snapshot, width, comparisonMode) {
      this.transitionTo(
        'organization.project.builds.build.snapshot',
        snapshot.id,
        width,
        {queryParams: {mode: comparisonMode}}
      );
    },
  },
});
