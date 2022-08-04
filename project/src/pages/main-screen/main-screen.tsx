import Logo from '../../components/logo/logo';
import OfferList from '../../components/offer-list/offer-list';
import { Offer, Offers } from '../../types/offers';
import {CardPageClass, City} from '../../const';
import { State } from '../../types/state';
import Map from '../../components/map/map';
import { connect, ConnectedProps} from 'react-redux';
import LocationList from '../../components/location-list/location-list';
import NoPlacesScreen from '../no-places-screen/no-places-screen';
import { useState } from 'react';

type MainScreenProps = {
  offers: Offers
}

const mapStateToProps = ({currentCity, selectedOffer}:State) => ({currentCity, selectedOffer});
const connector = connect(mapStateToProps);
type MainScreenReduxProps = ConnectedProps<typeof connector>
type ConnectedMainScrennProps = MainScreenProps & MainScreenReduxProps

function getOffersOfCity (uniqueCity: string, offers: Offers): Offer[] {
  return offers.filter((offer) => offer.city.name === uniqueCity );
}

function MainScreen ({offers, currentCity, selectedOffer}: ConnectedMainScrennProps):JSX.Element{
  const [sort, setSort] = useState<keyof typeof offers[0] | boolean >(false);
  const [sortValue, setSortValue] = useState<string>('Popular');
  const [booleanSortFlag, setBooleanSortFlag] = useState<boolean>(false);

  const changeSort = <T extends keyof typeof offers[0] | boolean>(sorting:T,value:string) => {
    setSort(sorting);
    setSortValue(value);
    setBooleanSortFlag((prevState) => !prevState);
  };

  const offersOfCity = getOffersOfCity(currentCity, offers).sort((a,b) => (
    sort
      ? sort === 'price' || sort === 'rating'
        ? b[sort] - a[sort]
        : a['price'] - b['price']
      : a['id'] - b['id']
  ));

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
        <LocationList uniqueCity={ currentCity }/>
        <div className='cities'>
          <div className={`cities__places-container container ${offersOfCity.length ? '' : 'cities__places-container--empty'}`}>
            { offersOfCity.length
              ?
              <section className='cities__places places'>
                <h2 className='visually-hidden'>Places</h2>
                <b className='places__found'>
                  { offersOfCity.length } places to stay in {currentCity}
                </b>
                <form className='places__sorting' action='#' method='get'>
                  <span className='places__sorting-caption'>Sort by </span>
                  <span
                    className='places__sorting-type'
                    tabIndex={ 0 }
                    onClick={ () => setBooleanSortFlag((prevState) => !prevState) }
                  >
                    {sortValue}
                    <svg className='places__sorting-arrow' width='7' height='4' >
                      <use xlinkHref='#icon-arrow-select'/>
                    </svg>
                  </span>
                  <div hidden={!booleanSortFlag}>
                    <ul className='places__options places__options--custom places__options--opened'>
                      <li className='places__option places__option--active' tabIndex={ 0 } onClick={() => changeSort(false, 'Popular')}>Popular</li>
                      <li className='places__option' tabIndex={ 0 } onClick={() => changeSort(true,'Price: low to high')}>Price: low to high</li>
                      <li className='places__option' tabIndex={ 0 } onClick={() => changeSort('price', 'Price: high to low')}>Price: high to low</li>
                      <li className='places__option' tabIndex={ 0 } onClick={() => changeSort('rating','Top rated first')}>Top rated first</li>
                    </ul>
                  </div>
                </form>
                <div className='cities__places-list places__list tabs__content'>
                  <OfferList
                    offers = { offersOfCity }
                    cardClass = { CardPageClass.Main }
                  />
                </div>
              </section>
              : <NoPlacesScreen city={ currentCity }/> }
            <div className='cities__right-section'>
              <Map
                offers={ offersOfCity as Offers}
                selectedOffer = { selectedOffer }
                city={ City }
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


export default connector(MainScreen);
