import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from './const';
import MainScreen from '../../pages/main-screen/main-screen';
import AuthScreen from '../../pages/auth-screen/auth-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

type AppProps = {
  cardsCount: number
}

function App ({cardsCount}:AppProps):JSX.Element{
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path = { AppRoute.Main }
          element = { < MainScreen cardsCount={ cardsCount } /> }
        />
        <Route
          path = { AppRoute.Auth }
          element = { < AuthScreen /> }
        />
        <Route
          path = { AppRoute.Favorites }
          element = { < FavoritesScreen /> }
        />
        <Route
          path = { AppRoute.Property }
          element = { < PropertyScreen /> }
        />
        <Route
          path = { AppRoute.Error }
          element = { < NotFoundScreen /> }
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
