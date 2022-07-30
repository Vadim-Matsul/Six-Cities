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
import { Reviews } from '../../types/reviews';

type AppProps = {
  offers: Offers
  nearPlacesOffers: Offers
  favoriteOffers: Offers
  reviews: Reviews
}

function App ({ offers, nearPlacesOffers, favoriteOffers, reviews}:AppProps):JSX.Element{


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
            <PrivateRoute authorizationStatus={ AuthorizationStatus.Auth}>
              < FavoritesScreen offers = {favoriteOffers}/>
            </PrivateRoute>
          }
        />
        <Route
          path = { `${AppRoute.Property}/:id` }
          element = {
            < PropertyScreen
              offers={offers}
              nearPlacesOffers={nearPlacesOffers}
              reviews = { reviews as Reviews}
            />
          }
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
