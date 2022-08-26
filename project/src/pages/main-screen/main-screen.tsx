import OfferList from '../../components/offer-list/offer-list';
import { Offers } from '../../types/offers';
import {CardPageClass, GeoCity} from '../../const';
import Map from '../../components/map/map';
import LocationList from '../../components/location-list/location-list';
import NoPlacesScreen from '../no-places-screen/no-places-screen';
import SortForm from '../../components/sort-form/sort-form';
import useHighlighted from '../../hooks/useHighlighted';
import Header from '../../components/header/header';
import { getCurrentCity, getCurrentSort, getSortedOffers } from '../../store/reducer/logic-reducer/selectors';
import { useSelector } from 'react-redux';


function MainScreen ( ):JSX.Element{


  const currentCity = useSelector( getCurrentCity );
  const currentSort = useSelector( getCurrentSort );
  const offersOfCity = useSelector( getSortedOffers );

  const [selectedOffer, setSelectedOffer] = useHighlighted(offersOfCity);
  const City = GeoCity[currentCity];


  return (
    <div className='page page--gray page--main'>
      <Header />
      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <LocationList uniqueCity={ currentCity } />
        <div className='cities'>
          <div
            className={`cities__places-container container ${offersOfCity.length ? '' : 'cities__places-container--empty'}`}
            data-testid='MainScreen'
          >
            { offersOfCity.length
              ?
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
              : <NoPlacesScreen city={ currentCity }/> }
            <div className='cities__right-section'>
              {offersOfCity.length
                ?
                <Map
                  offers={ offersOfCity as Offers }
                  selectedOffer = { selectedOffer }
                  city={ City }
                  thisClass = 'cities__map map'
                />
                : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


export default MainScreen;
