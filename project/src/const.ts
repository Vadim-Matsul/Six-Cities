export enum AppRoute {
  Main = '/',
  Auth = '/login',
  Property = '/offer',
  Favorites = '/favorites',
  Error = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NOAUTH',
  UnKnown = 'UNKNOWN'
}

export enum CardPageClass {
  Main = 'cities',
  Property = 'near-places',
  Favorites = 'favorites'
}
export enum BookMarkClass {
  OfferCard = 'place-card',
  Property = 'property',

}

export const City = {
  name: 'Amsterdam',
  location:{
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13
  }
} as const;

export const IconMarkerUrl = {
  default: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  current: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg'
} as const;

export const IconMarkerSize = {
  Icon: {
    x: 40,
    y: 40
  },
  Anchor: {
    x: 20,
    y: 40
  }
} as const;

export const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'] as const;

export const RaitingInputData = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' }
] as const;

export enum ImagesSize {
  START = 0,
  END = 6
}

export const PropertySize = {
  Big: {
    height: 31,
    width: 33
  },
  Small: {
    height: 18,
    width: 19
  }
} as const;

export const ImageSize = {
  Big: {
    height: 200,
    width: 260
  },
  Small: {
    height: 110,
    width: 150
  }
} as const;
