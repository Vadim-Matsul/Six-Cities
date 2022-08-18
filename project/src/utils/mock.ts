import { Offer, Offers } from "../types/offers";
import  { internet, datatype, address, image, name, database, commerce } from 'faker';

export const makeFakeOffer = ():Offer => {
return {
    id: datatype.number(100),
    city: {
      name: address.cityName(),
      location: {
        latitude: Number(address.latitude()),
        longitude: Number(address.longitude()),
        zoom: datatype.number({max:16, min:1})
      }
    },
    previewImage: image.imageUrl(),
    images: new Array(7).fill(image.imageUrl()),
    title: name.title(),
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    rating: datatype.number({max:5, min:0.1}),
    type: database.type(),
    bedrooms: datatype.number({max:8, min:2}),
    maxAdults: datatype.number({max:8, min:3}),
    price: Number(commerce.price(100,1000) ),
    goods: new Array(7).fill(datatype.string()),
    host: {
      id: datatype.number(100),
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
}
}

export const makeFakeOffers = ():Offers => {
  const counter = datatype.number({max:20, min:10})
  const offersArray = []

  for (let i=0; i < counter; i++){
    let offer = makeFakeOffer()
    offersArray.push(offer)
  }

  return offersArray;
}