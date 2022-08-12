import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../../types/state';
import { ChangeOffersList, ChangeReviewsState, FetchNearOffers, RedirectToPath, RequireAuth } from './actions';
import { APIRoute, AppRoute, AuthorizationStatus } from '../../const';
import { Offers } from '../../types/offers';
import { dropToken, saveToken, Token } from '../../service/token/token';
import { Action } from 'redux';
import {generatePath} from 'react-router-dom';
import { Review, ReviewState } from '../../types/reviews';

export type ThunkActionResualt<R = Promise<void>> = ThunkAction< R, State, AxiosInstance, Action>
export type ThunkDispatchResualt = ThunkDispatch< State, AxiosInstance, Action >
export type AuthData = { email: string, password: string }

const fetchOffers = ():ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(ChangeOffersList(data));
  };

const fetchNearOffers = (id: number):ThunkActionResualt =>
  async (dispatch, getState, api) => {
    const {data} = await api.get<Offers>(`${generatePath(APIRoute.GetNearOffers,{'hotel_id': id.toString()})}`);
    if (id !== getState().DATA.nearOffers.id){
      dispatch( FetchNearOffers({id, data}) );
    }
  };

const fetcnReviews = (id: number):ThunkActionResualt =>
  async (dispatch, getState, api) => {
    const {data} = await api.get<Review[]>(`${generatePath(APIRoute.GetReviews,{'hotel_id' : id.toString()})}`);
    if (id !== getState().DATA.reviews.id){
      dispatch( ChangeReviewsState({id, data}) );
    }
  };

const postReview = ( { id, comment, rating }:ReviewState ):ThunkActionResualt =>
  async (dispatch, getState, api) => {
    await api.post< Review[] >( `${generatePath(APIRoute.PostReview, {'hotel_id' : id.toString()})}`,{ comment, rating } )
      .then( ({data}) => dispatch( ChangeReviewsState({id, data}) ))
      .catch((err) => Promise.reject(err));
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
