import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../../types/state';
import { ChangeOffersList, RedirectToPath, RequireAuth } from './actions';
import { APIRoute, AppRoute, AuthorizationStatus } from '../../const';
import { Offers } from '../../types/offers';
import { dropToken, saveToken, Token } from '../../service/token/token';
import { Action } from 'redux';

export type ThunkActionResualt<R = Promise<void>> = ThunkAction< R, State, AxiosInstance, Action>
export type ThunkDispatchResualt = ThunkDispatch< State, AxiosInstance, Action >
export type AuthData = { email: string, password: string }

const fetchOffers = ():ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(ChangeOffersList(data));
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
  logoutSession
};
