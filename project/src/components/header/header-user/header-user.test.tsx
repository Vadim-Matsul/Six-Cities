import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { AppRoute, FetchProgress } from '../../../const';
import { makeFakeAuthUser } from '../../../utils/mock';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../../history-router/history-router';
import thunk from 'redux-thunk';
import { Route, Routes } from 'react-router-dom';
import HeaderUser from './header-user';


const fakeUser = makeFakeAuthUser();

const makeLayout = <T = boolean>( logoutProcess: T, logoutError: T ) => ({
  DATA:{
    favorites: { data: [], loadStatus: FetchProgress.Idle },
  },
  USER:{
    user: fakeUser,
    logoutProcess: logoutProcess,
    logoutError: logoutError
  }
});

const makeFakeStore = configureMockStore( [thunk] );

const history = createMemoryHistory();

describe('Component: HeaderUser', () => {

  it('successfully redirect to favorites after click on user-data bandle', async () => {
    const store = makeFakeStore( makeLayout(false, false) );
    history.push('/triggeredForHeaderUser');
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Routes>
            <Route
              path={ AppRoute.Favorites }
              element={
                <>
                  <HeaderUser/>
                  <h1>Favorites Screen</h1>
                </>
              }
            />
            <Route
              path='*'
              element={ <HeaderUser/> }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );
    const favoriteLink = screen.getByTestId('header-favorites');

    expect( favoriteLink ).not.toHaveClass('disable');
    expect( screen.queryByText(/Favorites Screen/i)).not.toBeInTheDocument();

    await UserEvent.click( favoriteLink );

    expect( favoriteLink ).toHaveClass('disable');
    expect( screen.getByText(/Favorites Screen/i)).toBeInTheDocument();
  });

});
