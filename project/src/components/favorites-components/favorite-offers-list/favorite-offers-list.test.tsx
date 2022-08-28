import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../../const';
import { makeFakeOffers } from '../../../utils/mock';
import { HistoryRouter } from '../../history-router/history-router';
import FavoriteOffersList from './favorite-offers-list';

const fakeOffers = makeFakeOffers();
const count = fakeOffers.length;
const layout = {
  USER:{
    authStatus: AuthorizationStatus.Auth
  }
};
const makeFakeStore = configureMockStore();
const store = makeFakeStore(layout);
const history = createMemoryHistory();

describe('Component: FavoriteOffersList', () => {

  it('successfully render', () => {

    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <FavoriteOffersList
            offers={ fakeOffers }
          />
        </HistoryRouter>
      </Provider>
    );
    const checkAllIdLength = (testId:string) => screen.getAllByTestId('OfferCard-title').length;

    expect( checkAllIdLength('OfferCard-title') ).toBe(count);
    expect( checkAllIdLength('FavoritesCity') ).toBe(count);
    expect( checkAllIdLength('FavoriteOffersList') ).toBe(count);
  });

});
