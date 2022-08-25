import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus, CardPageClass } from '../../const';
import { makeFakeOffers } from '../../utils/mock';
import { HistoryRouter } from '../history-router/history-router';
import OfferList from './offer-list';


const makeFakeStore = configureMockStore();
const store = makeFakeStore( { USER: {authStatus: AuthorizationStatus.Auth} } );

const history = createMemoryHistory();

const fakeOffers = makeFakeOffers();

describe('Component: OfferList', () => {

  it('correctly render', () => {

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <OfferList
            offers={ fakeOffers }
            cardClass={ CardPageClass.Main }
          />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getAllByTestId('OfferCard').length).toBe( fakeOffers.length );
  });

});

