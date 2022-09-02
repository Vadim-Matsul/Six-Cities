import { useSelector } from 'react-redux';

import { getAuthStatus } from '../../../store/reducer/user-reducer/selectors';
import { HeaderGuest } from '../header-guest/header-guest';
import { AuthorizationStatus } from '../../../const';

import HeaderUser from '../header-user/header-user';


export const HeaderNav = ():JSX.Element => {
  const authStatus = useSelector( getAuthStatus );
  const userIsAuth = authStatus === AuthorizationStatus.Auth;

  return(
    <nav className='header__nav'>
      <ul className='header__nav-list'>
        { userIsAuth
          ? <HeaderUser />
          : <HeaderGuest /> }
      </ul>
    </nav>
  );
};
