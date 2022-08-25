import { Offer, Offers } from '../types/offers';
import { date, internet, datatype, address, image, name, database, commerce } from 'faker';
import { AuthUser } from '../types/state';
import { Review, Reviews } from '../types/reviews';
import { GeoCity } from '../const';

export const makeFakeString = () => `unique${datatype.number(1000)}${datatype.number(1000)}`;

export const makeFakeOffer = ():Offer => ({
  id: datatype.number(1000),
  city: {
    name: Object.keys(GeoCity)[datatype.number(Object.keys(GeoCity).length - 1)],
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number({max:16, min:1})
    }
  },
  previewImage: image.imageUrl(),
  images: new Array(7).fill(null).map(() => makeFakeString()),
  title: name.title(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number({max:5, min:0.1}),
  type: database.type(),
  bedrooms: datatype.number({max:8, min:2}),
  maxAdults: datatype.number({max:8, min:3}),
  price: Number(commerce.price(100,1000) ),
  goods: new Array(7).fill(null).map(() => makeFakeString()),
  host: {
    id: datatype.number(1000),
    name: name.firstName(),
    isPro: datatype.boolean(),
    avatarUrl: internet.avatar()
  },
  description: commerce.productDescription(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number({max:16, min:1})
  }
});

export const makeFakeOffers = ():Offers => {
  const counter = datatype.number({max:20, min:10});
  const offersArray = [];

  for (let i = 0; i < counter; i++){
    const offer = makeFakeOffer();
    offersArray.push(offer);
  }

  return offersArray;
};

export const makeFakeUser = () => ({
  avatarUrl: internet.avatar(),
  id: datatype.number(100),
  isPro: datatype.boolean(),
  name: internet.userName()
});

export const makeFakeAuthUser = ():AuthUser => ({
  ...makeFakeUser(),
  email: internet.email(),
  token: datatype.string()
});

export const makeFakeReview = ():Review => ({
  id: datatype.number(100),
  user: makeFakeUser(),
  rating: datatype.number({max:5, min:0.1}),
  comment: name.title(),
  date: `${datatype.number({max:2022, min:2018})} ${date.month()}`
});

export const makeFakeReviews = ():Reviews => {
  const counter = datatype.number({max:5, min:1});
  const reviewsArr = [];

  for(let i = 0; i < counter; i++){
    const review = makeFakeReview();
    reviewsArr.push(review);
  }
  return reviewsArr;
};
