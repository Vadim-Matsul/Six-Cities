import { BookMarkClass, PropertySize } from "../../const";

type BookMarkButtonProps = {
  bookmarkClass: BookMarkClass
  isFavorite: boolean
}

function BookMarkButton ({bookmarkClass, isFavorite}:BookMarkButtonProps){
    
  const svgSize = bookmarkClass === BookMarkClass.OfferCard ? PropertySize.Small : PropertySize.Big
  
  return (
    <button
      className = {`${ bookmarkClass }__bookmark-button button ${ isFavorite ? `${ bookmarkClass }__bookmark-button--active` : '' }`}
      type='button'
    >
      <svg className={`${ bookmarkClass }__bookmark-icon`} width={svgSize.width} height={svgSize.height}>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>To bookmarks</span>
    </button>
  );
}


export default BookMarkButton;
