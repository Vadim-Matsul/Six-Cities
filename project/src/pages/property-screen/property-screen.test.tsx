import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HistoryRouter } from '../../components/history-router/history-router';
import { AuthorizationStatus, FetchProgress } from '../../const';
import { makeFakeAuthUser, makeFakeOffers, makeFakeReviews } from '../../utils/mock';
import PropertyScreen from './property-screen';

const fakeOffers = makeFakeOffers();
const mockId = { id: fakeOffers[0]['id'].toString() };
const fakeUser = makeFakeAuthUser();

const layout = (authStatus: AuthorizationStatus) => ({
  USER:{
    authStatus: authStatus,
    user: fakeUser,
    logoutProcess: false,
    logoutError: false },
  DATA:{
    nearOffers: {id: 1, data: makeFakeOffers().slice(0,3), loadStatus: FetchProgress.Fulfilled },
    reviews: {id: 1, data: makeFakeReviews(), loadStatus: FetchProgress.Fulfilled },
    favorites: { data: fakeOffers.slice().filter((offer) => offer.isFavorite)}
  }
});

const makeFakeStore = configureMockStore< ReturnType<typeof layout> >( [thunk] );

const history = createMemoryHistory();


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockId
}));

describe('Component: PropertyScreen', () => {

  it('successfully render when authStatus is "AUTH"', () => {
    const store = makeFakeStore( layout(AuthorizationStatus.Auth) );
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <PropertyScreen offers={ fakeOffers }/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('FormReview')).toBeInTheDocument();
  });

  it('successfully render when authStatus is "NOAUTH"', () => {
    const store = makeFakeStore( layout(AuthorizationStatus.NoAuth) );
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <PropertyScreen offers={ fakeOffers }/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.queryByTestId('FormReview')).not.toBeInTheDocument();
  });

  it('correctly render when reviews & near-offers are not loaded', () => {
    const store = makeFakeStore({
      USER:{
        authStatus: AuthorizationStatus.Auth,
        user: fakeUser,
        logoutProcess: false,
        logoutError: false },
      DATA:{
        nearOffers: {id: Number(mockId), data: [], loadStatus: FetchProgress.Fulfilled },
        reviews: {id: Number(mockId), data: [], loadStatus: FetchProgress.Fulfilled },
        favorites: { data: fakeOffers.slice().filter((offer) => offer.isFavorite)}
      }
    });
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <PropertyScreen offers={ fakeOffers }/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.queryByTestId('FormReview')).not.toBeInTheDocument();
    expect(screen.queryByText(/Reviews/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Other places in the neighbourhood/i)).not.toBeInTheDocument();
  });

});
