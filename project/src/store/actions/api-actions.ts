import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../../types/state';
import { ChangeOffers, ChangeReviews, ChangeNearOffers, RedirectToPath, RequireAuth } from './actions';
import { APIRoute, AppRoute, AuthorizationStatus, FetchProgress } from '../../const';
import { Offers } from '../../types/offers';
import { dropToken, saveToken, Token } from '../../service/token/token';
import { Action } from 'redux';
import {generatePath} from 'react-router-dom';
import { Review, ReviewState } from '../../types/reviews';
import { toast } from 'react-toastify';

export type ThunkActionResualt<R = Promise<void>> = ThunkAction< R, State, AxiosInstance, Action>
export type ThunkDispatchResualt = ThunkDispatch< State, AxiosInstance, Action >
export type AuthData = { email: string, password: string }

const { Fulfilled, Rejected, Pending } = FetchProgress;

const fetchOffers = ():ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    dispatch( ChangeOffers({data: [], loadStatus: Pending}) );
    await api.get<Offers>(APIRoute.Offers)
      .then(({data}) => {
        dispatch(ChangeOffers({data, loadStatus: Fulfilled}));
      })
      .catch((err: Error) => toast.warn(err.message) );
  };

const fetchNearOffers = (id: number):ThunkActionResualt =>
  async (dispatch, getState, api) => {
    if (id !== getState().DATA.nearOffers.id){
      dispatch(ChangeNearOffers({...getState().DATA.nearOffers, loadStatus: Pending}));
      await api.get<Offers>(`${generatePath(APIRoute.GetNearOffers,{'hotel_id': id.toString()})}`)
        .then(({data}) => {
          dispatch( ChangeNearOffers({id, data, loadStatus: Fulfilled}) );
        })
        .catch((err) => {
          toast.warn(err.message);
          dispatch(ChangeNearOffers({...getState().DATA.nearOffers, loadStatus: Rejected}));
        });
    }
  };

const fetcnReviews = (id: number):ThunkActionResualt =>
  async (dispatch, getState, api) => {
    if (id !== getState().DATA.reviews.id){
      dispatch(ChangeReviews({...getState().DATA.reviews, loadStatus: Pending}));
      await api.get<Review[]>(`${generatePath(APIRoute.GetReviews,{'hotel_id' : id.toString()})}`)
        .then(({data}) => {
          dispatch( ChangeReviews({id, data, loadStatus: Fulfilled}) );
        })
        .catch((err) => {
          toast.warn(err.message);
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

const checkAuth = ():ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(
        () => dispatch(RequireAuth(AuthorizationStatus.Auth)),
        () => dispatch(RequireAuth(AuthorizationStatus.NoAuth)) );
  };

const loginSession = ({ email, password }:AuthData):ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    const {data:{token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(RequireAuth(AuthorizationStatus.Auth));
    dispatch(RedirectToPath(AppRoute.Main));
  };

const logoutSession = ():ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(RequireAuth(AuthorizationStatus.NoAuth));
  };

export {
  fetchOffers,
  checkAuth,
  loginSession,
  logoutSession,
  fetchNearOffers,
  fetcnReviews,
  postReview
};
