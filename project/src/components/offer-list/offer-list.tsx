import React, {useState} from 'react';
import { Offers } from '../../types/offers';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  offers: Offers
}

function OfferList ( {offers}:OfferListProps ){
  const [ActiveCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className='cities__places-list places__list tabs__content'>
      { offers.map( (offer) => (
        <OfferCard
          offer = {offer}
          key={offer.id}
          ActiveCard = {() => setActiveCard( offer.id )}
          InActiveCard = {() => setActiveCard( null )}
        />))}
    </div>
  );
}


export default OfferList;
