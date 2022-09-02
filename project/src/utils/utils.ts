import { Offer, Offers } from '../types/offers';
import { GeoCity, Months, SortTypes } from '../const';

const RAITING_COUNT = 20;
const FIRST_LETTER = 0;
const FIRST_INDEX = 1;

export const getStars = ( rating:number ):string => (
  `${Math.round(rating) * RAITING_COUNT}%`
);


export const capitalizeFirstLetter = (text: string):string => (
  text.charAt(FIRST_LETTER).toUpperCase() + text.slice(FIRST_INDEX)
);


export const getArrayCitites = (offers: Offers):string[] => ( Array.from( new Set( offers.map( (offer) => offer.city.name ) ) ).sort() );

export function getSortedOffersCities (offers: Offers):[string, Offer[]][]{
  const cities:string[] = getArrayCitites(offers);
  const sortedOffersList = new Map();

  cities.forEach( (city) => {
    const offersArr = offers.filter( (offer) => city === offer.city.name );
    sortedOffersList.set( city, offersArr );
  });

  return Array.from( sortedOffersList );
}


export const getFormateDate = ( date: string):string => {
  const dateReview = new Date(date);
  const year = dateReview.getFullYear();
  const month = dateReview.getMonth();
  return `${year} ${Months[month]}`;
};

export const clearSession = (offers: Offers):Offers => {
  const notElected:Offers = [] ;
  const actualOffers:Offers = JSON.parse( JSON.stringify(offers) ) ;
  actualOffers.forEach((offer) => {
    if ( offer.isFavorite ){ offer.isFavorite = false; }
    notElected.push(offer);
  });
  return notElected ;
};

export const getActualArr = (offers: Offers, data: Offer):Offers | []=> {
  if (offers.length){
    const index = offers.findIndex((offer) => offer.id === data.id) ;
    if (index === -1){return offers; }
    const actualArr = [...offers.slice(0, index), data, ...offers.slice(index + 1)] ;
    return actualArr;
  }
  return [];
};

const getRandomNumber = (min:number, max:number):number => {
  const lower = Math.ceil(Math.min(min,max));
  const upper = Math.floor(Math.max(min,max));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomCity = ():string => {
  const CitiesArr = Object.keys(GeoCity);
  const integer = getRandomNumber(0, CitiesArr.length - 1);
  return CitiesArr[integer];
};

export const SORT = {
  [SortTypes.POPULAR]: (offers: Offers):Offer[] => offers.slice().sort(),
  [SortTypes.PRICE_HIGH_TO_LOW]: (offers: Offers):Offer[] => offers.slice().sort( (a,b) => b['price'] - a['price'] ),
  [SortTypes.PRICE_LOW_TO_HIGH]: (offers: Offers):Offer[] => offers.slice().sort( (a,b) => a['price'] - b['price'] ),
  [SortTypes.TOP_RATED_FIRST]: (offers: Offers):Offer[] => offers.slice().sort((a,b) => b['rating'] - a['rating'])
};
