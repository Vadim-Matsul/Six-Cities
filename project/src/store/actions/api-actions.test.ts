import { configureMockStore } from '@jedmao/redux-mock-store';
import { CreateApi } from '../../service/api/api';
import { checkAuth, fetchFavorites, ThunkDispatchResualt } from './api-actions';
import { State } from '../../types/state';
import { Action }from 'redux';
import { APIRoute, AuthorizationStatus, FetchProgress } from '../../const';
import { makeFakeOffers, makeFakeUser } from '../../utils/mock';
import { ChangeFavorites, RequireAuth, SetUser } from './actions';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';

const api = CreateApi();
const fakeAPI = new MockAdapter( api );

const makeFakeStore = configureMockStore< State, Action, ThunkDispatchResualt >( [thunk.withExtraArgument(api)] );
const store = makeFakeStore();

const { Auth, NoAuth } = AuthorizationStatus;
const { Fulfilled, Pending, Rejected } = FetchProgress;


describe("Middleware: Thunk", () => {

  beforeEach(() => {
    store.clearActions();
  });

  describe('Async: checkAuth', () => {

    it('should set auth-flag to "AUTH" & set user data when server return 200', async () => {
      const fakeUser = makeFakeUser();
      fakeAPI
        .onGet( APIRoute.Login )
        .reply(200, fakeUser);
      
      expect(store.getActions()).toEqual([]);
      await store.dispatch( checkAuth() );
      expect(store.getActions()).toEqual([
        RequireAuth( Auth ),
        SetUser( fakeUser )
      ]);
    });

    it('should set auth-flag to "UNAUTH" when server return 401', async () => {
      fakeAPI
        .onGet( APIRoute.Login )
        .reply( 401 );

      expect(store.getActions()).toEqual([]);
      await store.dispatch( checkAuth() );
      expect(store.getActions()).toEqual([
        RequireAuth( NoAuth )
      ]);
    });

  });

  describe('Async: fetchFavorites', () => {

    it('should set offers data & change load-flag when server return 200', async () => {
      const fakeOffers = makeFakeOffers();
      fakeAPI
        .onGet(APIRoute.GetFavorites)
        .reply(200, fakeOffers);

      expect(store.getActions()).toEqual([]);
      await store.dispatch( fetchFavorites() );
      expect(store.getActions()).toEqual([
        ChangeFavorites({data:[], loadStatus: Pending }),
        ChangeFavorites({data: fakeOffers, loadStatus: Fulfilled })
      ]);
    });

    it('should set load-flag to "Regected" when server return 4**', async() => {
      fakeAPI
        .onGet( APIRoute.GetFavorites )
        .reply( 400 );

      expect(store.getActions()).toEqual( [] );
      await store.dispatch( fetchFavorites() );
      expect(store.getActions()).toEqual([
        ChangeFavorites({data: [], loadStatus: Pending }),
        ChangeFavorites({data: [], loadStatus: Rejected })
      ]);

    });

  });

});
