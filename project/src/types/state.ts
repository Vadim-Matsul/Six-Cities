import { Offer, Offers } from "./offers"

type State = {
  currentCity: string,
  offers: Offers,
  currentSort: string,
  selectedOffer?: Offer
}

export type { State };
