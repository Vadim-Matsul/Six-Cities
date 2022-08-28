import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/header/logo/logo';

function NotFoundScreen (){
  return (
    <section className='page__main page__main--favorites page-not-found' >
      <div className='header__left header__left__boost'>
        <Logo />
      </div>
      <p>404</p>
      <span>Page Not Found</span>
      <Link className='page-not-found-link' to='/'>Main Page</Link>
    </section>
  );
}


export default NotFoundScreen;
