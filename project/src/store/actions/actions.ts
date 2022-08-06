import { Offers } from '../../types/offers';
enum ActionsType {
  CurrentCity = 'CurrentCity',
  OffersList = 'OffersList',
  CurrentSort = 'CurrentSort'
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

type Actions =
  | ReturnType <typeof ChangeCurrentCity>
  | ReturnType <typeof ChangeOffersList>
  | ReturnType <typeof ChangeCurrentSort>

export type { Actions };
export {ChangeCurrentCity, ChangeOffersList, ChangeCurrentSort, ActionsType};
