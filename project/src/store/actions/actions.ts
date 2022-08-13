import { AppRoute, AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offers';
import { createAction } from '@reduxjs/toolkit';
import { CombineDataState } from '../../types/state';
import { Review } from '../../types/reviews';

enum ActionsType {
  CurrentCity = 'info/currentCity',
  OffersList = 'data/offers',
  Favorites = 'data/favorites',
  NearOffers = 'data/nearOffers',
  Reviews = 'data/reviews',
  CurrentSort = 'info/currentSort',
  RequireAuth = 'status/auth',
  Redirect = 'redirect',
}

const ChangeCurrentCity = createAction< string >( ActionsType.CurrentCity );
const ChangeCurrentSort = createAction< string >( ActionsType.CurrentSort );
const RequireAuth = createAction< AuthorizationStatus >( ActionsType.RequireAuth );
const RedirectToPath = createAction< AppRoute >( ActionsType.Redirect );
const ChangeOffers = createAction< CombineDataState<Offer> >( ActionsType.OffersList );
const ChangeFavorites = createAction< CombineDataState<Offer> >( ActionsType.Favorites );
const ChangeNearOffers = createAction< CombineDataState<Offer> >( ActionsType.NearOffers );
const ChangeReviews = createAction< CombineDataState<Review> >( ActionsType.Reviews );

export {
  ChangeCurrentCity,
  ChangeOffers,
  ChangeCurrentSort,
  ChangeFavorites,
  RequireAuth,
  RedirectToPath,
  ChangeNearOffers,
  ChangeReviews,
  ActionsType
};
