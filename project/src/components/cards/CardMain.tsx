import { OfferHouse } from "../../types/OfferPlaces";

type CardMainProps = {
  cardInfo: OfferHouse[]
}

function CardMain (props: CardMainProps):JSX.Element {
  const offerHouse = props.cardInfo

  
  return (
    <div className='cities__places-list places__list tabs__content'>
      { offerHouse.map( house => 
      <article className='cities__place-card place-card' key={`${house.src}`}>
        { house.special &&
           <div className='place-card__mark'>
            <span>{house.special}</span>
           </div>
        }
        <div className='cities__image-wrapper place-card__image-wrapper'>
          <a href='#'>
            <img className='place-card__image' src={`${house.src}`} width='260' height='200' alt='Place image'/>
          </a>
        </div>
        <div className='place-card__info'>
          <div className='place-card__price-wrapper'>
            <div className='place-card__price'>
              <b className='place-card__price-value'>&euro;{house.cost}</b>
              <span className='place-card__price-text'>&#47;&nbsp;night</span>
            </div>
            <button className='place-card__bookmark-button button' type='button'>
              <svg className='place-card__bookmark-icon' width='18' height='19'>
                    <use xlinkHref='#icon-bookmark'></use>
              </svg>
              <span className='visually-hidden'>To bookmarks</span>
            </button>
          </div>
          <div className='place-card__rating rating'>
            <div className='place-card__stars rating__stars'>
              <span style={{width: `${house.raiting}`}}></span>
              <span className='visually-hidden'>Rating</span>
            </div>
          </div>
          <h2 className='place-card__name'>
            <a href='#'>{house.title}</a>
          </h2>
          <p className='place-card__type'>{house.estate}</p>
        </div>
      </article>
      )}
    </div>
  )
}


export default CardMain;
