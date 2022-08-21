import { configureMockStore } from '@jedmao/redux-mock-store';
import { CreateApi } from '../../service/api/api';
import { checkAuth, fetchFavorites, fetchNearOffers, fetchOffers, fetchReviews, ThunkDispatchResualt } from './api-actions';
import { State } from '../../types/state';
import { Action }from 'redux';
import { APIRoute, AuthorizationStatus, FetchProgress } from '../../const';
import { makeFakeOffers, makeFakeAuthUser,makeFakeReviews } from '../../utils/mock';
import { ChangeFavorites, ChangeNearOffers, ChangeOffers, ChangeReviews, RequireAuth, SetUser } from './actions';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { generatePath } from 'react-router-dom';

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
      const fakeUser = makeFakeAuthUser();
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

  describe('Async: fetchOffers', () => {

    it ('should set offers data & change load-flag when server return 200', async () => {
      const fakeOffers = makeFakeOffers();
      fakeAPI
        .onGet(APIRoute.Offers)
        .reply(200, fakeOffers);
      expect(store.getActions()).toEqual( [] );
      await store.dispatch( fetchOffers() );
      expect(store.getActions()).toEqual([
        ChangeOffers({data: [], loadStatus: Pending}),
        ChangeOffers({data: fakeOffers, loadStatus: Fulfilled})
      ]);
    });

    it('should set load-flag to "Rejected" when server return 4**', async () => {
      fakeAPI
        .onGet(APIRoute.Offers)
        .reply( 400 );
      expect(store.getActions()).toEqual([]);
      await store.dispatch( fetchOffers() );
      expect(store.getActions()).toEqual([
        ChangeOffers({data:[], loadStatus: Pending}),
        ChangeOffers({data:[], loadStatus: Rejected})
      ]);
    });

  });

  describe('Async: fetchNearOffers', () => {

    it('should set actual id & nearOffers data & change load-flag when server return 200', async () => {
      const actualFakeId = Math.ceil( Math.random() * 100 );
      const fakeNearOffers = makeFakeOffers().slice(0,3);
      const actualFakeUrl = generatePath( APIRoute.GetNearOffers,{'hotel_id':actualFakeId.toString()});
      fakeAPI
        .onGet(actualFakeUrl)
        .reply(200, fakeNearOffers);
      expect(store.getActions()).toEqual([]);
      await store.dispatch( fetchNearOffers(actualFakeId) );
      expect(store.getActions()).toEqual([
        ChangeNearOffers({id: actualFakeId, data: [], loadStatus: Pending}),
        ChangeNearOffers({id: actualFakeId, data: fakeNearOffers, loadStatus: Fulfilled})
      ]);
    });

    it('should reset id, data & set load-flag to "Rejected" when server return 4**', async () => {
      const actualFakeId = Math.ceil( Math.random() * 100 );
      const actualFakeUrl = generatePath( APIRoute.GetNearOffers,{'hotel_id':actualFakeId.toString()});
      fakeAPI
        .onGet(actualFakeUrl)
        .reply( 400 );
      expect(store.getActions()).toEqual([]);
      await store.dispatch( fetchNearOffers( actualFakeId ) );
      expect(store.getActions()).toEqual([
        ChangeNearOffers({id: actualFakeId, data:[], loadStatus: Pending}),
        ChangeNearOffers({id: null, data:[], loadStatus: Rejected}),
      ]);
    });

  });

  describe('Async: fetcnReviews', () => {

    it('should set id, review data & change load-flag when server return 200', async () => {
      const fakeReviews = makeFakeReviews();
      const actualFakeId = Math.ceil( Math.random() * 100 );
      const actualFakeUrl = generatePath( APIRoute.GetReviews,{'hotel_id':actualFakeId.toString()});
      fakeAPI
        .onGet(actualFakeUrl)
        .reply(200, fakeReviews);
      expect(store.getActions()).toEqual( [] );
      await store.dispatch( fetchReviews(actualFakeId) );
      expect(store.getActions()).toEqual( [
        ChangeReviews({id: actualFakeId, data:[], loadStatus: Pending}),
        ChangeReviews({id: actualFakeId, data:fakeReviews, loadStatus: Fulfilled})
      ]);
    });

    it('should reset id, data & change load-flag to "Rejected" when server return 4**', async () => {
      const actualFakeId = Math.ceil( Math.random() * 100 );
      const actualFakeUrl = generatePath( APIRoute.GetReviews,{'hotel_id':actualFakeId.toString()});
      fakeAPI
        .onGet(actualFakeUrl)
        .reply( 400 );
      expect(store.getActions()).toEqual([]);
      await store.dispatch( fetchReviews(actualFakeId) );
      expect(store.getActions()).toEqual([
        ChangeReviews({id: actualFakeId, data:[], loadStatus: Pending}),
        ChangeReviews({id: null, data:[], loadStatus: Rejected})
      ]);
    });

  });

});
