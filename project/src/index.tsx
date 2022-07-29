import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { Offers } from './types/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const InputParametr = {
  CARDS_COUNT: 5
};

root.render(
  <React.StrictMode>
    <App
      cardsCount = { InputParametr.CARDS_COUNT }
      offers = { offers as Offers }
    />
  </React.StrictMode>,
);


