import { Fragment } from 'react';
import { Offers } from '../../types/offers';
import OfferCard from '../offer-card/offer-card';
import { CardPageClass } from '../../const';

type OfferListProps = {
  offers: Offers
  cardClass: CardPageClass
  returnId?: (id: number | undefined) => void
}

function OfferList ( {offers, cardClass, returnId }:OfferListProps ):JSX.Element{

  return (
    <Fragment>
      { offers.map( (offer) => (
        <OfferCard
          offer = {offer}
          key={offer.id}
          cardClass = {cardClass}
          returnId= { returnId }
        />))}
    </Fragment>
  );
}


export default OfferList;
