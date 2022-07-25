export type OfferCity = {
  type: string
  place: string
  offers: OfferHouse[]
}

export type OfferHouse = {
  special?: string
  src: string
  cost: string
  title: string
  estate: string
  raiting: string
}

export type Reviews = {
  type: string
  body: ReviewsUser []
}

export type ReviewsUser = {
  src: string
  name: string
  feedback: string
  date: string
}

export type OfferPlace = OfferCity | Reviews

export type OfferPlaces = OfferPlace[]
