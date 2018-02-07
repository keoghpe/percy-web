import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {hash} from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    activeSnapshotId: {as: 'snapshot', replace: true},
  },
  model(params) {
    // TODO can we include snapshots in the build query?
    const build = this.store.findRecord('build', params.build_id);
    const snapshots = build.then(build => {
      return build.get('snapshots');
    });

    return hash({
      build,
      snapshots,
    });
  },

  afterModel(model) {
    let build = model.build ? model.build : model;
    build.reload().then(build => {
      if (!build.get('isExpired')) {
        // Force reload because these async-hasMany's won't reload themselves if the build's
        // state has changed, such as going from processing --> finished and we don't want to show
        // fewer comparisons than there are.
        build.get('snapshots').reload();
      }
    });
  },
  resetController(controller, isExiting) {
    if (isExiting) {
      // Clear the query parameter when exiting the route.
      controller.set('activeSnapshotId', undefined);
    }
  },
  actions: {
    didTransition() {
      this._super.apply(this, arguments);

      let model = this.modelFor(this.routeName);
      let build = model.build ? model.build : model;

      let organization = build.get('project.organization');
      let eventProperties = {
        project_id: build.get('project.id'),
        project_slug: build.get('project.slug'),
        build_id: build.get('id'),
        state: build.get('state'),
      };
      this.analytics.track('Build Viewed', organization, eventProperties);
    },
    updateActiveSnapshotId(snapshotId) {
      this.set('controller.activeSnapshotId', snapshotId);
    },
    updateModalState(state) {
      this.get('currentModel').build.set('isShowingModal', state);
    },
    openSnapshotFullModal(snapshotId, snapshotSelectedWidth) {
      let build = this.modelFor(this.routeName).build;
      let organization = build.get('project.organization');
      let eventProperties = {
        project_id: build.get('project.id'),
        project_slug: build.get('project.slug'),
        build_id: build.get('id'),
        snapshot_id: snapshotId,
      };
      this.analytics.track('Snapshot Fullscreen Selected', organization, eventProperties);

      this.send('updateModalState', true);
      this.transitionTo(
        'organization.project.builds.build.snapshot',
        snapshotId,
        snapshotSelectedWidth,
        {
          queryParams: {mode: 'diff'},
        },
      );
    },
    closeSnapshotFullModal(buildId, snapshotId) {
      this.send('updateModalState', false);
      this.transitionTo('organization.project.builds.build', buildId, {
        queryParams: {activeSnapshotId: snapshotId},
      });
    },
  },
});
