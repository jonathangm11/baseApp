import { combineReducers } from 'redux';
import _ from 'lodash';
import reducerFactory from './reducer';
import withLocalStorage from './withLocalStorage';

export default (reducers) => combineReducers(
  _.mapValues(
    reducers,
    (value, key) => withLocalStorage(key, reducerFactory(key, value))
  )
);
