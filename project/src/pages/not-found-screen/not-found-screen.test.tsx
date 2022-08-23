import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HistoryRouter } from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import NotFoundScreen from './not-found-screen';
import { Route, Routes } from 'react-router-dom';

const history = createMemoryHistory();

describe('Component: NotFoundScreen', () => {

  it('the component has been successfully rendered', () => {
    render(
      <HistoryRouter history={ history }>
        <NotFoundScreen/>
      </HistoryRouter>
    );
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(2);
  });

  it('should redirect to Main Screen when user clicked to link', async () => {

    history.push('/triggered_For_NotFoundScreen');
    render(
      <HistoryRouter history={ history }>
        <Routes>
          <Route
            path='/'
            element={ <h1>This is Main Screen</h1> }
          />
          <Route
            path='*'
            element={<NotFoundScreen/>}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is Main Screen/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getAllByRole('link')[1]);
    expect(screen.getByText(/This is Main Screen/i)).toBeInTheDocument();
  });

});
