import { AuthorizationStatus } from '../const';
import { RootReducerState } from '../store/reducer/root-reducer';
import { Offer, Offers } from './offers';
import { Review, Reviews } from './reviews';
import { FetchProgress } from '../const';

type CombineDataState<Type> = {
  id: number | null,
  data: Type[] 
}

type DataState = {
  offers: Offers,
  nearOffers: CombineDataState<Offer>,
  reviews: CombineDataState<Review>,
  loadStatus: boolean,
  loadNearOf: FetchProgress | null,
  loadReviews: FetchProgress | null
}

type LogicState = {
  currentCity: string,
  currentSort: string,
}

type UserState = {
  authStatus: AuthorizationStatus
}

type State = RootReducerState

export type { State, DataState, LogicState, UserState, CombineDataState };
