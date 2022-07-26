import { OfferPlaces } from '../types/OfferPlaces';

export const OfferState:OfferPlaces = [
  {
    type: 'offer',
    place: 'Amsterdam',
    offers: [
      {
        special: 'Premium',
        src: 'img/apartment-01.jpg',
        cost: '120',
        title: 'Beautiful & luxurious apartment at great location',
        estate: 'Apartment',
        raiting: '80%',
        inBookmark: true
      },
      {
        src: 'img/room.jpg',
        cost: '80',
        title: 'Wood and stone place',
        estate: 'Private Room',
        raiting: '80%',
        inBookmark: false
      },
      {
        src: 'img/apartment-02.jpg',
        cost: '132',
        title: 'Canal View Prinsengracht',
        estate: 'Apartment',
        raiting: '80%',
        inBookmark: true
      },
      {
        special: 'Premium',
        src: 'img/apartment-03.jpg',
        cost: '180',
        title: 'Nice, cozy, warm big bed apartment',
        estate: 'Apartment',
        raiting: '100%',
        inBookmark: true
      },
    ]
  },{
    type: 'offer',
    place: 'Cologne',
    offers:[
      {
        src: 'img/apartment-small-04.jpg',
        cost: '180',
        title: 'White castle',
        estate: 'Apartment',
        raiting: '80%',
        inBookmark: true
      }
    ]
  },{
    type: 'review',
    body:[
      {
        src: 'img/avatar-max.jpg',
        name: 'Max',
        feedback: ' A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
        date: 'April 2019'
      }
    ]
  }
];
