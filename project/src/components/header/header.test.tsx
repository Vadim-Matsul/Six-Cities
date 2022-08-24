import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { HistoryRouter } from '../history-router/history-router';
import Header from './header';


const makeLayout = (authStatus:AuthorizationStatus) => ({
  USER:{
    authStatus: authStatus
  }
});
type State = ReturnType<typeof makeLayout>;
const makeFakeStore = configureMockStore< State >();

const history = createMemoryHistory();


describe('Component: Header', () => {

  describe('authStatus is "AUTH"', () => {
    const layout = makeLayout(AuthorizationStatus.Auth);
    const store = makeFakeStore(layout);
    const isAuth = store.getState().USER?.authStatus === AuthorizationStatus.Auth;

    it('correctly render if authStatus is "AUTH"', () => {
      if(isAuth){ render(
        <Provider store={ store }>
          <HistoryRouter history={ history }>
            <Header/>
          </HistoryRouter>
        </Provider>
      ); }
      expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
      expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
    });

    it('successfully redirect to favorites screen', async () => {
      if(isAuth){
        history.push('/triggeredForHeader');
        render(
          <Provider store={ store }>
            <HistoryRouter history={ history }>
              <Routes>
                <Route
                  path={ AppRoute.Favorites }
                  element={ <h1>Favorites Screen</h1> }
                />
                <Route
                  path='*'
                  element={ <Header/> }
                />
              </Routes>
            </HistoryRouter>
          </Provider>
        ); }

      expect(screen.queryByText(/Favorites Screen/i)).not.toBeInTheDocument();
      await userEvent.click(screen.getByTestId('header-favorites'));
      expect(screen.getByText(/Favorites Screen/i)).toBeInTheDocument();
    });

    it('successfully redirect to main screen', async () => {
      if(isAuth){
        history.push('/triggeredForHeader');
        render(
          <Provider store={ store }>
            <HistoryRouter history={ history }>
              <Routes>
                <Route
                  path={ AppRoute.Main }
                  element={ <h1>Main Screen</h1> }
                />
                <Route
                  path='*'
                  element={ <Header/> }
                />
              </Routes>
            </HistoryRouter>
          </Provider>
        ); }

      expect(screen.queryByText(/Main Screen/i)).not.toBeInTheDocument();
      await userEvent.click(screen.getByTestId('header-main'));
      expect(screen.getByText(/Main Screen/i)).toBeInTheDocument();
    });

  });

  describe('authStatus is "NoAuth"', () => {
    const layout = makeLayout(AuthorizationStatus.NoAuth);
    const store = makeFakeStore(layout);
    const isNoAuth = store.getState().USER?.authStatus === AuthorizationStatus.NoAuth;

    it('correctly render if authStatus is "NoAuth"', () => {
      if(isNoAuth){ render(
        <Provider store={ store }>
          <HistoryRouter history={ history }>
            <Header/>
          </HistoryRouter>
        </Provider>
      ); }
      expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
      expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
    });

    it('successfully redirect to auth screen', async () => {
      if(isNoAuth){
        history.push('/triggeredForHeader');
        render(
          <Provider store={ store }>
            <HistoryRouter history={ history }>
              <Routes>
                <Route
                  path={ AppRoute.Auth }
                  element={ <h1>Auth Screen</h1> }
                />
                <Route
                  path='*'
                  element={ <Header/> }
                />
              </Routes>
            </HistoryRouter>
          </Provider>
        ); }

      expect(screen.queryByText(/Auth Screen/i)).not.toBeInTheDocument();
      await userEvent.click(screen.getByTestId('header-auth'));
      expect(screen.getByText(/Auth Screen/i)).toBeInTheDocument();
    });

  });

});
