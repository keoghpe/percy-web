import DS from 'ember-data';
import {notEmpty} from '@ember/object/computed';

export default DS.Model.extend({
  organization: DS.belongsTo('organization'),
  githubInstallationId: DS.attr(),
  githubAccountAvatarUrl: DS.attr(),
  githubHtmlUrl: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  isGithubIntegration: notEmpty('githubInstallationId'),
});
