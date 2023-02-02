import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf.js';
import * as sessionActions from './store/session';
import ModalProvider from './context/Modal';
import { RouterProvider } from './context/RouterContext';
import { HelmetProvider } from 'react-helmet-async';

import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <HelmetProvider>
      <RouterProvider>
        <Provider store={store}>
          <ModalProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ModalProvider>
        </Provider>
      </RouterProvider>
    </HelmetProvider>
  )
}

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  // document.getElementById('root')
);
