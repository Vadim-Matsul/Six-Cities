import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import LoginPage from '../../pages/login/LoginPage';
import BookMarksPage from '../../pages/bookmarks/BookMarksPage';
import HousingPage from '../../pages/housing/HousingPage';
import HousingNoLogedPage from '../../pages/housing/HousingNoLogedPage';
import MainPage from '../../pages/main/MainPage';
import PlacesToStayPage from '../../pages/placesToStay/PlacesToStayPage';
import SavedListingPage from '../../pages/savedListing/SavedListingPage';
import Error from '../../pages/error/Error';
import { OfferCity, OfferPlaces } from '../../types/OfferPlaces';

type AppProps = {
  offerstate: OfferPlaces
}

function App( props: AppProps ): JSX.Element {
  const {offerstate} = props;
  const [offercityAmster, offercityCologne] = offerstate;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path = { AppRoutes.BookMarks }
            element = { <BookMarksPage/> }
          />
          <Route
            path = { AppRoutes.HouseNoAuth }
            element = { <HousingNoLogedPage/> }
          />
          <Route
            path = { AppRoutes.HouseAuth }
            element = { <HousingPage/> }
          />
          <Route
            path = { AppRoutes.NoLoged }
            element = { <LoginPage/> }
          />
          <Route
            path = { AppRoutes.Main }
            element = {
              <PrivateRoute
                authorizationStatus = { AuthorizationStatus.Auth }
              >
                <MainPage offerstate = {offercityAmster as OfferCity }/>
              </PrivateRoute>
            }
          />
          <Route
            path = { AppRoutes.Places }
            element = { <PlacesToStayPage/> }
          />
          <Route
            path = { AppRoutes.Save }
            element = {
              <SavedListingPage
                offercityAmster = {offercityAmster as OfferCity}
                offercityCologne = {offercityCologne as OfferCity}
              />
            }
          />
          <Route
            path = { AppRoutes.Error }
            element = { <Error /> }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
