import _ from 'lodash';
import selectorFactory from './selector';

export default (selectors) => _.mapValues(
  selectors,
  (value, key) => selectorFactory(key, value)
);
