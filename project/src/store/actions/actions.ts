import { AppRoute, AuthorizationStatus } from '../../const';
import { Offers } from '../../types/offers';
import { createAction } from '@reduxjs/toolkit';

enum ActionsType {
  CurrentCity = 'info/currentCity',
  OffersList = 'data/offers',
  CurrentSort = 'info/currentSort',
  RequireAuth = 'status/auth',
  Redirect = 'redirect'
}

const ChangeCurrentCity = createAction( ActionsType.CurrentCity, (city: string) => ({payload: city}) );
const ChangeOffersList = createAction( ActionsType.OffersList, (offers: Offers) => ({payload: offers}) );
const ChangeCurrentSort = createAction( ActionsType.CurrentSort, (sort: string) => ({payload: sort}) );
const RequireAuth = createAction( ActionsType.RequireAuth, (status: AuthorizationStatus) => ({payload: status}) );
const RedirectToPath = createAction( ActionsType.Redirect, (url: AppRoute) => ({payload: url}) );

export {
  ChangeCurrentCity,
  ChangeOffersList,
  ChangeCurrentSort,
  RequireAuth,
  RedirectToPath,
  ActionsType
};
