import Ember from 'ember';
import config from '../config/environment';

export default {
  redirectToLogin(options) {
    options = options || {};
    var params = {
      redirect_to: options.redirectTo || window.location.href,
    };
    if (options.extendedPermissions) {
      params['extended_permissions'] = options.extendedPermissions;
    }
    var urlName = (options.extendedPermissions ? 'loginExtended' : 'login');
    window.location = this.buildApiUrl(urlName, {params: params});
  },
  buildApiUrl() {
    var key = arguments[0];
    var otherArgs = Array.prototype.slice.call(arguments, 1);

    // Options, if given, must be the last arg and must be a hash.
    var options = otherArgs.slice(-1)[0];
    if (typeof(options) === 'object') {
      otherArgs = otherArgs.slice(0, -1);
    } else {
      options = {};
    }
    var params = options.params;
    var queryParams = params ? '?' + Ember.$.param(params) : '';

    var path = config.APP.apiUrls[key];
    if (!path) {
      Ember.Logger.error('API path not found for key: ' + key);
      return;
    }

    // If the path requires formatting, make sure the right number of args have been given.
    var numFormatsRequired = (path.match(/%@/g) || []).length;
    if (numFormatsRequired !== otherArgs.length) {
      Ember.Logger.error(
        'Mismatched number of formatting args for: ' + path + '\nGot: ' + otherArgs);
      return;
    } else {
      otherArgs.forEach(function(arg) {
        path = path.replace('%@', arg);
      });
    }
    let host;
    if (config.PERCY_WEB_API_HOST_FASTBOOT) {
      host = config.PERCY_WEB_API_HOST_FASTBOOT;
    } else if (window && window.location) {
      host = window.location.origin;
    } else {
      host = 'https://percy.io';
    }
    return host + path + queryParams;
  },
  getQueryParam(param) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] === param) {
        return pair[1];
      }
    }
    return false;
  },
};
