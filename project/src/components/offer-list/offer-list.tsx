import React, {Fragment, useState} from 'react';
import { Offers } from '../../types/offers';
import OfferCard from '../offer-card/offer-card';
import { CardPageClass } from '../../const';

type OfferListProps = {
  offers: Offers
  cardClass: CardPageClass
}

function OfferList ( {offers, cardClass}:OfferListProps ):JSX.Element{
  const [ActiveCard, setActiveCard] = useState<number | null>(null);

  return (
    <Fragment>
      { offers.map( (offer) => (
        <OfferCard
          offer = {offer}
          key={offer.id}
          ActiveCard = {() => setActiveCard( offer.id )}
          InActiveCard = {() => setActiveCard( null )}
          cardClass = {cardClass}
        />))}
    </Fragment>
  );
}


export default OfferList;
