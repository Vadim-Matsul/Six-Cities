import { ActionsType, changeCurrentCity, changeOffersList, changeSelectedOffer } from '../../types/actions';
import { Offers } from '../../types/offers';

const ChangeCurrentCity = (city: string):changeCurrentCity => ({
  type: ActionsType.CurrentCity,
  payload: city
});

const ChangeOffersList = (offers: Offers):changeOffersList => ({
  type: ActionsType.OffersList,
  payload: offers
});

const ChangeSelectedOffer = (id: number | null):changeSelectedOffer => ({
  type: ActionsType.SelectedOffer,
  payload: id
});

export {ChangeCurrentCity, ChangeOffersList, ChangeSelectedOffer};
