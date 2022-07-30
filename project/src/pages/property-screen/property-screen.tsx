import React from 'react';
import { useParams } from 'react-router-dom';
import BookMarkButton from '../../components/bookmark-button/bookmark-button';
import Logo from '../../components/logo/logo';
import OfferList from '../../components/offer-list/offer-list';
import PropertyGood from '../../components/property-good/property-good';
import PropertyImage from '../../components/property-image/property-image';
import { BookMarkClass, CardPageClass, ImagesSize } from '../../const';
import { Offers } from '../../types/offers';
import { capitalizeFirstLetter, getStars } from '../../utils/utils';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type PropertyScreenProps = {
  offers: Offers
  nearPlacesOffers: Offers
}

function PropertyScreen ( { offers, nearPlacesOffers }:PropertyScreenProps ):JSX.Element{
 
  const { id } = useParams();
  const numId = Number(id);
  const NanNumId = !numId;
  const offer = offers.find((item) => item.id === numId);
  const NanOffer = !offer;

  if (NanNumId || NanOffer){
    return <NotFoundScreen />
  }

  const images:string[] = offer.images.slice(ImagesSize.START, ImagesSize.END)
  const raiting = getStars( offer.rating )
  const offerType = capitalizeFirstLetter(offer.type)

  return (
    <div className='page'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Logo />
            </div>
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <li className='header__nav-item user'>
                  <a className='header__nav-link header__nav-link--profile' href='/'>
                    <div className='header__avatar-wrapper user__avatar-wrapper'>
                    </div>
                    <span className='header__user-name user__name'>Oliver.conner@gmail.com</span>
                    <span className='header__favorite-count'>3</span>
                  </a>
                </li>
                <li className='header__nav-item'>
                  <a className='header__nav-link' href='/'>
                    <span className='header__signout'>Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
                <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>1</span></h2>
                <ul className='reviews__list'>
                  <li className='reviews__item'>
                    <div className='reviews__user user'>
                      <div className='reviews__avatar-wrapper user__avatar-wrapper'>
                        <img className='reviews__avatar user__avatar' src='img/avatar-max.jpg' width='54' height='54'
                          alt='Reviews avatar'
                        />
                      </div>
                      <span className='reviews__user-name'>
                        Max
                      </span>
                    </div>
                    <div className='reviews__info'>
                      <div className='reviews__rating rating'>
                        <div className='reviews__stars rating__stars'>
                          <span style={{ width: '80%' }}></span>
                          <span className='visually-hidden'>Rating</span>
                        </div>
                      </div>
                      <p className='reviews__text'>
                        A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The
                        building is green and from 18th century.
                      </p>
                      <time className='reviews__time' dateTime='2019-04-24'>April 2019</time>
                    </div>
                  </li>
                </ul>
                <form className='reviews__form form' action='#' method='post'>
                  <label className='reviews__label form__label' htmlFor='review'>Your review</label>
                  <div className='reviews__rating-form form__rating'>
                    <input className='form__rating-input visually-hidden' name='rating' value='5' id='5-stars' type='radio' />
                    <label htmlFor='5-stars' className='reviews__rating-label form__rating-label' title='perfect'>
                      <svg className='form__star-image' width='37' height='33'>
                        <use xlinkHref='#icon-star'></use>
                      </svg>
                    </label>

                    <input className='form__rating-input visually-hidden' name='rating' value='4' id='4-stars' type='radio' />
                    <label htmlFor='4-stars' className='reviews__rating-label form__rating-label' title='good'>
                      <svg className='form__star-image' width='37' height='33'>
                        <use xlinkHref='#icon-star'></use>
                      </svg>
                    </label>

                    <input className='form__rating-input visually-hidden' name='rating' value='3' id='3-stars' type='radio' />
                    <label htmlFor='3-stars' className='reviews__rating-label form__rating-label' title='not bad'>
                      <svg className='form__star-image' width='37' height='33'>
                        <use xlinkHref='#icon-star'></use>
                      </svg>
                    </label>

                    <input className='form__rating-input visually-hidden' name='rating' value='2' id='2-stars' type='radio' />
                    <label htmlFor='2-stars' className='reviews__rating-label form__rating-label' title='badly'>
                      <svg className='form__star-image' width='37' height='33'>
                        <use xlinkHref='#icon-star'></use>
                      </svg>
                    </label>

                    <input className='form__rating-input visually-hidden' name='rating' value='1' id='1-star' type='radio' />
                    <label htmlFor='1-star' className='reviews__rating-label form__rating-label' title='terribly'>
                      <svg className='form__star-image' width='37' height='33'>
                        <use xlinkHref='#icon-star'></use>
                      </svg>
                    </label>
                  </div>
                  <textarea className='reviews__textarea form__textarea' id='review' name='review'
                    placeholder='Tell how was your stay, what you like and what can be improved'
                  >
                  </textarea>
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
