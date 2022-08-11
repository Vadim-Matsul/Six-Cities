import { createReducer } from '@reduxjs/toolkit';
import { DataState } from '../../../types/state';
import { ChangeOffersList, FetchNearOffers, FetchReviews } from '../../actions/actions';

const initialState:DataState = {
  offers: [],
  nearOffers: {id: null, data: [] },
  reviews: {id: null, data: [] },
  loadStatus: false
};

const DataReducer = createReducer( initialState, (builder) => {
  builder
    .addCase(ChangeOffersList, (state, action) => {
      state.offers = action.payload;
      state.loadStatus = true; })
    .addCase(FetchNearOffers, (state, action) => {
      state.nearOffers.id = action.payload.id;
      state.nearOffers.data = action.payload.data; })
    .addCase(FetchReviews, (state, action) => {
      state.reviews.id = action.payload.id;
      state.reviews.data = action.payload.data; });
} );

export { DataReducer };
