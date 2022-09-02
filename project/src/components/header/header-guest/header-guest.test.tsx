import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { HistoryRouter } from '../../history-router/history-router';
import { AppRoute } from '../../../const';

import { HeaderGuest } from './header-guest';


const history = createMemoryHistory();

describe('Component: HeaderGuest', () => {

  it('correctly render', () => {
    render(
      <HistoryRouter history={ history }>
        <HeaderGuest/>
      </HistoryRouter>
    );
    expect( screen.getByRole('link') ).toBeInTheDocument();
    expect( screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('successfully redirect after click on link', async () => {
    history.push('/triggeredForHeaderGuest');
    render(
      <HistoryRouter history={ history }>
        <Routes>
          <Route
            path={ AppRoute.Auth }
            element={ <h1>Auth Screen</h1> }
          />
          <Route
            path='*'
            element={ <HeaderGuest/> }
          />
        </Routes>
      </HistoryRouter>
    );
    const link = screen.getByRole('link');
    expect( screen.queryByText(/Auth Screen/i) ).not.toBeInTheDocument();
    await UserEvent.click( link );
    expect( screen.getByText(/Auth Screen/i) ).toBeInTheDocument();
  });

});
