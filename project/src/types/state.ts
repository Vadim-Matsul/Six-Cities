import { AuthorizationStatus } from "../const";
import { Offer, Offers } from "./offers"

type State = {
  currentCity: string,
  offers: Offers,
  currentSort: string,
  authStatus: AuthorizationStatus,
  loadStatus: boolean
}

export type { State };
