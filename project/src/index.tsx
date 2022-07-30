import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers, nearPlacesOffers, favoriteOffers } from './mocks/offers';
import { Offers } from './types/offers';
import { reviews } from './mocks/reviews';
import { Reviews } from './types/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);


root.render(
  <React.StrictMode>
    <App
      offers = { offers as Offers }
      nearPlacesOffers = { nearPlacesOffers as Offers }
      favoriteOffers = { favoriteOffers as Offers }
      reviews = { reviews as Reviews}
    />
  </React.StrictMode>,
);


