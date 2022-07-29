import React, {useState} from "react"
import { Offers } from "../../types/offers"
import OfferCard from "../offer-card/offer-card"

type OfferListProps = {
  offers: Offers
}

function OfferList ( {offers}:OfferListProps ){
  const [ActiveCard, setActiveCard] = useState([false,false,false,false])

  return (
    <div className='cities__places-list places__list tabs__content'>
      { offers.map( (offer, index) => 
        <OfferCard 
          offer = {offer} 
          key={offer.id}
          ActiveCard = {() => setActiveCard((prevState) => ([...prevState.slice(0,index),true,...prevState.slice(index + 1)]))}
          InActiveCard = {() => setActiveCard((prevState) => ([...prevState.slice(0,index),false,...prevState.slice(index + 1)]))}
        />)}
    </div>
  );
}


export default OfferList;
