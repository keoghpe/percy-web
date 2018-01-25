import {isVisible, visitable, create} from 'ember-cli-page-object';
import {ConnectedAccountsPanel} from 'percy-web/tests/pages/components/connected-accounts-panel';
import {AccountNew} from 'percy-web/tests/pages/components/forms/account-new';

const SELECTORS = {
  EMAIL_PASSWORD_IDENTITY_FORM: '[data-test-account-new-form]',
};

export const ConnectedAccountsPage = {
  panel: ConnectedAccountsPanel,
  accountNewForm: AccountNew,

  visitConnectedAccounts: visitable('/settings/connected-accounts'),

  isAddAuth0IdentityFormVisible: isVisible(SELECTORS.EMAIL_PASSWORD_IDENTITY_FORM),
};

export default create(ConnectedAccountsPage);
