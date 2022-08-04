import { Offer } from './offers';

enum ActionsType {
  CurrentCity = 'CurrentCity',
  OffersList = 'OffersList',
  SelectedOffer = 'SelectedOffer',
  CurrentSort = 'CurrentSort'
}

type changeCurrentCity = {
  type: ActionsType.CurrentCity,
  payload: string
}

type changeOffersList = {
  type: ActionsType.OffersList,
  payload: Offer[],
}

type changeSelectedOffer = {
  type: ActionsType.SelectedOffer,
  payload: number | null
}

type changeCurrentSort = {
  type: ActionsType.CurrentSort,
  payload: string
}

type Actions = changeCurrentCity | changeOffersList | changeSelectedOffer | changeCurrentSort


export {ActionsType};
export type { Actions, changeCurrentCity, changeOffersList, changeSelectedOffer, changeCurrentSort };
