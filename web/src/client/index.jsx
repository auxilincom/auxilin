// @flow

import App from 'app';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import type { BrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';

import type { StateType, StoreType } from './resources/types';

import configureStore from './resources/store';

import styles from './styles.pcss';

const initialState: StateType = {
  user: window.user,
  toast: {
    messages: [],
  },
};

const history: BrowserHistory = createBrowserHistory();
const store: StoreType = configureStore(initialState, history);

const minLoadingTime: number = 1500;
const now: number = Date.now();

const renderApp = () => {
  const rootEl = document.getElementById('root');
  if (!(rootEl instanceof Element)) {
    throw new Error('invalid type');
  }

  ReactDOM.render(
    <StrictMode>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </StrictMode>,
    rootEl,
  );
};

const hidePoster = () => {
  const poster = document.getElementById('poster');
  const html = document.documentElement;
  if (!(poster instanceof Element) || !(html instanceof Element)) {
    return;
  }
  poster.classList.add(styles.posterHidden);

  setTimeout(() => {
    poster.classList.add(styles.posterNone);
    html.classList.remove('show-poster');
  }, 600);
};

renderApp();

if (now - window.loadingTime > minLoadingTime) {
  hidePoster();
} else {
  setTimeout(hidePoster, minLoadingTime - (now - window.loadingTime));
}
