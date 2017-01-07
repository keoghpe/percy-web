/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'percy-web',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    fastboot: {
      hostWhitelist: ['percy.io', 'canary.percy.io', /^localhost:\d+$/, /^dev.percy.local:\d+$/]
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    pageTitle: {
      separator: ' - ',
      prepend: true,
    },
    APP: {
      // Don't use these directly; use utils.buildApiUrl instead.
      apiUrls: {
        login: '/api/auth/github',
        loginExtended: '/api/auth/github_extended',
        logout: '/api/auth/logout',

        builds: '/api/v1/builds',
        approveBuild: '/api/v1/builds/%@/approve',
        githubIntegrationRequest: '/api/v1/organizations/%@/github-integration-request',
        projectsCollection: '/api/v1/organizations/%@/projects',
        projectBuilds: '/api/v1/projects/%@/builds',
        organizationUsers: '/api/v1/organizations/%@/organization-users',
        subscription: '/api/v1/organizations/%@/subscription',
        invites: '/api/v1/organizations/%@/invites',
        user: '/api/v1/user',
      },
      githubUrls: {
        integration: 'https://github.com/integrations/percy/installations/new',
      }
    },
  };

  ENV.APP.STRIPE_PUBLISHABLE_KEY = 'pk_test_N5PmOTEMBIbsZMjbxnaWthNy';
  ENV.APP.INTERCOM_APP_ID = 'itdwmqct';
  ENV.APP.GOOGLE_ANALYTICS_ID = 'UA-63384548-3';

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV['ember-cli-mirage'] = {
      enabled: (process.env.PERCY_DEV_MIRAGE === 'yes')
    }
    ENV.APP.githubUrls = {
      integration: 'https://github.com/integrations/percy-dev/installations/new',
    }

    ENV.APP.AMPLITUDE_USERS_INSTANCE_NAME = 'Users';
    ENV.APP.AMPLITUDE_USERS_PROJECT_ID = '5a8c0499760103fcd2754fe7d5756214';
    ENV.APP.AMPLITUDE_ORGANIZATIONS_INSTANCE_NAME = 'Organizations';
    ENV.APP.AMPLITUDE_ORGANIZATIONS_PROJECT_ID = '89f8fae9aab3fccc0740237f17e43745';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.percy = {
      defaultWidths: [375, 1280]
    }
  }

  if (environment === 'production') {
    ENV.APP.STRIPE_PUBLISHABLE_KEY = 'pk_live_cmaeNcmPuMihdT3Q7QDBDMDr';
    ENV.APP.INTERCOM_APP_ID = 'm37fs4zj';
    ENV.APP.GOOGLE_ANALYTICS_ID = 'UA-63384548-1';

    ENV.APP.AMPLITUDE_USERS_INSTANCE_NAME = 'Users';
    ENV.APP.AMPLITUDE_USERS_PROJECT_ID = 'bdf4d18bc5e905549e63455b54ab40f2';
    ENV.APP.AMPLITUDE_ORGANIZATIONS_INSTANCE_NAME = 'Organizations';
    ENV.APP.AMPLITUDE_ORGANIZATIONS_PROJECT_ID = '43ed24c6891251bbbdddc310a5371afd';
  }

  return ENV;
};
