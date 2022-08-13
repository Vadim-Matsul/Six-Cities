import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HistoryRouter } from '../history-router/history-router';
import { AppRoute, FetchProgress } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import AuthScreen from '../../pages/auth-screen/auth-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/Private-Route';
import { AuthorizationStatus } from '../../const';
import { Offers } from '../../types/offers';
import { Loader } from '../loader/loader';
import { browserHistory } from '../../browser-history';
import { getOffers } from '../../store/reducer/data-reducer/selectors';
import { getAuthStatus } from '../../store/reducer/user-reducer/selectors';
import { useSelector } from 'react-redux';

type AppProps = {
  favoriteOffers: Offers
}


function App ( props:AppProps ):JSX.Element{
  const { favoriteOffers } = props;

  const offers = useSelector(getOffers);
  const authStatus = useSelector(getAuthStatus);

  if (authStatus === AuthorizationStatus.UnKnown || offers.loadStatus !== FetchProgress.Fulfilled ){
    return <Loader />;
  }

  return (
    <HistoryRouter history={ browserHistory }>
      <Routes>
        <Route
          path = { AppRoute.Main }
          element = { < MainScreen offers = {offers.data}/>}
        />
        <Route
          path = { AppRoute.Auth }
          element = {
            authStatus === AuthorizationStatus.Auth
              ? <Navigate to={ AppRoute.Main }/>
              : < AuthScreen />
          }
        />
        <Route
          path = { AppRoute.Favorites }
          element = {
            <PrivateRoute authorizationStatus={ authStatus }>
              < FavoritesScreen offers = {favoriteOffers}/>
            </PrivateRoute>
          }
        />
        <Route
          path = { `${AppRoute.Property}/:id` }
          element = {
            < PropertyScreen
              offers={offers.data}
            />
          }
        />
        <Route
          path = { AppRoute.Error }
          element = { < NotFoundScreen /> }
        />
      </Routes>
    </HistoryRouter>
  );
}


export default App;
