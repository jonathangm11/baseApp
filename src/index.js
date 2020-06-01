import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './ui/ducks';
import PromiseMiddleware  from './ui/lib/promiseMiddleware';
import ReactDOM from 'react-dom';
import './index.css';
import App from './ui/components/app';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  window !== "undefined"
      ? composeEnhancers(applyMiddleware(PromiseMiddleware))
      : applyMiddleware(PromiseMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
  <App />
</Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
