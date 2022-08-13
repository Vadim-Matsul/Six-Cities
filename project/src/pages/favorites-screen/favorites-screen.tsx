import React from 'react';
import FavoriteOffersList from '../../components/favorite-offers-list/favorite-offers-list';
import Header from '../../components/header/header';
import { Offers } from '../../types/offers';
import EmptyFavoritesScreen from '../empty-favorites-screen/empty-favorites-screen';

type FavoritesPageProps = {
  offers: Offers
}

function FavoritesScreen ({offers}:FavoritesPageProps):JSX.Element{

  return (
    <div
      className={`page ${offers.length ? '' : 'page--favorites-empty'}`}
    >
      <Header />
      <main
        className={`page__main page__main--favorites ${offers.length ? '' : 'page__main--favorites-empty'}`}
      >
        <div className='page__favorites-container container'>
          { offers.length
            ?
            <section className='favorites'>
              <h1 className='favorites__title'>Saved listing</h1>
              <ul className='favorites__list'>
                <FavoriteOffersList offers = {offers}/>
              </ul>
            </section>
            : <EmptyFavoritesScreen /> };
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
