import { AppRoute, AuthorizationStatus } from '../../const';
import { Offers } from '../../types/offers';
enum ActionsType {
  CurrentCity = 'info/currentCity',
  OffersList = 'data/offers',
  CurrentSort = 'info/currentSort',
  RequireAuth = 'status/auth',
  Redirect = 'redirect'
}

const ChangeCurrentCity = (city: string) => ({
  type: ActionsType.CurrentCity,
  payload: city
} as const );

const ChangeOffersList = (offers: Offers) => ({
  type: ActionsType.OffersList,
  payload: offers
} as const );

const ChangeCurrentSort = (currentSort: string) => ({
  type: ActionsType.CurrentSort,
  payload: currentSort
} as const );

const RequireAuth = (status: AuthorizationStatus) => ({
  type: ActionsType.RequireAuth,
  payload: status
} as const );

const RedirectToPath = (url:AppRoute) => ({
  type: ActionsType.Redirect,
  payload: url
} as const );

type Actions =
  | ReturnType <typeof ChangeCurrentCity>
  | ReturnType <typeof ChangeOffersList>
  | ReturnType <typeof ChangeCurrentSort>
  | ReturnType <typeof RequireAuth>
  | ReturnType <typeof RedirectToPath>

export type { Actions };
export {
  ChangeCurrentCity,
  ChangeOffersList,
  ChangeCurrentSort,
  RequireAuth,
  RedirectToPath,
  ActionsType
};
