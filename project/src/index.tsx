import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { nearPlacesOffers, favoriteOffers } from './mocks/offers';
import { Offers } from './types/offers';
import { reviews } from './mocks/reviews';
import { Reviews } from './types/reviews';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from './store/reducer/reducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const store = configureStore({reducer});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App
        nearPlacesOffers = { nearPlacesOffers as Offers }
        favoriteOffers = { favoriteOffers as Offers }
        reviews = { reviews as Reviews}
      />
    </Provider>
  </React.StrictMode>,
);


