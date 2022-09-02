import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';

import { HistoryRouter } from '../../history-router/history-router';
import { AuthorizationStatus, FetchProgress } from '../../../const';
import { makeFakeAuthUser } from '../../../utils/mock';

import { HeaderNav } from './header-nav';


const fakeUser = makeFakeAuthUser();

const makeLayout = ( authStatus: AuthorizationStatus) => ({
  DATA:{
    favorites: { data: [], loadStatus: FetchProgress.Idle },
  },
  USER:{
    authStatus: authStatus,
    user: fakeUser,
    logoutProcess: false,
    logoutError: false
  }
});

const makeFakeStore = configureMockStore();

const history = createMemoryHistory();

describe('Component: HeaderNav', () => {

  it('succesfully render if authStatus is "Auth"', () => {
    const store = makeFakeStore( makeLayout( AuthorizationStatus.Auth ) );
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <HeaderNav/>
        </HistoryRouter>
      </Provider>
    );
    expect( screen.getAllByRole('link').length ).toBe( 2 );
    expect( screen.getByText(/Sign out/i) ).toBeInTheDocument();
    expect( screen.getByText(fakeUser.name) ).toBeInTheDocument();
    expect( screen.queryByText(/Sign in/i) ).not.toBeInTheDocument();
  });

  it('succesfully render if authStatus is "NoAuth"', () => {
    const store = makeFakeStore( makeLayout( AuthorizationStatus.NoAuth ) );
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <HeaderNav/>
        </HistoryRouter>
      </Provider>
    );
    expect( screen.getByText(/Sign in/i) ).toBeInTheDocument();
    expect( screen.getAllByRole('link').length ).toBe( 1 );
    expect( screen.queryByText(/Sign out/i) ).not.toBeInTheDocument();
    expect( screen.queryByText(fakeUser.name) ).not.toBeInTheDocument();
  });

});
