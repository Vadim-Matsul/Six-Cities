import { City } from './types/offers';

export enum AppRoute {
  Main = '/',
  Auth = '/login',
  Property = '/offer',
  Favorites = '/favorites',
  Error = '*'
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  GetNearOffers = '/hotels/:hotel_id/nearby',
  GetReviews = '/comments/:hotel_id',
  PostReview = '/comments/:hotel_id',
  GetFavorites = '/favorite',
  PostFavorite = '/favorite/:hotel_id/:status'
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

export enum FetchProgress {
  Pending = 'PENDING',
  Fulfilled = 'FULFILLED',
  Rejected = 'REJECTED',
  Idle = 'IDLE'
}

export enum MessageConfig {
  required = 'Required field',
  patternEmail = 'Wrong email format',
  patternPassword = 'Password must contain Letters and Numbers',
  minLengthPassword = 'password must be 8 symbols'
}

export const Pattern = {
  Email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  Password: /^(?=.*[A-Za-z])(?!.* )(?=.*\d).{1,}$/
};

export const HTTPConfig = {
  UnAuth: 'Unauthorized',
  BadRequest: 'Bad Request',
};

export const FavoritesConfig = {
  add: '1',
  remove: '0'
};

export const SortTypes = {
  POPULAR: 'Popular',
  PRICE_LOW_TO_HIGH: 'Price: low to high',
  PRICE_HIGH_TO_LOW: 'Price: high to low',
  TOP_RATED_FIRST: 'Top rated first'
};

export const GeoCity: {[key:string]:City} = {
  Paris: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  },
  Brussels: {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },
  Cologne: {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  Hamburg: {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  },
  Amsterdam: {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
  },
} as const;


export const IconMarkerUrl = {
  default: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  current: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg'
} as const;

export const INITIAL_CURRENT_CITY = 'Paris';

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
export const IconMarkerSize = {
  Icon: {
    x: 40,
    y: 40
  },
  Anchor: {
    x: 20,
    y: 0
  }
} as const;

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
