import { connect, ConnectedProps } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import { State } from '../../types/state';
import Logo from '../logo/logo';

const mapStateToProps = ({authStatus}:State) => ({authStatus});
const connector = connect(mapStateToProps);
type HeaderReduxProps = ConnectedProps<typeof connector>

const Header = ({authStatus}:HeaderReduxProps):JSX.Element => (

  <header className='header'>
    <div className='container'>
      <div className='header__wrapper'>
        <div className='header__left'>
          <Logo />
        </div>
        <nav className='header__nav'>
          <ul className='header__nav-list'>
            <li className='header__nav-item user'>
              <Link className='header__nav-link header__nav-link--profile' to={AppRoute.Favorites}>
                <div className='header__avatar-wrapper user__avatar-wrapper'/>
                {authStatus === AuthorizationStatus.Auth
                  ?
                  <>
                    <span className='header__user-name user__name'>Oliver.conner@gmail.com</span>
                    <span className='header__favorite-count'>0</span>
                  </>
                  : <span className='header__login'><Link to={AppRoute.Auth}>Sign in</Link></span>}
              </Link>
            </li>
            {authStatus === AuthorizationStatus.Auth &&
              <li className='header__nav-item'>
                <Link
                  className='header__nav-link'
                  to={AppRoute.Main}
                >
                  <span className='header__signout'>Sign out</span>
                </Link>
              </li>}
          </ul>
        </nav>
      </div>
    </div>
  </header>
);


export default connector(Header);
