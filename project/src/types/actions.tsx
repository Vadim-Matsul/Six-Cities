import { Offer } from "./offers";

enum ActionsType {
  CurrentCity = 'CurrentCity',
  OffersList = 'OffersList',
  SelectedOffer = 'SelectedOffer'
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

type Actions =  changeCurrentCity | changeOffersList | changeSelectedOffer 


export {ActionsType};
export type { Actions, changeCurrentCity, changeOffersList, changeSelectedOffer };
