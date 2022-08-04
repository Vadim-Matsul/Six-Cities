import { INITIAL_CURRENT_CITY, SortTypes } from '../../const';
import { offers } from '../../mocks/offers';
import { Actions, ActionsType } from '../../types/actions';
import { State } from '../../types/state';

const initialState:State = {
  currentCity: INITIAL_CURRENT_CITY,
  offers: offers,
  currentSort: SortTypes.POPULAR
};

const reducer = (state: State = initialState, action: Actions) => {
  switch (action.type){
    case ActionsType.CurrentCity: return { ...state, currentCity: action.payload };
    case ActionsType.OffersList: return { ...state, offers: action.payload };
    case ActionsType.SelectedOffer: return { ...state, selectedOffer: offers.find( (offer) => offer.id === action.payload ) };
    case ActionsType.CurrentSort: return {...state, currentSort: action.payload};
    default: return state;
  }
};

export default reducer;
