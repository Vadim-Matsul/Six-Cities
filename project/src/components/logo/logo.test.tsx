import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HistoryRouter } from '../history-router/history-router';
import Logo from './logo';
import { Route, Routes } from 'react-router-dom';

const history = createMemoryHistory();

describe('Component: Logo', () => {

  it('the component has been successfully rendered', () => {
    render(
      <HistoryRouter history={ history }>
        <Logo/>
      </HistoryRouter>
    );
    expect( screen.getByAltText(/6 cities logo/i) ).toBeInTheDocument();
    expect( screen.getByRole('link') ).toBeInTheDocument();
  });

  it('should redirect to Main Screen when user clicked to link', async () => {

    history.push('/triggeredForLogo');
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='/'
            element={ <h1>This is Main Screen</h1> }
          />
          <Route
            path='*'
            element={ <Logo/> }
          />
        </Routes>
      </HistoryRouter>
    );
    expect( screen.queryByText(/This is Main Screen/i) ).not.toBeInTheDocument();
    await userEvent.click( screen.getByRole('link') );
    expect (screen.getByText(/This is Main Screen/i) ).toBeInTheDocument();
  });

});
