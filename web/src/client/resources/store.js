// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import type { BrowserHistory } from 'history/createBrowserHistory';

import reducer from './reducer';
import type { StoreType, StateType } from './types';

const configureStore = (initialState: StateType, history: BrowserHistory): StoreType => {
  const store: StoreType = createStore(
    reducer(history),
    initialState,
    compose(
      applyMiddleware(routerMiddleware(history), thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f, // eslint-disable-line
    ),
  );

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(reducer(history));
    });
  }

  return store;
};

export default configureStore;
