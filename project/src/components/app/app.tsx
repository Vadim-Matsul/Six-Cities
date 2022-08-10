import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HistoryRouter } from '../history-router/history-router';
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
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import { Loader } from '../loader/loader';
import { browserHistory } from '../../browser-history';

type AppProps = {
  nearPlacesOffers: Offers
  favoriteOffers: Offers
  reviews: Reviews
}

const mapStateToProps = ({offers, authStatus, loadStatus}:State) => ({ offers, authStatus, loadStatus });

const connector = connect(mapStateToProps);
type AppReduxProps = ConnectedProps <typeof connector>
type ConnectedAppProps = AppProps & AppReduxProps

function App ( props:ConnectedAppProps ):JSX.Element{
  const { offers, nearPlacesOffers, favoriteOffers, reviews, authStatus, loadStatus} = props;

  if (authStatus === AuthorizationStatus.UnKnown || !loadStatus){
    return <Loader />;
  }

  return (
    <HistoryRouter history={ browserHistory }>
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
            <PrivateRoute authorizationStatus={ authStatus }>
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
    </HistoryRouter>
  );
}


export default connector(App);
