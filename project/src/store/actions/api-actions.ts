import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ChangeOffers, ChangeReviews, ChangeNearOffers, RedirectToPath, RequireAuth, ChangeFavorites, SetUser } from './actions';
import { APIRoute, AppRoute, AuthorizationStatus, FavoritesConfig, FetchProgress } from '../../const';
import { dropToken, saveToken } from '../../service/token/token';
import { Review, ReviewState } from '../../types/reviews';
import { Offer, Offers } from '../../types/offers';
import { clearSession } from '../../utils/utils';
import { State, AuthUser } from '../../types/state';
import { generatePath } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosInstance } from 'axios';
import { Action } from 'redux';

export type ThunkActionResualt<R = Promise<void>> = ThunkAction< R, State, AxiosInstance, Action>
export type ThunkDispatchResualt = ThunkDispatch< State, AxiosInstance, Action >
export type AuthData = { email: string, password: string }

const { Fulfilled, Rejected, Pending, Idle} = FetchProgress;
const { Auth, NoAuth } = AuthorizationStatus;


const fetchOffers = ():ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    dispatch( ChangeOffers({data: [], loadStatus: Pending}) );
    await api.get<Offers>(APIRoute.Offers)
      .then(({data}) => {
        dispatch(ChangeOffers({data, loadStatus: Fulfilled}));
      })
      .catch((err: Error) => {
        toast.error(err.message);
        dispatch(ChangeOffers({data: [], loadStatus: Rejected}));
      });
  };

const fetchNearOffers = (id: number):ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    dispatch(ChangeNearOffers({id, data:[], loadStatus: Pending}));
    await api.get<Offers>(`${generatePath(APIRoute.GetNearOffers,{'hotel_id': id.toString()})}`)
      .then(({data}) => dispatch( ChangeNearOffers({id, data, loadStatus: Fulfilled}) ))
      .catch((err:Error) => {
        toast.error(err.message);
        dispatch(ChangeNearOffers({id:null, data:[], loadStatus: Rejected}));
      });
  };

const fetchReviews = (id: number):ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    dispatch(ChangeReviews({id, data:[], loadStatus: Pending}));
    await api.get<Review[]>(`${generatePath(APIRoute.GetReviews,{'hotel_id' : id.toString()})}`)
      .then(({data}) => {
        dispatch( ChangeReviews({id, data, loadStatus: Fulfilled}) );
      })
      .catch((err) => {
        toast.error(err.message);
        dispatch(ChangeReviews({id:null, data:[], loadStatus: Rejected}));
      });
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
  async (dispatch, _getState, api) => {
    dispatch(ChangeFavorites({data: [], loadStatus: Pending }));
    await api.get< Offers >(APIRoute.GetFavorites)
      .then( ({data}) => {
        dispatch(ChangeFavorites({data, loadStatus: Fulfilled }));
      })
      .catch((err: Error) => {
        toast.error(err.message);
        dispatch(ChangeFavorites({data: [], loadStatus: Rejected }));
      });
  };

const postFavorites = (id: string, status: boolean):ThunkActionResualt =>
  async (dispatch, getState, api) => {
    if (getState().USER.authStatus === NoAuth){
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
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(
        (response) => {
          if (response && response.data){
            dispatch(RequireAuth(Auth));
            dispatch(SetUser(response.data) );
          }
        },
        (err) => dispatch(RequireAuth(NoAuth)) );
  };

const loginSession = ({ email, password }:AuthData):ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post<AuthUser>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(RequireAuth(Auth));
    dispatch(RedirectToPath(AppRoute.Main));
    dispatch(SetUser(data));
  };

const logoutSession = ():ThunkActionResualt<void> =>
  async (dispatch, getState, api) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    const notElectedArr = clearSession(getState().DATA.offers.data);
    dispatch(ChangeOffers({data: notElectedArr, loadStatus: Fulfilled}) );
    dispatch(ChangeFavorites({data: [], loadStatus: Idle }) );
    dispatch(RequireAuth(NoAuth) );
    dispatch(SetUser(null) );
  };

export {
  fetchOffers,
  postFavorites,
  checkAuth,
  loginSession,
  logoutSession,
  fetchNearOffers,
  fetchFavorites,
  fetchReviews,
  postReview
};


