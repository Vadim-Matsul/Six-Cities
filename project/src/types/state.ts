import { AuthorizationStatus } from '../const';
import { RootReducerState } from '../store/reducer/root-reducer';
import { Offer } from './offers';
import { Review, User } from './reviews';
import { FetchProgress } from '../const';

type AuthUser = User & {
  email: string,
  token: string
}

type CombineDataState<Type> = {
  id?: number | null,
  data: Type[],
  loadStatus: FetchProgress
}

type CurrentOffer = {
  data: Offer | null,
  loadStatus: FetchProgress
}

type DataState = {
  offers: CombineDataState<Offer>,
  offer: CurrentOffer,
  favorites: CombineDataState<Offer>,
  nearOffers: CombineDataState<Offer>,
  reviews: CombineDataState<Review>,
}

type LogicState = {
  currentCity: string,
  currentSort: string,
}

type UserState = {
  authStatus: AuthorizationStatus,
  user: AuthUser | null,
  logoutProcess: boolean,
  logoutError: boolean,
  loginError: boolean,
  reviewError: boolean
}

type State = RootReducerState

export type { State, DataState, LogicState, UserState, CombineDataState, CurrentOffer,AuthUser };
