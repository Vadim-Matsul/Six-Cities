import React from 'react';
import FavoriteOffersList from '../../components/favorite-offers-list/favorite-offers-list';
import Header from '../../components/header/header';
import { Offers } from '../../types/offers';

type FavoritesPageProps = {
  offers: Offers
}

function FavoritesScreen ({offers}:FavoritesPageProps):JSX.Element{

  return (
    <div className='page'>
      <Header />
      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          <section className='favorites'>
            <h1 className='favorites__title'>Saved listing</h1>
            <ul className='favorites__list'>
              <FavoriteOffersList offers = {offers as Offers}/>
            </ul>
          </section>
        </div>
      </main>
      <footer className='footer container'>
        <a className='footer__logo-link' href='main.html'>
          <img className='footer__logo' src='img/logo.svg' alt='6 cities logo' width='64' height='33' />
        </a>
      </footer>
    </div>
  );
}


export default FavoritesScreen;
