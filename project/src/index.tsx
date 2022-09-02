import { configureStore } from '@reduxjs/toolkit';
import { ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import React from 'react';

import { checkAuth, fetchOffers, ThunkDispatchResualt } from './store/actions/api-actions';
import { RootReducer } from './store/reducer/root-reducer';
import { redirect } from './store/middlewares/redirect';
import { CreateApi } from './service/api/api';

import App from './components/app/app';
import browserHistory from './browser-history';
import { HistoryRouter } from './components/history-router/history-router';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const api = CreateApi();
const store = configureStore({
  reducer: RootReducer,
  middleware: [thunk.withExtraArgument(api), redirect]
});

(store.dispatch as ThunkDispatchResualt)( checkAuth() );
(store.dispatch as ThunkDispatchResualt)( fetchOffers() );

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer/>
      <HistoryRouter history={ browserHistory }>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
