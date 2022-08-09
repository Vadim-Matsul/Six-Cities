import Logo from '../../components/logo/logo';
import OfferList from '../../components/offer-list/offer-list';
import { Offer, Offers } from '../../types/offers';
import {CardPageClass, City} from '../../const';
import { State } from '../../types/state';
import Map from '../../components/map/map';
import { connect, ConnectedProps} from 'react-redux';
import LocationList from '../../components/location-list/location-list';
import NoPlacesScreen from '../no-places-screen/no-places-screen';
import SortForm from '../../components/sort-form/sort-form';
import { SORT } from '../../utils/utils';
import useHighlighted from '../../hooks/useHighlighted';

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
  const sortedOffers = SORT[currentSort](offers);
  const offersOfCity = getOffersOfCity(currentCity, sortedOffers);
  const [selectedOffer, setSelectedOffer] = useHighlighted(offersOfCity);

  return (
    <div className='page page--gray page--main'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Logo />
            </div>
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <li className='header__nav-item user'>
                  <a className='header__nav-link header__nav-link--profile' href='#'>
                    <div className='header__avatar-wrapper user__avatar-wrapper'>
                    </div>
                    <span className='header__user-name user__name'>Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className='header__nav-item'>
                  <a className='header__nav-link' href='#'>
                    <span className='header__signout'>Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
                    offers = { offersOfCity }
                    cardClass = { CardPageClass.Main }
                    setSelectedOffer = {setSelectedOffer}
                  />
                </div>
              </section>
              : <NoPlacesScreen city={ currentCity }/> }
            <div className='cities__right-section'>
              <Map
                offers={ offersOfCity as Offers}
                selectedOffer = { selectedOffer }
                city={ City }
                currentCity={ currentCity }
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


export default connector(MainScreen);
