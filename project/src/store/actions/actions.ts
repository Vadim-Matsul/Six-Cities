import { AppRoute, AuthorizationStatus } from '../../const';
import { Offer, Offers } from '../../types/offers';
import { createAction } from '@reduxjs/toolkit';
import { CombineDataState } from '../../types/state';
import { Review } from '../../types/reviews';

enum ActionsType {
  CurrentCity = 'info/currentCity',
  OffersList = 'data/offers',
  NearOffers = 'data/nearOffers',
  Reviews = 'data/reviews',
  CurrentSort = 'info/currentSort',
  RequireAuth = 'status/auth',
  Redirect = 'redirect'
}

const ChangeCurrentCity = createAction< string >( ActionsType.CurrentCity );
const ChangeOffersList = createAction< Offers >( ActionsType.OffersList );
const ChangeCurrentSort = createAction< string >( ActionsType.CurrentSort );
const RequireAuth = createAction< AuthorizationStatus >( ActionsType.RequireAuth );
const RedirectToPath = createAction< AppRoute >( ActionsType.Redirect );
const FetchNearOffers = createAction< CombineDataState<Offer> >( ActionsType.NearOffers );
const FetchReviews = createAction< CombineDataState<Review> >( ActionsType.Reviews );

export {
  ChangeCurrentCity,
  ChangeOffersList,
  ChangeCurrentSort,
  RequireAuth,
  RedirectToPath,
  FetchNearOffers,
  FetchReviews,
  ActionsType
};
