import { createReducer } from '@reduxjs/toolkit';

import { ChangeCurrentCity, ChangeCurrentSort } from '../../actions/actions';
import { INITIAL_CURRENT_CITY, SortTypes } from '../../../const';
import { LogicState } from '../../../types/state';


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
