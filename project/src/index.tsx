import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { RootReducer } from './store/reducer/root-reducer';
import { ToastContainer } from 'react-toastify';
import { CreateApi } from './service/api/api';
import thunk from 'redux-thunk';
import { checkAuth, fetchOffers, ThunkDispatchResualt } from './store/actions/api-actions';
import 'react-toastify/dist/ReactToastify.css';
import { redirect } from './store/middlewares/redirect';

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
      <ToastContainer />
      <App/>
    </Provider>
  </React.StrictMode>,
);


