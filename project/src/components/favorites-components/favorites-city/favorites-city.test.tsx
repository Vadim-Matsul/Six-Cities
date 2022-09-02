import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';

import { HistoryRouter } from '../../history-router/history-router';
import { INITIAL_CURRENT_CITY } from '../../../const';

import FavoritesCity from './favorites-city';


const makeFakeStore = configureMockStore();
const store = makeFakeStore({});

const history = createMemoryHistory();

describe('Component: FavoritesCity', () => {

  it('successfully render', async () => {

    history.push('/triggeredForFavoritesCity');
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Routes>
            <Route
              path='/'
              element={ <div data-testid='FavoriteCityFakeMainScreen'/> }
            />
            <Route
              path='*'
              element={ <FavoritesCity city={INITIAL_CURRENT_CITY} /> }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(screen.queryByTestId('FavoriteCityFakeMainScreen')).not.toBeInTheDocument();
    expect(screen.getByText(INITIAL_CURRENT_CITY)).toBeInTheDocument();
    await userEvent.click(link);
    expect(screen.getByTestId('FavoriteCityFakeMainScreen')).toBeInTheDocument();
  });

});
