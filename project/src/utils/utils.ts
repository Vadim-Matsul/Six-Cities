import { Offer, Offers } from '../types/offers';
import { months } from '../const';

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
  return `${year} ${months[month]}`;
};
