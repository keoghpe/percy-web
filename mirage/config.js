import Mirage from 'ember-cli-mirage';
import config from '../config/environment';

export default function() {
  this.passthrough('http://api.amplitude.com');

  this.get('/api/auth/logout',function(schema/*, request */) {
    let user = schema.users.findBy({_currentLoginInTest: true});
    if (user) {
      user.update({_currentLoginInTest: false});
    }
    return new Mirage.Response(200, {}, {success: true});
  });

  this.namespace = '/api/v1';

  this.get('/user', function(schema/*, request*/) {
    let user = schema.users.findBy({_currentLoginInTest: true});
    if (user) {
      return user;
    } else {
      return new Mirage.Response(401, {}, {
        errors: [
          {
            status: 'unauthorized',
            detail: 'Authentication required.'
          }
        ]
      });
    }
  });
  this.get('/organizations/:slug', function (schema, request) {
    return schema.organizations.findBy({slug: request.params.slug});
  });
  this.patch('/organizations/:slug', function (schema, request) {
    let attrs = this.normalizedRequestAttrs();
    if (!attrs.slug.match(/^[a-zA-Z][a-zA-Z_]*[a-zA-Z]$/)) {
      return new Mirage.Response(400, {}, {
        errors: [
          {
            status: 'bad_request'
          },
          {
            source: {
              pointer: '/data/attributes/slug'
            },
            detail: 'Slug must only contain letters, numbers, dashes,' +
                    ' and cannot begin or end with a dash.'
          }
        ]
      });
    }
    let organization = schema.organizations.findBy({slug: request.params.slug});
    organization.update(attrs);
    return organization;
  });
  this.post('/organizations', function (schema) {
    let attrs = this.normalizedRequestAttrs();
    let currentUser = schema.users.findBy({_currentLoginInTest: true});
    attrs.slug = attrs.name.underscore();
    let result = schema.organizations.create(attrs);
    schema.organizationUsers.create({userId: currentUser.id, organizationId: result.id});
    return result;
  });
  this.post('/organizations/:id/projects', function (schema, request) {
    let attrs = this.normalizedRequestAttrs();
    schema.organizations.findBy({slug: request.params.slug});
    let project = schema.projects.create(attrs);
    return project;
  });
  this.get('organizations/:slug/subscription', function(schema, request) {
    let organization = schema.organizations.findBy({slug: request.params.slug});
    return organization.subscription;
  });
  this.patch('organizations/:slug/subscription', function (schema, request) {
    let attrs = this.normalizedRequestAttrs();
    let organization = schema.organizations.findBy({slug: request.params.slug});
    let subscription = organization.subscription;

    // Mimic backend email validation.
    if (!attrs.billingEmail.match(/^[a-zA-Z0-9_]+@[a-zA-Z0-9_.]+$/)) {
      return new Mirage.Response(400, {}, {
        errors: [
          {
            status: 'bad_request'
          },
          {
            source: {
              pointer: '/data/attributes/billing-email'
            },
            detail: 'Billing email is invalid'
          }
        ]
      });
    }
    subscription.update(attrs);
    return subscription;
  });
  this.get('/users/:id/organizations', (schema, request) => {
    let user = schema.users.find(request.params.id);
    if (!user._currentLoginInTest) {
      return {errors: [{status: '403', title: 'unauthorized'}]};
    }
    let organizationUsers = schema.organizationUsers.where({userId: user.id});
    let organizationIds = organizationUsers.models.map(obj => obj.organizationId);
    return schema.organizations.where({id: organizationIds});
  });
  this.get('/organizations/:slug/organization-users', (schema, request) => {
    // TODO handle ?filter=current-user-only
    let organization = schema.organizations.findBy({slug: request.params.slug});
    return schema.organizationUsers.where({organizationId: organization.id});
  });
  this.get('/organizations/:slug/projects', (schema, request) => {
    let organization = schema.organizations.findBy({slug: request.params.slug});
    return schema.projects.where({organizationId: organization.id});
  });
  this.get('/projects/:full_slug/', (schema, request) => {
    let fullSlug = decodeURIComponent(request.params.full_slug);
    return schema.projects.findBy({fullSlug: fullSlug});
  });
  this.get('/projects/:organization_slug/:project_slug/tokens', (schema, request) => {
    let fullSlug = `${request.params.organization_slug}/${request.params.project_slug}`;
    let project = schema.projects.findBy({fullSlug: fullSlug});
    return schema.tokens.where({projectId: project.id});
  });
  this.get('/projects/:organization_slug/:project_slug/builds', (schema, request) => {
    let fullSlug = `${request.params.organization_slug}/${request.params.project_slug}`;
    let project = schema.projects.findBy({fullSlug: fullSlug});
    return schema.builds.where({projectId: project.id});
  });
  this.get('/invites/:id');
  this.patch('/invites/:id', function (schema, request) {
    let invite = schema.invites.find(request.params.id);
    let attrs = this.normalizedRequestAttrs();
    invite.update(attrs);
    return invite;
  });
  this.get('/builds/:id');
  this.get('/builds/:build_id/snapshots');
  this.get('/builds/:build_id/comparisons');
  if (config.PERCY_WEB_API_HOST) {
    this.passthrough(config.PERCY_WEB_API_HOST+'/**');
  }
}
