import {Link} from 'react-router-dom';
import React from 'react';

function Logo (){
  return (
    <Link className='header__logo-link' to='/'>
      <img className='header__logo' src='img/logo.svg' width='81' height='41' alt='6 cities logo'/>
    </Link>
  );
}


export default Logo;
