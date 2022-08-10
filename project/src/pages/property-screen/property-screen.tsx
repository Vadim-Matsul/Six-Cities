import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookMarkButton from '../../components/bookmark-button/bookmark-button';
import Header from '../../components/header/header';
import InputRaiting from '../../components/input-raiting/input-raiting';
import OfferList from '../../components/offer-list/offer-list';
import PropertyGood from '../../components/property-good/property-good';
import PropertyImage from '../../components/property-image/property-image';
import UserReview from '../../components/user-review/user-review';
import { BookMarkClass, CardPageClass, ImagesSize } from '../../const';
import { Offers } from '../../types/offers';
import { Reviews, ReviewState } from '../../types/reviews';
import { capitalizeFirstLetter, getStars } from '../../utils/utils';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type PropertyScreenProps = {
  offers: Offers
  nearPlacesOffers: Offers
  reviews: Reviews
}

function PropertyScreen ( { offers, nearPlacesOffers, reviews }:PropertyScreenProps ):JSX.Element{

  const [ reviewFormData, setReviewFormData ] = useState<ReviewState>({
    raiting: null,
    comment: ''
  });

  const { id } = useParams();
  const numId = Number(id);
  const NanNumId = !numId;
  const offer = offers.find((item) => item.id === numId);
  const NanOffer = !offer;

  if (NanNumId || NanOffer){
    return <NotFoundScreen />;
  }

  const images:string[] = offer.images.slice(ImagesSize.START, ImagesSize.END);
  const raiting = getStars( offer.rating );
  const offerType = capitalizeFirstLetter(offer.type);


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
                <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{reviews.length}</span></h2>
                <ul className='reviews__list'>
                  <UserReview reviews={ reviews as Reviews } />
                </ul>
                <form className='reviews__form form' action='#' method='post' >
                  <label className='reviews__label form__label' htmlFor='review'>Your review</label>
                  <div
                    className='reviews__rating-form form__rating'
                    onChange={( {target}: ChangeEvent <HTMLInputElement> ):void => {
                      setReviewFormData({
                        ...reviewFormData,
                        raiting: Number(target.value)
                      });
                    }}
                  >
                    <InputRaiting />
                  </div>
                  <textarea
                    className='reviews__textarea form__textarea'
                    onChange={( {target}:ChangeEvent <HTMLTextAreaElement> ):void =>{
                      setReviewFormData({
                        ...reviewFormData,
                        comment: target.value
                      });
                    }}
                    id='review'
                    name='review'
                    value={reviewFormData.comment}
                    placeholder='Tell how was your stay, what you like and what can be improved'
                  />
                  <div className='reviews__button-wrapper'>
                    <p className='reviews__help'>
                      To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your
                      stay with at least <b className='reviews__text-amount'>50 characters</b>.
                    </p>
                    <button className='reviews__submit form__submit button' type='submit' disabled>Submit</button>
                  </div>
                </form>
              </section>
            </div>
          </div>
          <section className='property__map map'></section>
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <div className='near-places__list places__list'>
              <OfferList
                cardClass={ CardPageClass.Property }
                offers = {nearPlacesOffers}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}


export default PropertyScreen;
