import { isNone } from '@ember/utils';
import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';

import Component from '@ember/component';

export default Component.extend({
  classNames: ['form'],
  classNameBindings: ['hasErrors:has-error'],
  hasErrors: computed('model.errors.record', function() {
    return !isEmpty(this.get('model.errors.record'));
  }),
  setup: function() {
    this.set('authentication', !isNone(this.get('model.username')) ||
      !isNone(this.get('model.password')));
    this.set('throttling', !isNone(this.get('model.perMinute')) ||
      !isNone(this.get('model.burst')));
  },
  didReceiveAttrs: function() {
    this._super(...arguments);
    this.setup();
  },
  actions: {
    ignoreCertificateChanged: function(state) {
      this.set('model.ignoreCertificate', state);
    },
    authenticationChanged: function(state) {
      this.set('authentication', state);

      if (!this.authentication) {
        this.set('model.username', null);
        this.set('model.password', null);
      }
    },
    throttlingChanged: function(state) {
      this.set('throttling', state);

      if (!this.throttling) {
        this.set('model.perMinute', null);
        this.set('model.burst', null);
      }
    },
  },
});
