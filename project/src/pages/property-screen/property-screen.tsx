import React, { MutableRefObject, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchNearOffers, fetchOffer, fetchReviews, ThunkDispatchResualt } from '../../store/actions/api-actions';
import { getNearOffers, getOffer, getReviews } from '../../store/reducer/data-reducer/selectors';
import { AuthorizationStatus, BlockClass, FetchProgress } from '../../const';
import { getAuthStatus } from '../../store/reducer/user-reducer/selectors';
import { Reviews } from '../../types/reviews';

import Header from '../../components/header/header';
import { Loader } from '../../components/loader/loader';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import RaitingBlock from '../../components/raiting-block/raiting-block';
import FormReview from '../../components/review/form-review/form-review';
import UserReview from '../../components/review/user-review/user-review';
import BookMarkButton from '../../components/bookmark-button/bookmark-button';
import PropertyGood from '../../components/property-components/property-good/property-good';
import PropertyImage from '../../components/property-components/property-image/property-image';
import PropertyFeatures from '../../components/property-components/property-features/property-features';
import PropertyScreenWithNear from '../../components/property-components/property-screen-with-near/property-screen-with-near';


function PropertyScreen ():JSX.Element{

  const dispatch = useDispatch() as ThunkDispatchResualt;

  const { id } = useParams();
  const Id = Number(id);

  const { Fulfilled } = FetchProgress;

  const { data, loadStatus } = useSelector( getOffer );
  const authStatus = useSelector( getAuthStatus );
  const nearOffers = useSelector( getNearOffers );
  const reviews = useSelector( getReviews );

  const nearPlug:MutableRefObject<boolean> = useRef(false);
  const reviewPlug:MutableRefObject<boolean> = useRef(false);

  // nearPlug & reviewPlug - заглушки от лишних вызовов useEffect в новых rerender компонента
  // ( заглушки избавляют от actions в Redux DevTools, не приносящих изменения ( states are equal ) )

  useEffect(() => {
    dispatch( fetchOffer(id) );
  },[id, dispatch]);

  useEffect(() => {
    if ( nearOffers.id !== Id && reviews.id !== Id && !nearPlug.current && !reviewPlug.current ){
      nearPlug.current = true;
      reviewPlug.current = true;
      dispatch( fetchNearOffers( id ) );
      dispatch( fetchReviews( id ) );
    }
    // eslint-disable-next-line
  },[id]);

  if ( nearOffers.data.length && reviews.data.length && nearOffers.id !== Id && reviews.id !== Id ){
    nearPlug.current = false; reviewPlug.current = false;
  }

  if ( (nearOffers.loadStatus !== Fulfilled && reviews.loadStatus !== Fulfilled) || loadStatus !== Fulfilled ){
    return <Loader />;
  }

  if ( data === null ){
    return <NotFoundScreen />;
  }


  return (
    <div
      className='page'
      data-testid='PropertyScreen'
    >
      <Header />
      <main className='page__main page__main--property'>
        <section className='property'>
          <PropertyImage Images={ data.images }/>
          <div className='property__container container'>
            <div className='property__wrapper'>
              <div
                className='property__mark'
                hidden={!data.isPremium}
              >
                <span>Premium</span>
              </div>
              <div className='property__name-wrapper'>
                <h1 className='property__name'>
                  { data.title }
                </h1>
                <BookMarkButton
                  bookmarkClass={ BlockClass.Property }
                  isFavorite = { data.isFavorite }
                  id = { data.id }
                />
              </div>
              <RaitingBlock
                Raiting={ data.rating }
                RaitingClass={ BlockClass.Property }
              />
              <PropertyFeatures
                type={ data.type }
                bedrooms={ data.bedrooms }
                adults={ data.maxAdults }
              />
              <div className='property__price'>
                <b className='property__price-value'>&euro;{data.price}</b>
                <span className='property__price-text'>&nbsp;night</span>
              </div>
              <PropertyGood goods={data.goods}/>
              <div className='property__host'>
                <h2 className='property__host-title'>Meet the host</h2>
                <div className='property__host-user user'>
                  <div className='property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper'>
                    <img className='property__avatar user__avatar' src={data.host.avatarUrl} width='74' height='74'
                      alt='Host avatar'
                    />
                  </div>
                  <span className='property__user-name'>
                    {data.host.name}
                  </span>
                  <span
                    className='property__user-status'
                    hidden={!data.host.isPro}
                  >
                    Pro
                  </span>
                </div>
                <div className='property__description'>
                  <p className='property__text'>
                    {data.description}
                  </p>
                </div>
              </div>
              <section className='property__reviews reviews'>
                { reviews.data.length
                  ?
                  <>
                    <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{reviews.data.length}</span></h2>
                    <ul className='reviews__list'>
                      <UserReview reviews={ reviews.data as Reviews } />
                    </ul>
                  </>
                  : null }
                { authStatus === AuthorizationStatus.Auth && reviews.data.length
                  ? <FormReview id={ Id }/>
                  : null }
              </section>
            </div>
          </div>
        </section>
        { nearOffers.data.length
          ?
          <PropertyScreenWithNear
            nearOffers={ nearOffers.data }
            data={ data }
          />
          : null }
      </main>
    </div>
  );
}


export default PropertyScreen;
