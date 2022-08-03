import { Offer, Offers } from "./offers"

type State = {
  currentCity: string,
  offers: Offers,
  selectedOffer?: Offer
}

export type { State };
