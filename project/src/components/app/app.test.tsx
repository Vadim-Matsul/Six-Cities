import * as RTL from '@testing-library/react';
import thunk from 'redux-thunk';

import { AppRoute, AuthorizationStatus, FetchProgress, SortTypes } from '../../const';
import { makeFakeAuthUser, makeFakeOffers, makeFakeReviews } from '../../utils/mock';
import { HistoryRouter } from '../history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';

import App from './app';


type BundleType = ( placesToPush: string, ShouldDoUnAuthStatus?: boolean ) => void;

const fakeOffers = makeFakeOffers();
const favorites = fakeOffers.filter((offer) => offer.isFavorite);
const nearOffers = fakeOffers.slice(1,4);
const reviews = makeFakeReviews();
const offer = fakeOffers[0];
const fakeUser = makeFakeAuthUser();

const makeLayout = (AuthStatus?:AuthorizationStatus) => ({
  DATA:{
    offers: { data: fakeOffers, loadStatus: FetchProgress.Fulfilled },
    nearOffers: {id: 1, data: nearOffers, loadStatus: FetchProgress.Fulfilled },
    reviews: {id: 1, data: reviews, loadStatus: FetchProgress.Fulfilled },
    offer: { data: offer, loadStatus: FetchProgress.Fulfilled },
    favorites: { data: favorites }
  },
  LOGIC:{
    currentCity: fakeOffers[0]['city']['name'],
    currentSort: SortTypes.POPULAR
  },
  USER:{
    authStatus: AuthStatus || AuthorizationStatus.Auth,
    user: fakeUser,
    logoutProcess: false,
    logoutError: false
  }
});

const history = createMemoryHistory( );

const makeNavigate = ( authStatus?:AuthorizationStatus ):JSX.Element => {
  const makeFakeStore = configureMockStore< ReturnType<typeof makeLayout> >( [thunk] );
  const store = makeFakeStore( makeLayout(authStatus) );

  return (
    <Provider store={ store }>
      <HistoryRouter history={ history } >
        <App/>
      </HistoryRouter>
    </Provider>
  );
};

const testBundleApp:BundleType = ( placesToPush, ShouldDoUnAuthStatus ) => {
  const navigate =
  ShouldDoUnAuthStatus
    ? makeNavigate( AuthorizationStatus.NoAuth )
    : makeNavigate();

  history.push( placesToPush );
  RTL.render( navigate );
};

describe('Component: App', () => {

  it('should render MainScreen', () => {
    testBundleApp( AppRoute.Main );
    expect( RTL.screen.getByTestId('Map') ).toBeInTheDocument();
    expect( RTL.screen.getByTestId('MainScreen') ).toBeInTheDocument();
  });

  describe('AuthScreen', () => {
    it('should render AuthScreen when authStatus is "NoAuth"', () => {
      testBundleApp( AppRoute.Auth, true );
      expect( RTL.screen.getByTestId('AuthScreen') ).toBeInTheDocument();
    });

    it('shouldn`t render AuthScreen when authStatus is "Auth"', () => {
      testBundleApp( AppRoute.Auth );
      expect( RTL.screen.queryByTestId('AuthScreen') ).not.toBeInTheDocument();
    });
  });

  describe('FavoriteScreen', () => {
    it('should`t render FavoriteScreen when authStatus is "NoAuth"', () => {
      testBundleApp( AppRoute.Favorites, true );
      expect( RTL.screen.queryByTestId('FavoritesScreen') ).not.toBeInTheDocument();
    });

    it('should render FavoriteScreen when authStatus is "Auth"', () => {
      testBundleApp( AppRoute.Favorites );
      expect( RTL.screen.getByTestId('FavoritesScreen') ).toBeInTheDocument();
    });
  });

  it('should render PropertyScreen', () => {
    testBundleApp( `${AppRoute.Property}/${offer.id}` );
    expect( RTL.screen.getByTestId('PropertyScreen') ).toBeInTheDocument();
  });

  it('should render NotFoundScreen', () => {
    testBundleApp('/triggeredForNotFoundScreen');
    expect( RTL.screen.getByText(/Page Not Found/i) ).toBeInTheDocument();
  });

});
