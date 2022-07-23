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
import React from 'react';
import { ClassCompForm } from '../classes-component/ClassCompForm';

function App(): JSX.Element {
  return (
    <React.Fragment>
      <ClassCompForm />
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
                authorizationStatus = { AuthorizationStatus.NoAuth }
              >
                <MainPage />
              </PrivateRoute>
            }
          />
          <Route
            path = { AppRoutes.Places }
            element = { <PlacesToStayPage/> }
          />
          <Route
            path = { AppRoutes.Save }
            element = { <SavedListingPage/> }
          />
          <Route
            path = { AppRoutes.Error }
            element = { <Error /> }
          />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
