import Controller from '@ember/controller';
import { sort, alias } from '@ember/object/computed';

export default Controller.extend({
  mailers: alias('model'),
  mailersSorting: Object.freeze(['numericId']),
  sortedMailers: sort('mailers', 'mailersSorting'),
});
