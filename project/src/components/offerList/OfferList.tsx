import { useState } from 'react';
import { OfferHouse } from '../../types/OfferPlaces';
import CardMain from '../cards/CardMain';

type OfferListProps = {
    cardInfo: OfferHouse[]
}

function OfferList (props: OfferListProps):JSX.Element {
  const offerHouse = props.cardInfo;
  const [bookmark, setBookmark] = useState([false,false,false,false]);
  return(
    <div className='cities__places-list places__list tabs__content'>
      { offerHouse.map( (offer, id) => {
        const keyValue = `${offer.src} + ${id}`;
        return(
          <CardMain
            key={ keyValue }
            offer = {offer as OfferHouse}
            onMouseMove = {() => {
              setBookmark((prevArr) => ([...prevArr.slice(0,id), true, ...prevArr.slice(id + 1)]));
            }}
            onMouseLeave = {() => {
              setBookmark((prevArr) => ([...prevArr.slice(0,id), false, ...prevArr.slice(id + 1)]));
            }}
          />
        );})}
    </div>
  );
}


export default OfferList;
