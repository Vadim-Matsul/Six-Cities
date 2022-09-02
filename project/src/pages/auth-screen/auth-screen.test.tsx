import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';

import { AppRoute } from '../../const';

import AuthScreen from './auth-screen';
import { HistoryRouter } from '../../components/history-router/history-router';


const makeFakeStore = configureMockStore();
const store = makeFakeStore({USER:{ loginError:false }});

const history = createMemoryHistory();

describe('Component: AuthScreen', () => {

  it('successfully render Component when user navigate to "/login" & redirect to Main Screen', async () => {

    history.push(AppRoute.Auth);
    render(
      <Provider store={ store } >
        <HistoryRouter history={ history }>
          <Routes>
            <Route
              path={ AppRoute.Auth }
              element={<AuthScreen/>}
            />
            <Route
              path={ AppRoute.Main }
              element={ <h1>Simulate Main Screen</h1> }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );


    const button = screen.getByTestId('auth-button');
    const loginInput = screen.getByTestId('login');
    const passwordInput = screen.getByTestId('password');
    const link = screen.getByTestId('AuthScreenCity');

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await userEvent.type( loginInput, 'testsoeasy@gmail.com' );
    await userEvent.type( passwordInput, 'qwerty098' );

    expect(screen.getByDisplayValue(/TestSoEasy@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/qwerty098/i)).toBeInTheDocument();
    expect(screen.queryByText(/Simulate Main Screen/i)).not.toBeInTheDocument();

    await userEvent.click( link );

    expect( screen.getByText(/Simulate Main Screen/i) ).toBeInTheDocument();

  });

});
