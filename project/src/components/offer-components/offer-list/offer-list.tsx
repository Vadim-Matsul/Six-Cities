import { Fragment } from 'react';
import React from 'react';

import OfferCard from '../offer-card/offer-card';
import { Offers } from '../../../types/offers';
import { CardPageClass } from '../../../const';


type OfferListProps = {
  offers: Offers
  cardClass: CardPageClass
  setSelectedOffer?: (id: number | null) => void
}

const OfferList:React.FC< OfferListProps > = ( {offers, cardClass, setSelectedOffer} ) => (
  <Fragment>
    { offers.map( (offer) => (
      <OfferCard
        offer = {offer}
        key={`${offer.id} ${offer.price}`}
        cardClass = {cardClass}
        setSelectedOffer = { setSelectedOffer }
      />))}
  </Fragment>
);


export default React.memo(OfferList);
