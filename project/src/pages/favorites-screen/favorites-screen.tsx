import React, { MutableRefObject, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchFavorites, ThunkDispatchResualt } from '../../store/actions/api-actions';
import { getFavorites } from '../../store/reducer/data-reducer/selectors';
import { FetchProgress } from '../../const';

import Header from '../../components/header/header';
import { Loader } from '../../components/loader/loader';
import EmptyFavoritesScreen from '../empty-favorites-screen/empty-favorites-screen';
import FavoriteOffersList from '../../components/favorites-components/favorite-offers-list/favorite-offers-list';


function FavoritesScreen ():JSX.Element{
  const dispatch = useDispatch() as ThunkDispatchResualt;
  const favorites = useSelector( getFavorites );
  const plug:MutableRefObject<boolean> = useRef(false);

  useEffect(() => {
    if (!plug.current){
      plug.current = true;
      dispatch( fetchFavorites() );
    }
  },[dispatch]);

  if (favorites.loadStatus !== FetchProgress.Fulfilled && !favorites.data.length ){
    return <Loader />;
  }

  return (
    <div
      className={`page ${favorites.data.length ? '' : 'page--favorites-empty'}`}
      data-testid='FavoritesScreen'
    >
      <Header />
      <main
        className={`page__main page__main--favorites ${favorites.data.length ? '' : 'page__main--favorites-empty'}`}
        data-testid='FavoritesScreen-main'
      >
        <div className='page__favorites-container container'>
          { favorites.data.length
            ?
            <section className='favorites'>
              <h1 className='favorites__title'>Saved listing</h1>
              <ul className='favorites__list'>
                <FavoriteOffersList offers = {favorites.data}/>
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
