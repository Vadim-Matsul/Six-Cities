import { useSelector, useDispatch } from 'react-redux';
import { getLogoutError, getLogoutProcess, getUser } from '../../../store/reducer/user-reducer/selectors';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { getFavorites } from '../../../store/reducer/data-reducer/selectors';
import { useEffect, useRef } from 'react';
import { logoutSession, ThunkDispatchResualt } from '../../../store/actions/api-actions';
import { SetLogoutError } from '../../../store/actions/actions';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import '../header.css';

export const HeaderUser = ():JSX.Element => {

  const timer = useRef< null | NodeJS.Timeout >( null );
  const dispatch = useDispatch() as ThunkDispatchResualt;
  const { pathname } = useLocation();

  const thisIsFavoritesScreen = pathname === AppRoute.Favorites;

  const logoutError = useSelector( getLogoutError );
  const logoutProcess = useSelector( getLogoutProcess );
  const user = useSelector( getUser );
  const { data } = useSelector( getFavorites );

  const logOutText = logoutProcess ? 'Expect...' : 'Sign out';

  const liClass = classNames('header__nav-item user');

  const spanClass = classNames('header__signout',{
    'header__signout__error horizontal-shake' : logoutError,
    'disable' : logoutProcess
  });

  const navigationWrapper = classNames('header__nav-link', 'header__nav-link--profile', {
    'disable' : thisIsFavoritesScreen
  });

  useEffect(() => {
    if (!timer.current && logoutError){
      timer.current = setTimeout(() => {
        dispatch( SetLogoutError( false ) );
      }, 3000);
    }
    return () => {
      if (timer.current){
        clearTimeout( timer.current );
      }
    };
  },[logoutError]);

  function handlerLogOut (evt: React.MouseEvent< HTMLAnchorElement >) {
    evt.preventDefault();
    toast.dismiss();
    dispatch( logoutSession() );
  }

  return(
    <>
      <li className={ liClass }>
        <Link
          to={ AppRoute.Favorites }
          className={ navigationWrapper }
        >
          <div className='header__avatar-wrapper user__avatar-wrapper'/>
          <span className='header__user-name user__name'>{ user!.name }</span>
          <span className='header__favorite-count'>{ data.length }</span>
        </Link>
      </li>
      <li className={ liClass }>
        <a
          href={ AppRoute.Main }
          onClick={ (evt) => handlerLogOut( evt ) }
          className='header__nav-link header__nav-link--profile'
        >
          <span
            className={ spanClass }
          > {logOutText}
          </span>
        </a>
      </li>
    </>
  );
};
