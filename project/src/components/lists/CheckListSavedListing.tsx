import { OfferHouse } from '../../types/OfferPlaces';
import CardSavedListing from '../cards/CardSavedListing';

type CheckListSavedProps = {
  locationName: string
  offers: OfferHouse []
}

function CheckListSavedListing (props:CheckListSavedProps):JSX.Element {
  const {locationName, offers} = props;


  return (
    <li className='favorites__locations-items'>
      <div className='favorites__locations locations locations--current'>
        <div className='locations__item'>
          <a className='locations__item-link' href='#'>
            <span>{ locationName }</span>
          </a>
        </div>
      </div>
      <div className='favorites__places'>
        { offers.map( (offer, id) => {
          const keyValue = `${offer.estate} + ${id}`;
          if (offer.inBookmark){
            return (
              <CardSavedListing
                key = { keyValue }
                offerHouse = { offer as OfferHouse}
                id = {id}
                place = { locationName }
              />);
          }
        })}
      </div>
    </li>
  );
}

export default CheckListSavedListing;
