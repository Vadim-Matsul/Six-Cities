import { AuthorizationStatus } from "../const";
import { RootReducerState } from "../store/reducer/root-reducer";
import { Offer, Offers } from "./offers"

type DataState = {
  offers: Offers,
  loadStatus: boolean
}

type LogicState = {
  currentCity: string,
  currentSort: string,
}

type UserState = {
  authStatus: AuthorizationStatus
}

type State = RootReducerState

export type { State, DataState, LogicState, UserState };
