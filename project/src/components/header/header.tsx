import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSession, ThunkDispatchResualt } from '../../store/actions/api-actions';
import { getAuthStatus } from '../../store/reducer/user-reducer/selectors';


const Header = ():JSX.Element => {
  const dispatch = useDispatch() as ThunkDispatchResualt;
  const authStatus = useSelector( getAuthStatus );

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Logo />
          </div>
          <nav className='header__nav'>
            <ul className='header__nav-list'>
              <li className='header__nav-item user'>
                <div className='header__nav-link header__nav-link--profile' >
                  <Link to={AppRoute.Favorites}>
                    <div className='header__avatar-wrapper user__avatar-wrapper'/>
                  </Link>
                  {authStatus === AuthorizationStatus.Auth
                    ?
                    <Link
                      to={AppRoute.Favorites}
                      data-testid='header-favorites'
                    >
                      <span className='header__user-name user__name'>Oliver.conner@gmail.com</span>
                      <span className='header__favorite-count'>0</span>
                    </Link>
                    :
                    <Link
                      to={AppRoute.Auth}
                      data-testid='header-auth'
                    ><span className='header__login'>Sign in</span>
                    </Link>}
                </div>
              </li>
              {authStatus === AuthorizationStatus.Auth &&
                <li
                  className='header__nav-item'
                >
                  <div onClick={() => dispatch(logoutSession())} />
                  <Link
                    className='header__nav-link'
                    to={AppRoute.Main}
                    data-testid='header-main'
                  >
                    <span className='header__signout'> Sign out </span>
                  </Link>
                </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};


export default Header;
