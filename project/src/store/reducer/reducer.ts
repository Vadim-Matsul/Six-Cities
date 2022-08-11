import { AuthorizationStatus, INITIAL_CURRENT_CITY, SortTypes } from '../../const';
import { ChangeCurrentCity, ChangeCurrentSort, ChangeOffersList, RequireAuth } from '../actions/actions';
import { State } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';

const initialState:State = {
  currentCity: INITIAL_CURRENT_CITY,
  offers: [],
  currentSort: SortTypes.POPULAR,
  authStatus: AuthorizationStatus.UnKnown,
  loadStatus: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ChangeCurrentCity, (state, action) => { state.currentCity = action.payload })
    .addCase(ChangeOffersList, (state, action) => {
      state.offers = action.payload;
      state.loadStatus = true })
    .addCase(ChangeCurrentSort, (state, action) => { state.currentSort = action.payload })
    .addCase(RequireAuth, (state, action) => { state.authStatus = action.payload })
})


export default reducer;
