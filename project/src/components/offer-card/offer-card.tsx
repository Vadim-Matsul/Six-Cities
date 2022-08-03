import React from 'react';
import { Offer } from '../../types/offers';
import { capitalizeFirstLetter, getStars } from '../../utils/utils';
import { BookMarkClass, CardPageClass, ImageSize } from '../../const';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import BookMarkButton from '../bookmark-button/bookmark-button';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { Actions } from '../../types/actions';
import { ChangeSelectedOffer } from '../../store/actions/actions';

type OfferCardProps = {
  offer: Offer
  cardClass: CardPageClass
}
const mapDispatchToProps = (dispatcher: Dispatch<Actions>) => ({
  onChangeSelectedOffer (id: number | null){
    dispatcher(ChangeSelectedOffer(id));
  }
});

const connector = connect(null, mapDispatchToProps);
type OfferCardReduxProps = ConnectedProps<typeof connector>
type ConnectedOfferCardProps = OfferCardProps & OfferCardReduxProps


function OfferCard ( props: ConnectedOfferCardProps ):JSX.Element {
  const { offer, cardClass, onChangeSelectedOffer } = props;

  const rating = getStars ( offer.rating );
  const offerType = capitalizeFirstLetter (offer.type);

  const classWrapper:boolean = cardClass === CardPageClass.Favorites;
  const actualImageSize = classWrapper ? ImageSize.Small : ImageSize.Big;


  return (
    <article
      className= {`${cardClass}__card place-card`}
      onMouseEnter={ () => onChangeSelectedOffer( offer.id ) }
      onMouseLeave={ () => onChangeSelectedOffer( null ) }
    >
      <div
        className='place-card__mark'
        hidden = {!offer.isPremium}
      >
        <span>Premium</span>
      </div>
      <div className={`${cardClass}__image-wrapper place-card__image-wrapper`}>
        <a style={{pointerEvents: 'none'}}>
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
          <BookMarkButton
            bookmarkClass = { BookMarkClass.OfferCard }
            isFavorite = { offer.isFavorite }
          />
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{width: rating}}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to = {`${AppRoute.Property}/${offer.id}`}>
            { offer.title }
          </Link>
        </h2>
        <p className='place-card__type'>{offerType}</p>
      </div>
    </article>
  );
}


export default connector(OfferCard);
