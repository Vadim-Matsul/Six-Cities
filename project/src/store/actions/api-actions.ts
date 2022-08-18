import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State, User } from '../../types/state';
import { ChangeOffers, ChangeReviews, ChangeNearOffers, RedirectToPath, RequireAuth, ChangeFavorites, SetUser } from './actions';
import { APIRoute, AppRoute, AuthorizationStatus, FavoritesConfig, FetchProgress } from '../../const';
import { Offer, Offers } from '../../types/offers';
import { dropToken, saveToken } from '../../service/token/token';
import { Action } from 'redux';
import {generatePath} from 'react-router-dom';
import { Review, ReviewState } from '../../types/reviews';
import { toast } from 'react-toastify';
import { clearSession } from '../../utils/utils';

export type ThunkActionResualt<R = Promise<void>> = ThunkAction< R, State, AxiosInstance, Action>
export type ThunkDispatchResualt = ThunkDispatch< State, AxiosInstance, Action >
export type AuthData = { email: string, password: string }

const { Fulfilled, Rejected, Pending, Idle} = FetchProgress;

const fetchOffers = ():ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    dispatch( ChangeOffers({data: [], loadStatus: Pending}) );
    await api.get<Offers>(APIRoute.Offers)
      .then(({data}) => {
        dispatch(ChangeOffers({data, loadStatus: Fulfilled}));
      })
      .catch((err: Error) => toast.error(err.message) );
  };

const fetchNearOffers = (id: number):ThunkActionResualt =>
  async (dispatch, getState, api) => {
    getState().DATA.nearOffers.loadStatus !== Pending && dispatch(ChangeNearOffers({...getState().DATA.nearOffers, loadStatus: Pending}));
    await api.get<Offers>(`${generatePath(APIRoute.GetNearOffers,{'hotel_id': id.toString()})}`)
      .then(({data}) => {
        if (data && getState().DATA.nearOffers.loadStatus !== Fulfilled ){
          dispatch( ChangeNearOffers({id, data, loadStatus: Fulfilled}) );
        }
      })
      .catch((err) => {
        toast.error(err.message);
        dispatch(ChangeNearOffers({...getState().DATA.nearOffers, loadStatus: Rejected}));
      });
  };

const fetcnReviews = (id: number):ThunkActionResualt =>
  async (dispatch, getState, api) => {
    if (id !== getState().DATA.reviews.id){
      getState().DATA.reviews.loadStatus !== Pending && dispatch(ChangeReviews({...getState().DATA.reviews, loadStatus: Pending}));
      await api.get<Review[]>(`${generatePath(APIRoute.GetReviews,{'hotel_id' : id.toString()})}`)
        .then(({data}) => {
          getState().DATA.reviews.loadStatus !== Fulfilled && dispatch( ChangeReviews({id, data, loadStatus: Fulfilled}) );
        })
        .catch((err) => {
          toast.error(err.message);
          dispatch(ChangeReviews({...getState().DATA.reviews, loadStatus: Rejected}));
        });
    }
  };

const postReview = ( { id, comment, rating }:ReviewState ):ThunkActionResualt =>
  async (dispatch, getState, api) => {
    dispatch(ChangeReviews({...getState().DATA.reviews, loadStatus: Pending}));
    await api.post< Review[] >( `${generatePath(APIRoute.PostReview, {'hotel_id' : id.toString()})}`,{ comment, rating } )
      .then( ({data}) => dispatch( ChangeReviews({id, data, loadStatus: Fulfilled}) ))
      .catch((err) => {
        dispatch(ChangeReviews({...getState().DATA.reviews, loadStatus: Rejected}));
        Promise.reject(err);
      });
  };

const fetchFavorites = ():ThunkActionResualt =>
  async (dispatch, getState, api) => {
    if (getState().USER.authStatus === AuthorizationStatus.Auth ){
      getState().DATA.favorites.loadStatus !== Pending && dispatch(ChangeFavorites({...getState().DATA.favorites, loadStatus: Pending }));
      await api.get< Offers >(APIRoute.GetFavorites)
        .then( ({data}) => {
          getState().DATA.favorites.loadStatus !== Fulfilled && dispatch(ChangeFavorites({data, loadStatus: Fulfilled }));
        })
        .catch((err) => {
          toast.error(err);
          dispatch(ChangeFavorites({...getState().DATA.favorites, loadStatus: Rejected }));
        });
    }
  };

const postFavorites = (id: string, status: boolean):ThunkActionResualt =>
  async (dispatch, getState, api) => {
    if (getState().USER.authStatus === AuthorizationStatus.NoAuth){
      toast.info('Вам необходимо авторизоваться'); return;
    }
    dispatch( ChangeFavorites({...getState().DATA.favorites, loadStatus: Pending }) );
    await api.post< Offer >(`${generatePath(APIRoute.PostFavorite, {
      'hotel_id':id,
      'status': status ? FavoritesConfig.add : FavoritesConfig.remove
    })}`)
      .then(({data}) => {
        const offers = getState().DATA.offers.data ;
        const index = offers.findIndex((offer) => offer.id === data.id) ;
        const actualArr = [...offers.slice(0, index), data, ...offers.slice(index + 1)] ;
        dispatch( ChangeOffers({...getState().DATA.offers, data: actualArr}) ) ;
        dispatch( ChangeFavorites({data:actualArr.filter((offer) => offer.isFavorite), loadStatus: Fulfilled}) ) ;
      })
      .catch((err) => {
        toast.error(err);
        dispatch( ChangeFavorites({...getState().DATA.favorites, loadStatus: Rejected }) );
      });
  };

const checkAuth = ():ThunkActionResualt =>
  async (dispatch, getState, api) => {
    await api.get(APIRoute.Login)
      .then(
        (response) => {
          if (response && response.data && getState().USER.authStatus !== AuthorizationStatus.Auth){
            dispatch(RequireAuth(AuthorizationStatus.Auth));
            dispatch(SetUser(response.data) );
          }
        },
        (err) => dispatch(RequireAuth(AuthorizationStatus.NoAuth)) );
  };

const loginSession = ({ email, password }:AuthData):ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(RequireAuth(AuthorizationStatus.Auth));
    dispatch(RedirectToPath(AppRoute.Main));
    dispatch(SetUser(data));
  };

const logoutSession = ():ThunkActionResualt =>
  async (dispatch, getState, api) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    const notElectedArr = clearSession(getState().DATA.offers.data);
    dispatch(ChangeOffers({data: notElectedArr, loadStatus: Fulfilled}) );
    dispatch(ChangeFavorites({data: [], loadStatus: Idle }) );
    dispatch(RequireAuth(AuthorizationStatus.NoAuth) );
    dispatch(SetUser(null) );
  };

export {
  fetchOffers,
  fetchFavorites,
  postFavorites,
  checkAuth,
  loginSession,
  logoutSession,
  fetchNearOffers,
  fetcnReviews,
  postReview
};
