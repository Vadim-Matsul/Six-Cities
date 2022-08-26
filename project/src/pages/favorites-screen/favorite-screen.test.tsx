import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HistoryRouter } from '../../components/history-router/history-router';
import { AuthorizationStatus, FetchProgress } from '../../const';
import { Offers } from '../../types/offers';
import { makeFakeOffers } from '../../utils/mock';
import FavoritesScreen from './favorites-screen';

const makeLayout = (data: Offers | [], loadStatus: FetchProgress) => ({
  DATA:{
    favorites: { data: data, loadStatus: loadStatus },
  },
  USER:{ authStatus: AuthorizationStatus.Auth }
});

const makeFakeStore = configureMockStore( [thunk] );

const history = createMemoryHistory();


describe('Component: FavoritesScreen', () => {

  it('seccessfully render when favorites data is empty', () => {
    const store = makeFakeStore( makeLayout([], FetchProgress.Fulfilled) );
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <FavoritesScreen />
        </HistoryRouter>
      </Provider>
    );

    expect( screen.getByTestId('FavoritesScreen') ).toHaveClass('page--favorites-empty');
    expect( screen.queryByText(/Saved listing/i)).not.toBeInTheDocument();
    expect( screen.getByTestId('FavoritesScreen-main') ).toHaveClass('page__main--favorites-empty');
  });

  it('seccessfully render when favorites data is full', () => {
    const fakeOffers = makeFakeOffers();
    const store = makeFakeStore( makeLayout(fakeOffers, FetchProgress.Fulfilled) );
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <FavoritesScreen />
        </HistoryRouter>
      </Provider>
    );

    expect( screen.queryByTestId('FavoritesScreen') ).not.toHaveClass('page--favorites-empty');
    expect( screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect( screen.queryByTestId('FavoritesScreen-main') ).not.toHaveClass('page__main--favorites-empty');
  });

  it('seccessfully render when favorites is fetching', () => {
    const store = makeFakeStore( makeLayout([], FetchProgress.Pending) );
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <FavoritesScreen />
        </HistoryRouter>
      </Provider>
    );
    expect( screen.queryByTestId('FavoritesScreen') ).not.toBeInTheDocument();
    expect( screen.getByTestId('loader')).toBeInTheDocument();
  });

});
