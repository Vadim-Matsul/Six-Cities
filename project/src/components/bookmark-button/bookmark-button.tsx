import React, { useState } from 'react';
import { AppRoute, AuthorizationStatus, BlockClass, PropertySize } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import { postFavorites, ThunkDispatchResualt } from '../../store/actions/api-actions';
import { getAuthStatus } from '../../store/reducer/user-reducer/selectors';
import { RedirectToPath } from '../../store/actions/actions';
import { toast } from 'react-toastify';
import classNames from 'classnames';

type BookMarkButtonProps = {
  bookmarkClass: BlockClass
  isFavorite: boolean
  id: number
}

function BookMarkButton ({bookmarkClass, isFavorite, id}:BookMarkButtonProps):JSX.Element{

  const dispatch = useDispatch() as ThunkDispatchResualt ;

  const [ booleanFavorite, setBooleanFavorite ] = useState( isFavorite )
  const authStatus = useSelector( getAuthStatus );
  const svgSize = bookmarkClass === BlockClass.OfferCard ? PropertySize.Small : PropertySize.Big;
  const shouldtPost = authStatus === AuthorizationStatus.NoAuth;

  console.log('BookMarkButton rerender');
  
  function handlerClick () {
    if (shouldtPost) {
      dispatch(RedirectToPath( AppRoute.Auth ));
      toast.info('Вам необходимо авторизоваться');
      return;
    }
    dispatch( postFavorites( id.toString(), !booleanFavorite ) )
      .then(() => setBooleanFavorite((prev) => !prev));
  }

  const buttonClass = classNames(`${ bookmarkClass }__bookmark-button button`,{
    [`${ bookmarkClass }__bookmark-button--active`] : booleanFavorite
  });

  const svgClass = classNames( `${ bookmarkClass }__bookmark-icon` );

  return (
    <button
      className = { buttonClass }
      type='button'
      onClick={ handlerClick }
      data-testid='BookMarkButton'
    >
      <svg className={ svgClass } width={svgSize.width} height={svgSize.height} >
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>To bookmarks</span>
    </button>
  );
}


export default React.memo(BookMarkButton);
