import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import AuthScreen from '../../pages/auth-screen/auth-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/Private-Route';
import { AuthorizationStatus } from '../../const';
import { Offers } from '../../types/offers';

type AppProps = {
  offers: Offers
}

function App ({ offers }:AppProps):JSX.Element{

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path = { AppRoute.Main }
          element = { < MainScreen offers = {offers}/>}
        />
        <Route
          path = { AppRoute.Auth }
          element = { < AuthScreen /> }
        />
        <Route
          path = { AppRoute.Favorites }
          element = {
            <PrivateRoute authorizationStatus={ AuthorizationStatus.NoAuth}>
              < FavoritesScreen />
            </PrivateRoute>
          }
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
