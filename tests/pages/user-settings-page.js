import {visitable, create} from 'ember-cli-page-object';
import {ProfileEdit} from './components/forms/profile-edit';
import {ConnectedAccountsPanel} from './components/connected-accounts-panel';

const UserSettingsPage = {
  visitUserSettingsPage: visitable('/settings'),
  profileForm: ProfileEdit,

  visitConnectedAccountsPage: visitable('/settings/connected-accounts'),
  connectedAccountsPanel: ConnectedAccountsPanel,
};

export default create(UserSettingsPage);
