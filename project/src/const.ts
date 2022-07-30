export enum AppRoute {
  Main = '/',
  Auth = '/login',
  Property = '/offer/:id',
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
