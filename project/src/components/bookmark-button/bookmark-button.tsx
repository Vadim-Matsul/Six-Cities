import { BookMarkClass, FavoritesConfig, PropertySize } from '../../const';
import { useDispatch } from 'react-redux';
import { postFavorites, ThunkDispatchResualt } from '../../store/actions/api-actions';

type BookMarkButtonProps = {
  bookmarkClass: BookMarkClass
  isFavorite: boolean
  id: number
}

function BookMarkButton ({bookmarkClass, isFavorite, id}:BookMarkButtonProps):JSX.Element{

  const dispatch = useDispatch() as ThunkDispatchResualt ;

  const svgSize = bookmarkClass === BookMarkClass.OfferCard ? PropertySize.Small : PropertySize.Big;

  return (
    <button
      className = {`${ bookmarkClass }__bookmark-button button ${ isFavorite ? `${ bookmarkClass }__bookmark-button--active` : '' }`}
      type='button'
      onClick={ () => {
        const Status = isFavorite ? FavoritesConfig.remove : FavoritesConfig.add;
        dispatch( postFavorites( id.toString(), Status ) );
      }}
    >
      <svg className={`${ bookmarkClass }__bookmark-icon`} width={svgSize.width} height={svgSize.height}>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>To bookmarks</span>
    </button>
  );
}


export default BookMarkButton;
