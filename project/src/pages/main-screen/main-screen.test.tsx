import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';

import { AuthorizationStatus, FetchProgress, SortTypes } from '../../const';
import { makeFakeAuthUser, makeFakeOffers } from '../../utils/mock';
import { Offers } from '../../types/offers';

import MainScreen from './main-screen';
import { HistoryRouter } from '../../components/history-router/history-router';


const fakeOffers = makeFakeOffers();
const fakeUser = makeFakeAuthUser();

const makeLayout = (offers: Offers | []) => ({
  DATA:{
    offers: { data: offers, loadStatus: FetchProgress.Fulfilled },
    favorites: { data: offers.slice().filter((offer) => offer.isFavorite)}
  },
  LOGIC:{
    currentCity: fakeOffers[0]['city']['name'],
    currentSort: SortTypes.POPULAR
  },
  USER:{
    authStatus: AuthorizationStatus.Auth,
    user: fakeUser,
    logoutProcess: false,
    logoutError: false}
});

const makeFakeStore = configureMockStore();

const history = createMemoryHistory();


describe('Component: MainScreen', () => {

  it('successfully render when offers data is empty', () => {
    const store = makeFakeStore( makeLayout([]) );
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <MainScreen />
        </HistoryRouter>
      </Provider>
    );

    expect( screen.getByTestId('MainScreen') ).toHaveClass('cities__places-container--empty');
    expect( screen.queryByText(/places to stay in/i)).not.toBeInTheDocument();
    expect( screen.queryByTestId('Map') ).not.toBeInTheDocument();
  });

  it('successfully render when offers data is full', () => {
    const store = makeFakeStore( makeLayout(fakeOffers) );
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <MainScreen />
        </HistoryRouter>
      </Provider>
    );
    expect( screen.getByTestId('MainScreen') ).not.toHaveClass('cities__places-container--empty');
    expect( screen.getByText(/places to stay in/i)).toBeInTheDocument();
    expect( screen.getByTestId('Map') ).toBeInTheDocument();
  });

});
