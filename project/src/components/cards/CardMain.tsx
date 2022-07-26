import { OfferHouse } from '../../types/OfferPlaces';

type CardMainProps = {
  offer: OfferHouse
  onMouseMove: () => void
  onMouseLeave: () => void
}

function CardMain (props: CardMainProps):JSX.Element {
  const {offer, onMouseMove, onMouseLeave} = props;

  return (
    <article
      className='cities__place-card place-card'
      onMouseMove = { onMouseMove }
      onMouseLeave = { onMouseLeave }
    >
      { offer.special &&
       <div className='place-card__mark'>
         <span>{offer.special}</span>
       </div> }
      <div className='cities__image-wrapper place-card__image-wrapper'>
        <a href='#'>
          <img
            className='place-card__image'
            src={offer.src} width='260' height='200' alt='Place image'
          />
        </a>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.cost}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button
            className={ offer.inBookmark
              ? 'place-card__bookmark-button--active button'
              : 'place-card__bookmark-button button' }
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
            <span style={{width: `${offer.raiting}`}}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <a href='#'>{offer.title}</a>
        </h2>
        <p className='place-card__type'>{offer.estate}</p>
      </div>
    </article>);
}


export default CardMain;
