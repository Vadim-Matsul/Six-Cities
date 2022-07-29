import React from 'react';
import { Offer } from '../../types/offers';
import { capitalizeFirstLetter, getStars } from '../../utils/utils';
import { CardPageClass, ImageSize } from '../../const';

type OfferCardProps = {
  offer: Offer
  ActiveCard: () => void
  InActiveCard: () => void
  cardClass: CardPageClass
}

function OfferCard ( props:OfferCardProps ):JSX.Element {
  const { offer, ActiveCard, InActiveCard, cardClass } = props;

  const rating = getStars ( offer.rating );
  const offerType = capitalizeFirstLetter (offer.type);

  // общее условие для карточек на страницах Main / Favotites / Property
  const classWrapper:boolean = cardClass === CardPageClass.Favorites;
  const actualImageSize = classWrapper ? ImageSize.Small : ImageSize.Big;

  return (
    <article
      className= {`${cardClass}__card place-card`}
      onMouseEnter={ActiveCard}
      onMouseLeave={InActiveCard}
    >
      <div
        className='place-card__mark'
        hidden = {!offer.isPremium}
      >
        <span>Premium</span>
      </div>
      <div className={`${cardClass}__image-wrapper place-card__image-wrapper`}>
        <a href='#'>
          <img 
            className='place-card__image' 
            src={offer.previewImage} 
            width={actualImageSize.width} 
            height={actualImageSize.height} 
            alt={offer.title}
          />
        </a>
      </div>
      <div className={`place-card__info ${classWrapper ? 'favorites__card-info' : ''}`}>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button
            className = {`place-card__bookmark-button button ${ offer.isFavorite ? 'place-card__bookmark-button--active' : '' }`}
            type='button'
          >
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>To bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{width: rating}}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <a href='#'>{offer.title}</a>
        </h2>
        <p className='place-card__type'>{offerType}</p>
      </div>
    </article>
  );
}


export default OfferCard;
