import React from 'react';
import { CardPageClass } from '../../../const';
import useHighlighted from '../../../hooks/useHighlighted';
import { Offer, Offers } from '../../../types/offers';
import Map from '../../map/map';
import OfferList from '../../offer-components/offer-list/offer-list';

type PropertyScreenWithNearProps = {
  nearOffers: Offers,
  data: Offer
}


const PropertyScreenWithNear: React.FC<PropertyScreenWithNearProps> = ({nearOffers, data}) => {
  const [selectedOffer, setSelectedOffer] = useHighlighted(nearOffers);
  const offersForMap = [...nearOffers, data];
  console.log('rerender PropertyScreenWithNear');
  
  return(
    <>
      <Map
        offers={ offersForMap }
        currentCity={ data.city.name }
        selectedOffer={ selectedOffer }
        thisClass= 'property__map map'
      />
      <div className='container'>
        <section className='near-places places'>
          <h2 className='near-places__title'>Other places in the neighbourhood</h2>
          <div className='near-places__list places__list'>
            <OfferList
              cardClass={ CardPageClass.Property }
              offers = {nearOffers}
              setSelectedOffer={ setSelectedOffer }
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default PropertyScreenWithNear;