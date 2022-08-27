import { configureMockStore } from '@jedmao/redux-mock-store';
import { CreateApi } from '../../service/api/api';
import { AuthData, checkAuth, fetchFavorites, fetchNearOffers, fetchOffers, fetchReviews, loginSession, logoutSession, postFavorites, postReview, ThunkDispatchResualt } from './api-actions';
import { State } from '../../types/state';
import { Action }from 'redux';
import { APIRoute, AppRoute, AuthorizationStatus, FetchProgress } from '../../const';
import { makeFakeOffers, makeFakeAuthUser,makeFakeReviews } from '../../utils/mock';
import { ChangeFavorites, ChangeNearOffers, ChangeOffers, ChangeReviews, RedirectToPath, RequireAuth, SetLogoutError, SetLogOutProcess, SetUser } from './actions';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { generatePath } from 'react-router-dom';
import { ReviewState } from '../../types/reviews';
import { clearSession, getActualArr } from '../../utils/utils';

const api = CreateApi();
const fakeAPI = new MockAdapter( api );

const makeFakeStore = configureMockStore< State, Action, ThunkDispatchResualt >( [thunk.withExtraArgument(api)] );
const store = makeFakeStore();

const { Auth, NoAuth } = AuthorizationStatus;
const { Fulfilled, Pending, Rejected, Idle } = FetchProgress;


describe('Middleware: Thunk', () => {

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
      const favorites = fakeOffers.slice().filter( (offer) => offer.isFavorite );

      fakeAPI
        .onGet(APIRoute.Offers)
        .reply(200, fakeOffers);
      expect(store.getActions()).toEqual( [] );
      await store.dispatch( fetchOffers() );
      expect(store.getActions()).toEqual([
        ChangeOffers({data: [], loadStatus: Pending}),
        ChangeFavorites({data: favorites, loadStatus: Fulfilled}),
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

  describe('Async: loginSession', () => {

    it('should send user-data, change auth-flag & do redirect when server return 200', async () => {
      const fakeAuthUser = makeFakeAuthUser();
      const fakeAuthData:AuthData = { email: fakeAuthUser.email, password: 'juniorFD'};
      Storage.prototype.setItem = jest.fn();
      fakeAPI
        .onPost(APIRoute.Login)
        .reply(200, fakeAuthUser);

      expect(store.getActions()).toEqual([]);
      await store.dispatch( loginSession( fakeAuthData ) );
      expect(store.getActions()).toEqual([
        RequireAuth(Auth),
        SetUser(fakeAuthUser),
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith('six-cities', fakeAuthUser.token);
    });

  });

  describe('Async: postReview', () => {

    it('should send user review data & change review state when server return 200', async () => {
      const fakeOfferId = Math.ceil( Math.random() * 100 );
      const fakePostReviews = makeFakeReviews();
      const reviewState:ReviewState = { id: fakeOfferId, rating: 4.6, comment: 'Hello async tests!' };
      const actualUrl = generatePath(APIRoute.PostReview, {'hotel_id' : fakeOfferId.toString()});
      fakeAPI
        .onPost(actualUrl)
        .reply(200, fakePostReviews);

      expect(store.getActions()).toEqual( [] );
      await store.dispatch( postReview( reviewState ) );
      expect(store.getActions()).toEqual([
        ChangeReviews({id: fakeOfferId, data: [], loadStatus: Pending}),
        ChangeReviews({id: fakeOfferId, data: fakePostReviews, loadStatus: Fulfilled })
      ]);
    });

    it('should reset id & reviews data when server return 4**', async () => {
      const fakeOfferId = Math.ceil( Math.random() * 100 );
      const reviewState:ReviewState = { id: fakeOfferId, rating: 4.9, comment: 'Hello async test!' };
      const actualUrl = generatePath(APIRoute.PostReview, {'hotel_id' : fakeOfferId.toString()});
      fakeAPI
        .onPost(actualUrl)
        .reply( 400 );

      expect(store.getActions()).toEqual([]);
      await store.dispatch( postReview(reviewState) );
      expect(store.getActions()).toEqual([
        ChangeReviews({id: fakeOfferId, data: [], loadStatus: Pending}),
        ChangeReviews({id: null, data: [], loadStatus: Rejected})
      ]);

    });

  });

  describe('Async: logoutSession', () => {

    it('should clear data favorite, change auth-flag to "UnAuth" & change isFavorite to false in actual offer data', async () => {
      const offers = makeFakeOffers();
      const offersWithoutIsFavoriteTrue = clearSession( offers );
      Storage.prototype.removeItem = jest.fn();
      const fakeStore = makeFakeStore({
        DATA:{ offers:{ data: offers }
        }});
      fakeAPI
        .onDelete(APIRoute.Logout)
        .reply( 200 );

      expect(fakeStore.getActions()).toEqual( [] );
      await fakeStore.dispatch( logoutSession() );
      expect(fakeStore.getActions()).toEqual([
        SetLogOutProcess(true),
        ChangeOffers({data: offersWithoutIsFavoriteTrue, loadStatus: Fulfilled}),
        ChangeFavorites({data: [], loadStatus: Idle}),
        RequireAuth( NoAuth ),
        RedirectToPath( AppRoute.Auth ),
        SetUser(null),
        SetLogOutProcess(false)
      ]);
      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(Storage.prototype.removeItem).toBeCalledWith('six-cities');
    });

    it('should set error & change logoutProcess when server return 4**', async () => {
      const fakeStore = makeFakeStore();
      fakeAPI
        .onDelete(APIRoute.Logout)
        .reply( 400 );

      expect(fakeStore.getActions()).toEqual( [] );
      await fakeStore.dispatch( logoutSession() );
      expect(fakeStore.getActions()).toEqual([
        SetLogOutProcess(true),
        SetLogoutError( true ),
        SetLogOutProcess(false)
      ]);
    });

  });

  describe('Async: postFavorites', () => {

    it('should get offer with actual isFavorite status and set it in favorites, nearOffers & change offer data when server return 200', async () => {
      const fakeOffers = makeFakeOffers();
      const isFavorite:boolean = fakeOffers[0].isFavorite;
      const offerBackEnd = {...fakeOffers[0], isFavorite: !isFavorite};
      const actualUrl = generatePath(APIRoute.PostFavorite, {
        'hotel_id' : fakeOffers[0].id.toString(), 'status' : isFavorite ? '0' : '1'
      });
      const actualArr = getActualArr(fakeOffers, offerBackEnd);
      const fakeNearOffers = fakeOffers.slice(0,3);
      const actualNearOffersArr = getActualArr(fakeNearOffers, offerBackEnd);
      const filteredActualArr = actualArr.filter((offer) => offer.isFavorite);
      const fakeStore = makeFakeStore({
        DATA:{
          favorites: {
            data: [],
            loadStatus: Idle
          },
          offers:{
            data: fakeOffers,
            loadStatus: Fulfilled
          },
          nearOffers:{
            id: 57,
            data: fakeNearOffers,
            loadStatus: Fulfilled
          }
        }
      });
      fakeAPI
        .onPost(actualUrl)
        .reply(200, offerBackEnd);

      expect(fakeStore.getActions()).toEqual([]);
      await fakeStore.dispatch( postFavorites(fakeOffers[0].id.toString(), !isFavorite) );
      expect(fakeStore.getActions()).toEqual([
        ChangeFavorites({data: [], loadStatus: Pending}),
        ChangeOffers({data: actualArr, loadStatus: Fulfilled}),
        ChangeFavorites({data: filteredActualArr, loadStatus: Fulfilled}),
        ChangeNearOffers({id: 57, data: actualNearOffersArr, loadStatus: Fulfilled})
      ]);
    });

    it('should set auth-flag in favorites data to "Rejected" when server return 4**', async () => {
      const someId = Math.round( Math.random() );
      const someBoolean = !!someId ;
      const actualUrl = generatePath(APIRoute.PostFavorite, {
        'hotel_id' : someId.toString(), 'status' : someBoolean ? '0' : '1'
      });
      const fakeStore = makeFakeStore({
        DATA:{
          favorites: {
            data: [],
            loadStatus: Idle
          }}
      });
      fakeAPI
        .onGet(actualUrl)
        .reply( 400 );

      expect(fakeStore.getActions()).toEqual([]);
      await fakeStore.dispatch( postFavorites(someId.toString(), !someBoolean) );
      expect(fakeStore.getActions()).toEqual([
        ChangeFavorites({data:[], loadStatus: Pending }),
        ChangeFavorites({data:[], loadStatus: Rejected })
      ]);

    });

  });

});
