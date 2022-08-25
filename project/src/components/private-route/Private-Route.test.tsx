import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { HistoryRouter } from '../history-router/history-router';
import PrivateRoute from './Private-Route';

const history = createMemoryHistory();

describe('Component: PrivateRoute', () => {
  beforeEach(() => history.push('/private') );

  it('should render component for public route when authStatus "NoAuth"', () => {
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route 
            path={ AppRoute.Auth }
            element={ <h1> Public Route </h1> }
          />
          <Route 
            path='/private' 
            element={ 
              <PrivateRoute
                authorizationStatus={ AuthorizationStatus.NoAuth }
              >
                <h1> Private Route </h1>
              </PrivateRoute>
            }
          />
        </Routes>
      </HistoryRouter>);

      expect( screen.getByText(/Public Route/i) ).toBeInTheDocument();
      expect( screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route when authStatus "Auth"', () => {
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route 
            path={ AppRoute.Auth }
            element={ <h1> Public Route </h1> }
          />
          <Route 
            path='/private' 
            element={ 
              <PrivateRoute
                authorizationStatus={ AuthorizationStatus.Auth }
              >
                <h1> Private Route </h1>
              </PrivateRoute>
            }
          />
        </Routes>
      </HistoryRouter>);

      expect( screen.getByText(/Private Route/i)).toBeInTheDocument();
      expect( screen.queryByText(/Public Route/i) ).not.toBeInTheDocument();
  });

});
