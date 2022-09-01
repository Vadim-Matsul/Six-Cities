import React from 'react';
import { Offer } from '../../../types/offers';
import { capitalizeFirstLetter, getStars } from '../../../utils/utils';
import { BlockClass, CardPageClass, ImageSize } from '../../../const';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import BookMarkButton from '../../bookmark-button/bookmark-button';
import RaitingBlock from '../../raiting-block/raiting-block';


type OfferCardProps = {
  offer: Offer
  cardClass: CardPageClass
  setSelectedOffer?: (id: number | null) => void
}


function OfferCard ( props: OfferCardProps ):JSX.Element {
  const { offer, cardClass, setSelectedOffer } = props;
  console.log('OfferCard');
  const offerType = capitalizeFirstLetter (offer.type);

  const classWrapper:boolean = cardClass === CardPageClass.Favorites;
  const actualImageSize = classWrapper ? ImageSize.Small : ImageSize.Big;

  return (
    <article
      className= {`${cardClass}__card place-card`}
      onMouseEnter={ () => setSelectedOffer && setSelectedOffer( offer.id ) }
      onMouseLeave={ () => setSelectedOffer && setSelectedOffer( null ) }
      data-testid='OfferCard'
    >
      <div
        className='place-card__mark'
        hidden = {!offer.isPremium}
      >
        <span>Premium</span>
      </div>
      <div className={`${cardClass}__image-wrapper place-card__image-wrapper`}>
        <span style={{pointerEvents: 'none'}}>
          <img
            className='place-card__image'
            src={offer.previewImage}
            width={actualImageSize.width}
            height={actualImageSize.height}
            alt={offer.title}
          />
        </span>
      </div>
      <div className={`place-card__info ${classWrapper ? 'favorites__card-info' : ''}`}>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b
              className='place-card__price-value'
              data-testid='OfferCard-price'
            >&euro;{offer.price}
            </b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <BookMarkButton
            bookmarkClass = { BlockClass.OfferCard }
            isFavorite = { offer.isFavorite }
            id = { offer.id }
          />
        </div>
        <RaitingBlock
          Raiting={ offer.rating }
          Raiting_class={ BlockClass.OfferCard }
        />
        <h2 className='place-card__name'>
          <Link
            to = {`${AppRoute.Property}/${offer.id}`}
            data-testid='OfferCard-title'
          >
            { offer.title }
          </Link>
        </h2>
        <p className='place-card__type'>{offerType}</p>
      </div>
    </article>
  );
}


export default OfferCard ;
