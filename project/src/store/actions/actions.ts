import { createAction } from '@reduxjs/toolkit';

import { CombineDataState, AuthUser, CurrentOffer } from '../../types/state';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offers';
import { Review } from '../../types/reviews';

enum ActionsType {
  CurrentCity = 'info/currentCity',
  CurrentSort = 'info/currentSort',

  NearOffers = 'data/nearOffers',
  Favorites = 'data/favorites',
  OfferCurrent = 'data/offer',
  OffersList = 'data/offers',
  Reviews = 'data/reviews',

  SetLogOutProcess = 'user/logout/process',
  SetReviewError ='user/error/review',
  SetLogoutError ='user/error/logout',
  SetLoginError ='user/error/login',
  RequireAuth = 'user/status/auth',
  SetUser = 'user/user_data',

  Redirect = 'redirect',
}

const ChangeCurrentCity = createAction< string >( ActionsType.CurrentCity );
const ChangeCurrentSort = createAction< string >( ActionsType.CurrentSort );

const ChangeNearOffers = createAction< CombineDataState<Offer> >( ActionsType.NearOffers );
const ChangeFavorites = createAction< CombineDataState<Offer> >( ActionsType.Favorites );
const ChangeOffers = createAction< CombineDataState<Offer> >( ActionsType.OffersList );
const ChangeReviews = createAction< CombineDataState<Review> >( ActionsType.Reviews );
const ChangeOffer = createAction< CurrentOffer >( ActionsType.OfferCurrent );

const RequireAuth = createAction< AuthorizationStatus >( ActionsType.RequireAuth );
const SetLogOutProcess = createAction< boolean >( ActionsType.SetLogOutProcess );
const SetReviewError = createAction< boolean >( ActionsType.SetReviewError );
const SetLogoutError = createAction< boolean >( ActionsType.SetLogoutError);
const SetloginError = createAction< boolean >( ActionsType.SetLoginError );
const SetUser = createAction< AuthUser | null >( ActionsType.SetUser );

const RedirectToPath = createAction< AppRoute >( ActionsType.Redirect );


export {
  ChangeCurrentCity,
  ChangeCurrentSort,

  ChangeNearOffers,
  ChangeFavorites,
  ChangeReviews,
  ChangeOffers,
  ChangeOffer,

  SetLogOutProcess,
  SetReviewError,
  SetLogoutError,
  SetloginError,
  RequireAuth,
  SetUser,

  RedirectToPath,

  ActionsType
};
