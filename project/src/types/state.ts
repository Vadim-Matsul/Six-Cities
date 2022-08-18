import { AuthorizationStatus } from '../const';
import { RootReducerState } from '../store/reducer/root-reducer';
import { Offer, Offers } from './offers';
import { Review, Reviews } from './reviews';
import { FetchProgress } from '../const';

type User = {
  avatarUrl: string,
  email: string,
  id: number,
  isPro: boolean,
  name: string,
  token: string
}

type CombineDataState<Type> = {
  id?: number | null,
  data: Type[],
  loadStatus: FetchProgress
}

type DataState = {
  offers: CombineDataState<Offer>,
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
  user: User | null
}

type State = RootReducerState

export type { State, DataState, LogicState, UserState, CombineDataState, User };
