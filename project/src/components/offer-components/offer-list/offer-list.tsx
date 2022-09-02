import React from 'react';
import { Fragment } from 'react';
import { Offers } from '../../../types/offers';
import OfferCard from '../offer-card/offer-card';
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
