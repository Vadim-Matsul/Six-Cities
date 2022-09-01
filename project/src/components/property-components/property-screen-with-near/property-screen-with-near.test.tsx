import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../../const';
import { makeFakeOffer, makeFakeOffers } from '../../../utils/mock';
import { HistoryRouter } from '../../history-router/history-router';
import PropertyScreenWithNear from './property-screen-with-near';


const data = makeFakeOffer();
const fakeOffers = makeFakeOffers().slice(0,3);
const history = createMemoryHistory();
const makeFakeStore = configureMockStore();
const store = makeFakeStore({
  USER:{ authStatus: AuthorizationStatus.Auth }
})


describe('Component: PropertyScreenWithNear', () => {

  it('successfully render', () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <PropertyScreenWithNear
            nearOffers={ fakeOffers }
            data={ data }
          />
        </HistoryRouter>
      </Provider>
    );
    expect( screen.getByTestId('Map') ).toBeInTheDocument();
    expect( screen.getByText(/Other places in the neighbourhood/i) ).toBeInTheDocument();
  });    

});
