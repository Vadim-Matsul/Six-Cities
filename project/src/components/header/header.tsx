import React from 'react';
import Logo from './logo/logo';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { HeaderNav } from './header-nav/header-nav';

const Header = ():JSX.Element => {
  console.log('rerender Header');
  
  const location = useLocation().pathname;
  const shouldHideUserSection = location === AppRoute.Auth;

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Logo />
          </div>
          { !shouldHideUserSection && <HeaderNav/> }
        </div>
      </div>
    </header>
  );
};


export default React.memo(Header);
