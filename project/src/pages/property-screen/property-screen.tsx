import React, { MutableRefObject, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import BookMarkButton from '../../components/bookmark-button/bookmark-button';
import Header from '../../components/header/header';
import OfferList from '../../components/offer-components/offer-list/offer-list';
import PropertyGood from '../../components/property-components/property-good/property-good';
import PropertyImage from '../../components/property-components/property-image/property-image';
import UserReview from '../../components/review/user-review/user-review';
import { AuthorizationStatus, BookMarkClass, CardPageClass, FetchProgress, ImagesSize } from '../../const';
import { Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import { capitalizeFirstLetter, getStars } from '../../utils/utils';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNearOffers, fetchReviews, ThunkDispatchResualt } from '../../store/actions/api-actions';
import { getNearOffers, getReviews } from '../../store/reducer/data-reducer/selectors';
import { FormReview } from '../../components/review/form-review/form-review';
import { getAuthStatus } from '../../store/reducer/user-reducer/selectors';
import { Loader } from '../../components/loader/loader';
import Map from '../../components/map/map';
import useHighlighted from '../../hooks/useHighlighted';


type PropertyScreenProps = {
  offers: Offers
}

function PropertyScreen ( { offers }:PropertyScreenProps ):JSX.Element{

  const { id } = useParams();
  const numId = Number(id);
  const NanNumId = !numId;
  const offer = offers.find((item) => item.id === numId);
  const NanOffer = !offer;
  const dispatch = useDispatch() as ThunkDispatchResualt;

  const nearOffers = useSelector( getNearOffers );
  const reviews = useSelector( getReviews );

  const nearPlug:MutableRefObject<boolean> = useRef(false);
  const reviewPlug:MutableRefObject<boolean> = useRef(false);

  // nearPlug & reviewPlug - заглушки от лишних вызовов useEffect в новых rerender компонента
  // ( заглушки избавляют от actions в Redux DevTools, не приносящих изменения ( states are equal ) )

  useEffect(() => {
    if ( nearOffers.id !== numId && reviews.id !== numId && !NanOffer && !nearPlug.current && !reviewPlug.current ){
      nearPlug.current = true;
      reviewPlug.current = true;
      dispatch( fetchNearOffers(numId) );
      dispatch( fetchReviews(numId) );
    }
  },[numId]);

  if ( nearOffers.data.length && reviews.data.length && nearOffers.id !== numId && reviews.id !== numId ){
    nearPlug.current = false; reviewPlug.current = false;
  }


  const authStatus = useSelector( getAuthStatus );
  const [selectedOffer, setSelectedOffer] = useHighlighted(nearOffers.data);

  if (NanNumId || NanOffer ){
    return <NotFoundScreen />;
  }

  const images:string[] = offer.images.slice(ImagesSize.START, ImagesSize.END);
  const raiting = getStars( offer.rating );
  const offerType = capitalizeFirstLetter(offer.type);
  const offersForMap = [...nearOffers.data, offer];

  if (nearOffers.loadStatus !== FetchProgress.Fulfilled && reviews.loadStatus !== FetchProgress.Fulfilled){
    return <Loader />;
  }


  return (
    <div className='page'>
      <Header />
      <main className='page__main page__main--property'>
        <section className='property'>
          <div className='property__gallery-container container'>
            <div className='property__gallery'>
              {images.map( (src) => <PropertyImage src={ src } key={ src }/> ) }
            </div>
          </div>
          <div className='property__container container'>
            <div className='property__wrapper'>
              <div
                className='property__mark'
                hidden={!offer.isPremium}
              >
                <span>Premium</span>
              </div>
              <div className='property__name-wrapper'>
                <h1 className='property__name'>
                  { offer.title }
                </h1>
                <BookMarkButton
                  bookmarkClass={ BookMarkClass.Property }
                  isFavorite = { offer.isFavorite }
                  id = { offer.id }
                />
              </div>

              <div className='property__rating rating'>
                <div className='property__stars rating__stars'>
                  <span style={{ width: raiting }}></span>
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='property__rating-value rating__value'>{offer.rating}</span>
              </div>
              <ul className='property__features'>
                <li className='property__feature property__feature--entire'>
                  {offerType}
                </li>
                <li className='property__feature property__feature--bedrooms'>
                  {offer.bedrooms} Bedrooms
                </li>
                <li className='property__feature property__feature--adults'>
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className='property__price'>
                <b className='property__price-value'>&euro;{offer.price}</b>
                <span className='property__price-text'>&nbsp;night</span>
              </div>
              <PropertyGood goods={offer.goods}/>
              <div className='property__host'>
                <h2 className='property__host-title'>Meet the host</h2>
                <div className='property__host-user user'>
                  <div className='property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper'>
                    <img className='property__avatar user__avatar' src={offer.host.avatarUrl} width='74' height='74'
                      alt='Host avatar'
                    />
                  </div>
                  <span className='property__user-name'>
                    {offer.host.name}
                  </span>
                  <span
                    className='property__user-status'
                    hidden={!offer.host.isPro}
                  >
                    Pro
                  </span>
                </div>
                <div className='property__description'>
                  <p className='property__text'>
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className='property__reviews reviews'>
                { reviews.data.length
                  ?
                  <>
                    <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{reviews.data.length}</span></h2>
                    <ul className='reviews__list'>
                      <UserReview reviews={ reviews.data as Reviews } />
                    </ul>
                  </>
                  : null }
                { authStatus === AuthorizationStatus.Auth && reviews.data.length
                  ? <FormReview id={ numId }/>
                  : null }
              </section>
            </div>
          </div>
          { nearOffers.data.length
            ?
            <Map
              offers={ offersForMap }
              city={ offer.city }
              selectedOffer={ selectedOffer }
              thisClass= 'property__map map'
            />
            : null }
        </section>
        { nearOffers.data.length
          ?
          <div className='container'>
            <section className='near-places places'>
              <h2 className='near-places__title'>Other places in the neighbourhood</h2>
              <div className='near-places__list places__list'>
                <OfferList
                  cardClass={ CardPageClass.Property }
                  offers = {nearOffers.data}
                  setSelectedOffer={ setSelectedOffer }
                />
              </div>
            </section>
          </div>
          : null }
      </main>
    </div>
  );
}


export default React.memo(PropertyScreen);
