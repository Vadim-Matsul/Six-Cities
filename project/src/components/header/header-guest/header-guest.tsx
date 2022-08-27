import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

export const HeaderGuest = ():JSX.Element => (
  <li className='header__nav-item user'>
    <Link
      to={AppRoute.Auth}
      className='header__nav-link header__nav-link--profile'
      data-testid='header-auth'
    >
      <div className='header__avatar-wrapper user__avatar-wrapper'/>
      <span className='header__login'>Sign in</span>
    </Link>
  </li>
);
