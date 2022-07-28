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
