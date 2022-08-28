import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { INITIAL_CURRENT_CITY } from '../../../const';
import { HistoryRouter } from '../../history-router/history-router';
import AuthScreenCity from './auth-screen-city';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('component: AuthScreenCity', () => {

  it('successful redirect after click', async () => {

    const changeCity = jest.fn();
    render(
      <HistoryRouter history={ history }>
        <AuthScreenCity
          onClick={changeCity}
          randomCity={INITIAL_CURRENT_CITY}
        />
      </HistoryRouter>
    );

    const link = screen.getByTestId('AuthScreenCity');
    expect(link).toBeInTheDocument();
    await userEvent.click(link);
    expect(changeCity).toBeCalledTimes(1);
  });

});
