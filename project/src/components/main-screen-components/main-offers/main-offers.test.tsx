import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeOffers } from '../../../utils/mock';
import MainOffers from './main-offers';
import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../../const';
import { HistoryRouter } from '../../history-router/history-router';
import { createMemoryHistory } from 'history';

const fakeOffers = makeFakeOffers();
const city = fakeOffers[0]['city']['name'];

const history = createMemoryHistory();
const makeFakeStore = configureMockStore();
const store = makeFakeStore({
  LOGIC:{ currentSort: 'Popular' },
  USER:{ authStatus: AuthorizationStatus.Auth }
});

describe('Component: MainOffers', () => {

  it('sucessfully render', () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <MainOffers
            offersOfCity={ fakeOffers }
            currentCity={ city }
          />
        </HistoryRouter>
      </Provider>
    );
    expect( screen.getByText(`${fakeOffers.length} places to stay in ${city}`) ).toBeInTheDocument();
  });

});
