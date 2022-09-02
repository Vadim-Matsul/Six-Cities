import { createReducer } from '@reduxjs/toolkit';
import { FetchProgress } from '../../../const';
import { DataState } from '../../../types/state';
import { ChangeOffers, ChangeNearOffers, ChangeReviews, ChangeFavorites, ChangeOffer } from '../../actions/actions';

export const initialState:DataState = {
  offers: { data: [], loadStatus: FetchProgress.Idle },
  offer: { data: null, loadStatus: FetchProgress.Idle },
  favorites: { data: [], loadStatus: FetchProgress.Idle },
  nearOffers: {id: null, data: [], loadStatus: FetchProgress.Idle },
  reviews: {id: null, data: [], loadStatus: FetchProgress.Idle },
};

const DataReducer = createReducer( initialState, (builder) => {
  builder
    .addCase(ChangeOffers, (s, a) => {
      s.offers = { data: a.payload.data, loadStatus: a.payload.loadStatus}; })

    .addCase(ChangeOffer, (s, a) => {
      s.offer = { data: a.payload.data, loadStatus: a.payload.loadStatus}; })

    .addCase(ChangeFavorites, (s, a) => {
      s.favorites = { data: a.payload.data, loadStatus: a.payload.loadStatus}; })

    .addCase(ChangeNearOffers, (s, a) => {
      s.nearOffers = { id: a.payload.id, data: a.payload.data, loadStatus: a.payload.loadStatus}; })

    .addCase(ChangeReviews, (s, a) => {
      s.reviews = { id: a.payload.id, data: a.payload.data, loadStatus: a.payload.loadStatus }; });
} );

export { DataReducer };
