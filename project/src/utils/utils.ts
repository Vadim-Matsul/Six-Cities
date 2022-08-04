import { Offer, Offers } from '../types/offers';
import { Months, SortTypes } from '../const';

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

export const SORT = {
  [SortTypes.POPULAR]: (offers: Offers):Offer[] => offers.slice().sort(),
  [SortTypes.PRICE_HIGH_TO_LOW]: (offers: Offers):Offer[] => offers.slice().sort( (a,b) => b['price'] - a['price'] ),
  [SortTypes.PRICE_LOW_TO_HIGH]: (offers: Offers):Offer[] => offers.slice().sort( (a,b) => a['price'] - b['price'] ),
  [SortTypes.TOP_RATED_FIRST]: (offers: Offers):Offer[] => offers.slice().sort((a,b) => b['rating'] - a['rating'])
};
