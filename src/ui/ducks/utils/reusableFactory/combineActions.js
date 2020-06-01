import _ from 'lodash';
import actionFactory from './action';

export default (actions) => _.mapValues(
  actions,
  (value, key) => actionFactory(key, value)
);
