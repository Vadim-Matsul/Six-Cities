import { AuthorizationStatus, INITIAL_CURRENT_CITY, SortTypes } from '../../const';
import { Actions, ActionsType } from '../actions/actions';
import { State } from '../../types/state';

const initialState:State = {
  currentCity: INITIAL_CURRENT_CITY,
  offers: [],
  currentSort: SortTypes.POPULAR,
  authStatus: AuthorizationStatus.UnKnown,
  loadStatus: false
};

const reducer = (state: State = initialState, action: Actions) => {
  switch (action.type){
    case ActionsType.CurrentCity: return { ...state, currentCity: action.payload };
    case ActionsType.OffersList: return { ...state, offers: action.payload, loadStatus: true};
    case ActionsType.CurrentSort: return {...state, currentSort: action.payload};
    case ActionsType.RequireAuth: return {...state, authStatus: action.payload};
    default: return state;
  }
};

export default reducer;
