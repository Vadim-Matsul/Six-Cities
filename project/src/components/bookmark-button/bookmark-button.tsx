import { AppRoute, AuthorizationStatus, BookMarkClass, PropertySize } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import { postFavorites, ThunkDispatchResualt } from '../../store/actions/api-actions';
import { getAuthStatus } from '../../store/reducer/user-reducer/selectors';
import { RedirectToPath } from '../../store/actions/actions';
import { toast } from 'react-toastify';

type BookMarkButtonProps = {
  bookmarkClass: BookMarkClass
  isFavorite: boolean
  id: number
}

function BookMarkButton ({bookmarkClass, isFavorite, id}:BookMarkButtonProps):JSX.Element{

  const dispatch = useDispatch() as ThunkDispatchResualt ;

  const authStatus = useSelector( getAuthStatus );
  const svgSize = bookmarkClass === BookMarkClass.OfferCard ? PropertySize.Small : PropertySize.Big;

  return (
    <button
      className = {`${ bookmarkClass }__bookmark-button button ${ isFavorite ? `${ bookmarkClass }__bookmark-button--active` : '' }`}
      type='button'
      onClick={ () => {
        if (authStatus === AuthorizationStatus.NoAuth) {
          dispatch(RedirectToPath( AppRoute.Auth ));
          toast.info('Вам необходимо авторизоваться');
          return;
        }
        dispatch( postFavorites( id.toString(), !isFavorite ) );
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
