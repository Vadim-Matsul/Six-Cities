import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';

import { AppRoute, AuthorizationStatus, CardPageClass } from '../../../const';
import { HistoryRouter } from '../../history-router/history-router';
import { makeFakeOffer } from '../../../utils/mock';

import OfferCard from './offer-card';


const fakeSetSelectedOffer = jest.fn();

const fakeOffer = makeFakeOffer();

const history = createMemoryHistory();

const makeFakeStore = configureMockStore();
const store = makeFakeStore(
  { USER:{ authStatus: AuthorizationStatus.Auth } }
);

describe('Component: OfferCard', () => {

  const makeDefaultCheck = (fO: typeof fakeOffer):void => {
    expect(screen.getByAltText(fO.title)).toBeInTheDocument();
    expect(screen.getByTestId('OfferCard-title').textContent).toBe(fO.title);
    expect(screen.getByTestId('OfferCard-price').textContent).toBe(`€${fO.price}`);
    expect(screen.getByTestId('Rating-block').textContent).toBe(`Rating ${fO.rating}`);
  };

  it('successfully render', () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <OfferCard
            offer={ fakeOffer }
            cardClass={ CardPageClass.Main }
          />
        </HistoryRouter>
      </Provider>
    );
    makeDefaultCheck(fakeOffer);
  });

  it('successfully hover & unhover on the card', async () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <OfferCard
            offer={ fakeOffer }
            cardClass={ CardPageClass.Main }
            setSelectedOffer={ fakeSetSelectedOffer }
          />
        </HistoryRouter>
      </Provider>
    );
    makeDefaultCheck(fakeOffer);
    const card = screen.getByTestId('OfferCard');

    await UserEvent.hover( card );

    expect( fakeSetSelectedOffer ).toBeCalledTimes(1);
    expect( fakeSetSelectedOffer ).toBeCalledWith( fakeOffer.id );

    await UserEvent.unhover( card );

    expect( fakeSetSelectedOffer ).toBeCalledTimes(2);
    expect( fakeSetSelectedOffer ).toBeCalledWith( null );
  });

  it('successfully redirect after user click on the title link', async () => {

    history.push('/triggered/for/OfferCard');
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <Routes>
            <Route
              path='*'
              element={
                <OfferCard
                  offer={ fakeOffer }
                  cardClass={ CardPageClass.Main }
                />
              }
            />
            <Route
              path={`${AppRoute.Property}/${fakeOffer.id}`}
              element={ <h1>Property Screen</h1> }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );
    makeDefaultCheck(fakeOffer);
    const title = screen.getByTestId('OfferCard-title');

    expect(screen.queryByText(/Property Screen/i)).not.toBeInTheDocument();
    await UserEvent.click( title );
    expect(screen.getByText(/Property Screen/i)).toBeInTheDocument();
  });

});

