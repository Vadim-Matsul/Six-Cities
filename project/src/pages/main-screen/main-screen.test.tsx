import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { AuthorizationStatus, FetchProgress, SortTypes } from '../../const';
import { Offers } from '../../types/offers';
import { makeFakeOffers } from '../../utils/mock';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../components/history-router/history-router';
import MainScreen from './main-screen';

const fakeOffers = makeFakeOffers();

const makeLayout = (offers: Offers | []) => ({
  DATA:{
    offers: { data: offers, loadStatus: FetchProgress.Fulfilled },
  },
  LOGIC:{
    currentCity: fakeOffers[0]['city']['name'],
    currentSort: SortTypes.POPULAR
  },
  USER:{ authStatus: AuthorizationStatus.Auth }
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
