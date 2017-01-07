import Ember from 'ember';
import TargetApplicationActionsMixin from '../mixins/target-application-actions';

export default Ember.Component.extend(TargetApplicationActionsMixin, {
  user: null,
  classes: null,

  classNames: ['NavMenu'],
  classNameBindings: ['classes'],
});
