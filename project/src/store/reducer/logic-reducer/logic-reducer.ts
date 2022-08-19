import { createReducer } from '@reduxjs/toolkit';
import { INITIAL_CURRENT_CITY, SortTypes } from '../../../const';
import { LogicState } from '../../../types/state';
import { ChangeCurrentCity, ChangeCurrentSort } from '../../actions/actions';

export const initialState:LogicState = {
  currentCity: INITIAL_CURRENT_CITY,
  currentSort: SortTypes.POPULAR
};

const LogicReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ChangeCurrentCity, (state, action) => { state.currentCity = action.payload; })
    .addCase(ChangeCurrentSort, (state, action) => { state.currentSort = action.payload; });
});


export { LogicReducer };
