import React from "react"
import { Offers } from "../../types/offers"
import OfferCard from "../offer-card/offer-card"

type OfferListProps = {
  offers: Offers
}

function OfferList ( {offers}:OfferListProps ){
  return (
    <div className='cities__places-list places__list tabs__content'>
      { offers.map( (offer) => <OfferCard offer = {offer} key={offer.id}/>)}
    </div>
  );
}


export default OfferList;
