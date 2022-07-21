export enum AppRoutes {
  BookMarks ='/Bookmarks',
  HouseNoAuth = '/house-noauth/:id',
  HouseAuth = '/house-auth/:id',
  NoLoged = '/login',
  Main = '/',
  Places = '/places/:id',
  Save = '/savedhomes',
  Error = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NOAUTH',
  UnKnown = 'UNKNOWN'
}
