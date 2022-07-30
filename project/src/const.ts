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
export enum ImagesSize  {
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
};

export const ImageSize = {
  Big: {
    height: 200,
    width: 260
  },
  Small: {
    height: 110,
    width: 150
  }
};
