import OfferList from '../../components/offer-list/offer-list';
import { Offer, Offers } from '../../types/offers';
import {CardPageClass, GeoCity} from '../../const';
import { State } from '../../types/state';
import Map from '../../components/map/map';
import { connect, ConnectedProps} from 'react-redux';
import LocationList from '../../components/location-list/location-list';
import NoPlacesScreen from '../no-places-screen/no-places-screen';
import SortForm from '../../components/sort-form/sort-form';
import { SORT } from '../../utils/utils';
import useHighlighted from '../../hooks/useHighlighted';
import Header from '../../components/header/header';
import { useMemo } from 'react';

type MainScreenProps = {
  offers: Offers
}

const mapStateToProps = ({ currentCity, currentSort }:State) => ({currentCity, currentSort});
const connector = connect(mapStateToProps);
type MainScreenReduxProps = ConnectedProps<typeof connector>
type ConnectedMainScrennProps = MainScreenProps & MainScreenReduxProps

function getOffersOfCity (uniqueCity: string, offers: Offers): Offer[] {
  return offers.filter((offer) => offer.city.name === uniqueCity );
}


function MainScreen (props: ConnectedMainScrennProps):JSX.Element{
  const {offers, currentCity, currentSort } = props;

  const offersOfCity = useMemo(() => getOffersOfCity(currentCity, offers),[currentCity]);
  const sortedOffers = SORT[currentSort](offersOfCity);
  const [selectedOffer, setSelectedOffer] = useHighlighted(offersOfCity);
  const City = GeoCity[currentCity];

  return (
    <div className='page page--gray page--main'>
      <Header />
      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <LocationList uniqueCity={ currentCity } />
        <div className='cities'>
          <div className={`cities__places-container container ${offersOfCity.length ? '' : 'cities__places-container--empty'}`}>
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
                    offers = { sortedOffers }
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
                  currentCity={ currentCity }
                />
                : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


export default connector(MainScreen);
