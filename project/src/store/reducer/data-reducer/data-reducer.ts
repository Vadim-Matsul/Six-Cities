import { createReducer } from '@reduxjs/toolkit';
import { DataState } from '../../../types/state';
import { ChangeOffersList } from '../../actions/actions';

const initialState:DataState = {
  offers: [],
  loadStatus: false
};

const DataReducer = createReducer( initialState, (builder) => {
  builder
    .addCase(ChangeOffersList, (state, action) => {
      state.offers = action.payload;
      state.loadStatus = true; });
} );

export { DataReducer };
