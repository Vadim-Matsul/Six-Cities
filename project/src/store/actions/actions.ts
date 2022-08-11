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

const ChangeCurrentCity = createAction< string >( ActionsType.CurrentCity );
const ChangeOffersList = createAction< Offers >( ActionsType.OffersList );
const ChangeCurrentSort = createAction< string >( ActionsType.CurrentSort );
const RequireAuth = createAction< AuthorizationStatus >( ActionsType.RequireAuth );
const RedirectToPath = createAction< AppRoute >( ActionsType.Redirect );

export {
  ChangeCurrentCity,
  ChangeOffersList,
  ChangeCurrentSort,
  RequireAuth,
  RedirectToPath,
  ActionsType
};
