import HousingPage from '../../pages/housing/HousingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes } from '../../const';
import LoginPage from '../../pages/login/LoginPage';
import BookMarksPage from '../../pages/bookmarks/BookMarksPage';
import HousingNoLogedPage from '../../pages/housing/HousingNoLogedPage';
import MainPage from '../../pages/main/MainPage';
import PlacesToStayPage from '../../pages/placesToStay/PlacesToStayPage';
import SavedListingPage from '../../pages/savedListing/SavedListingPage';
import Error from '../../pages/error/Error';

function App(): JSX.Element {
  return (
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
          element = { <MainPage/> }
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
  );
}

export default App;
