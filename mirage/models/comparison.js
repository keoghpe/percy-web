// TODO: Would like to remove this.  Haven't yet, due to what I suspect is a bug in mirage.
// Mirage doesn't seem to prevent infinite loops when resolving foreign keys when
// using the real model rather than the mirage model.

import {Model, belongsTo} from 'ember-cli-mirage';

export default Model.extend({
  headSnapshot: belongsTo('snapshot'),
  headScreenshot: belongsTo('screenshot'),
  baseScreenshot: belongsTo('screenshot'),
  diffImage: belongsTo('image'),
});
