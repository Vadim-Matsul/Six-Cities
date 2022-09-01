import { useSelector, useDispatch } from 'react-redux';
import { getLogoutError, getLogoutProcess, getUser } from '../../../store/reducer/user-reducer/selectors';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { getFavorites } from '../../../store/reducer/data-reducer/selectors';
import { logoutSession, ThunkDispatchResualt } from '../../../store/actions/api-actions';
import { SetLogoutError } from '../../../store/actions/actions';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import '../header.css';
import { useTimeout } from '../../../hooks/useTimeout';
import React from 'react';
import HeaderUserInfo from './header-user-info/header-user-info';

const HeaderUser = ():JSX.Element => {

  const dispatch = useDispatch() as ThunkDispatchResualt;
  const { pathname } = useLocation();

  const thisIsFavoritesScreen = pathname === AppRoute.Favorites;

  const logoutError = useSelector( getLogoutError );
  const logoutProcess = useSelector( getLogoutProcess );

  const logOutText = logoutProcess ? 'Expect...' : 'Sign out';

  const liClass = classNames('header__nav-item user');

  const spanClass = classNames('header__signout',{
    'header__signout__error horizontal-shake' : logoutError,
    'disable' : logoutProcess
  });

  const navigationWrapper = classNames('header__nav-link', 'header__nav-link--profile', {
    'disable' : thisIsFavoritesScreen
  });

  useTimeout(logoutError, SetLogoutError, 3000);

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
          data-testid='header-favorites'
        >
          <HeaderUserInfo/>
        </Link>
      </li>
      <li className={ liClass }>
        <a
          href={ AppRoute.Main }
          onClick={ (evt) => handlerLogOut( evt ) }
          className='header__nav-link header__nav-link--profile'
          data-testid='header-logout'
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

export default React.memo(HeaderUser);
