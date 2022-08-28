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

function OfferList ( {offers, cardClass, setSelectedOffer}:OfferListProps ):JSX.Element{

  return (
    <Fragment>
      { offers.map( (offer) => (
        <OfferCard
          offer = {offer}
          key={offer.id}
          cardClass = {cardClass}
          setSelectedOffer = { setSelectedOffer }
        />))}
    </Fragment>
  );
}


export default React.memo(OfferList,(prevProps, nextProps) => prevProps.offers === nextProps.offers);
