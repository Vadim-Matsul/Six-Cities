import React from 'react';

import { getCurrentSort } from '../../../store/reducer/logic-reducer/selectors';
import { CardPageClass } from '../../../const';
import { Offers } from '../../../types/offers';
import { useSelector } from 'react-redux';

import Map from '../../map/map';
import SortForm from '../../sort-form/sort-form';
import useHighlighted from '../../../hooks/useHighlighted';
import OfferList from '../../offer-components/offer-list/offer-list';


type MainOffersProps = {
  offersOfCity: Offers,
  currentCity: string
}

const MainOffers:React.FC<MainOffersProps> = ({ offersOfCity, currentCity }) => {
  const [selectedOffer, setSelectedOffer] = useHighlighted( offersOfCity );
  const currentSort = useSelector( getCurrentSort );
  console.log('rerender MainOffers');
  
  return (
    <>
      <section className='cities__places places'>
        <h2 className='visually-hidden'>Places</h2>
        <b className='places__found'>
          { offersOfCity.length } places to stay in {currentCity}
        </b>
        <SortForm currentSort={ currentSort } currentCity = { currentCity }/>
        <div className='cities__places-list places__list tabs__content'>
          <OfferList
            offers = { offersOfCity }
            cardClass = { CardPageClass.Main }
            setSelectedOffer = {setSelectedOffer}
          />
        </div>
      </section>
      <div className='cities__right-section'>
        <Map
          offers={ offersOfCity }
          selectedOffer = { selectedOffer }
          currentCity={ currentCity }
          thisClass = 'cities__map map'
        />
      </div>  
    </>
  );
};


export default MainOffers;
